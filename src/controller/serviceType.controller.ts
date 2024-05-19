import { Request, Response } from "express";
import { createServiceType } from "../service/serviceType.service";
import log from "../utils/logger";
import { CreateServiceTypeInput } from "../schema/serviceType.schema";

export async function createServiceTypeHandler(
  req: Request<object, object, CreateServiceTypeInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const serviceType = await createServiceType(req.body, userId);
    return res.send(serviceType);
  } catch (error: any) {
    log.error(error);
    return res.status(401).send(error?.message);
  }
}
