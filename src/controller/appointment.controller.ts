import { NextFunction, Request, Response } from "express";
import { CreateAppointmentInput } from "../schema/appointment.schema";
import { createAppointment } from "../service/appointment.service";
import log from "../utils/logger.util";
import HttpException from "../utils/exceptions/http.exception";

export async function createAppointmentHandler(
  req: Request<object, object, CreateAppointmentInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;
    const appointment = await createAppointment({
      client: userId,
      ...req.body,
    });
    return res.send(appointment);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(409, error?.message));
  }
}
