import { Request, Response } from "express";
import log from "../utils/logger";

export function createUserHandler(req: Request, res: Response) {
  try {
    // TODO create user service
  } catch (error: any) {
    log.error(error);
    return res.sendStatus(409).send(error.message);
  }
}
