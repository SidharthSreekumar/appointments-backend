import { Request, Response } from "express";
import {
  createServiceType,
  getAllActiveServiceTypes,
  getServiceType,
} from "../service/serviceType.service";
import log from "../utils/logger.util";
import {
  CreateServiceTypeInput,
  GetServiceTypeInput,
} from "../schema/serviceType.schema";

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

export async function getServiceTypeHandler(
  req: Request<GetServiceTypeInput["params"]>,
  res: Response
) {
  try {
    const serviceTypeId = req.params.serviceTypeId;
    const serviceType = await getServiceType({ serviceTypeId });
    if (!serviceType) return res.sendStatus(404);
    return res.send(serviceType);
  } catch (error: any) {
    log.error(error);
    res.status(404).send(error.message);
  }
}

export async function getAllActiveServiceTypesHandler(
  req: Request,
  res: Response
) {
  try {
    const serviceTypes = await getAllActiveServiceTypes();
    return res.send(serviceTypes);
  } catch (error: any) {
    log.error(error);
    res.status(404).send(error.message);
  }
}
