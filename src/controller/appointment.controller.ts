import { Request, Response } from "express";

export async function createAppointmentHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
}
