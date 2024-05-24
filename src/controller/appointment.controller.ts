import { Request, Response } from "express";
import { CreateAppointmentInput } from "../schema/appointment.schema";
import { createAppointment } from "../service/appointment.service";
import log from "../utils/logger.util";

export async function createAppointmentHandler(
  req: Request<object, object, CreateAppointmentInput["body"]>,
  res: Response
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
    return res.status(409).send(error?.message);
  }
}
