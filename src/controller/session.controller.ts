import { NextFunction, Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.util";
import log from "../utils/logger.util";
import HttpException from "../utils/exceptions/http.exception";

export async function createUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await validatePassword(req.body);

  if (user) {
    try {
      const session = await createSession(
        user._id,
        req.get("user-agent") || ""
      );

      const accessToken = signJwt(
        {
          ...user,
          session: session._id,
        },
        {
          expiresIn: process.env.ACCESSTOKENTTL ?? "15m", // 15 min
        }
      );
      const refreshToken = signJwt(
        {
          ...user,
          session: session._id,
        },
        {
          expiresIn: process.env.REFRESHTOKENTTL ?? "1y", // 1yr
        }
      );

      return res.send({ accessToken, refreshToken });
    } catch (error) {
      log.error(error);
      next(new HttpException(500, "Unable to create user session"));
    }
  }

  next(new HttpException(401, "Invalid email or password"));
}

export async function getUserSessionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(404, error?.message));
  }
}

export async function deleteSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (error: any) {
    log.error(error);
    next(new HttpException(500, error?.message));
  }
}
