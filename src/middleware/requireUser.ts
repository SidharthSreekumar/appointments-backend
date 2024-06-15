import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import log from "../utils/logger.util";
import HttpException from "../utils/exceptions/http.exception";

const requireUser =
  (requireAdmin: boolean = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!user) {
      return res.sendStatus(403);
    }

    if (requireAdmin) {
      try {
        const userObject = await UserModel.findById(user._id);
        if (!userObject) throw new Error("Authentication Error");
        if (!userObject.isAdmin) throw new Error("Permission denied");
      } catch (error: any) {
        log.error(error);
        next(new HttpException(401, error.message));
      }
    }

    return next();
  };

export default requireUser;
