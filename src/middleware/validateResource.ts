import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger.util";

/**
 * A middleware to validate the request body and params using Zod.
 *
 * @param schema
 * @returns
 */
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      log.error(error);
      return res.status(400).send(error.errors);
    }
  };

export default validate;
