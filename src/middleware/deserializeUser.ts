import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.util";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /Bearer\s/,
    ""
  );

  const refreshToken: string = get(req, "headers.x-refresh", "").toString();

  if (!accessToken) return next();
  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
