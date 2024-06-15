import { NextFunction, Request, Response } from "express";
import {
  createServiceType,
  editServiceType,
  getAllActiveServiceTypes,
  getServiceType,
} from "../service/serviceType.service";
import log from "../utils/logger.util";
import {
  CreateServiceTypeInput,
  GetServiceTypeInput,
  UpdateServiceTypeInput,
} from "../schema/serviceType.schema";
import HttpException from "../utils/exceptions/http.exception";

export async function createServiceTypeHandler(
  req: Request<object, object, CreateServiceTypeInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;
    const serviceType = await createServiceType(req.body, userId);
    return res.send(serviceType);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(401, error?.message));
  }
}

export async function getServiceTypeHandler(
  req: Request<GetServiceTypeInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceTypeId = req.params.serviceTypeId;
    const serviceType = await getServiceType({ serviceTypeId });
    if (!serviceType) return res.sendStatus(404);
    return res.send(serviceType);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(404, error?.message));
  }
}

export async function getAllActiveServiceTypesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceTypes = await getAllActiveServiceTypes();
    return res.send(serviceTypes);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(404, error?.message));
  }
}

export async function updateServiceTypeHandler(
  req: Request<UpdateServiceTypeInput["params"]>,
  res: Response,
  next: NextFunction
) {
  const serviceTypeId = req.params.serviceTypeId;
  const update = req.body;
  try {
    const serviceType = await editServiceType({ serviceTypeId }, update);
    return res.send(serviceType);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(500, error?.message));
  }
}
