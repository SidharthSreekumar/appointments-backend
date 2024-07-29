import { NextFunction, Request, Response } from "express";
import {
  CreateAppointmentInput,
  EditAppointmentInput,
} from "../schema/appointment.schema";
import {
  createAppointment,
  getAllActiveAppointments,
  getAllUserAppointments,
} from "../service/appointment.service";
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

export async function getAllActiveAppointmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;
    const appointments = await getAllActiveAppointments(userId);
    return res.send(appointments);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(401, error?.message));
  }
}

export async function getAllUserAppointmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;
    const appointments = await getAllUserAppointments(userId);
    return res.send(appointments);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(401, error?.message));
  }
}

export async function editAppointmentHandler(
  req: Request<EditAppointmentInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;
    const appointmentId = req.params.appointmentId;
    // const appointment = await editAppointment(userId, );
    // return res.send(appointment);
  } catch (error: any) {
    log.error(error);
    next(new HttpException(409, error?.message));
  }
}
