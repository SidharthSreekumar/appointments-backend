import { NextFunction, Request, Response } from "express";
import log from "../utils/logger.util";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import HttpException from "../utils/exceptions/http.exception";

// @desc creates a new user
// @route POST /api/users
export async function createUserHandler(
  req: Request<object, object, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(409, error?.message));
  }
}
