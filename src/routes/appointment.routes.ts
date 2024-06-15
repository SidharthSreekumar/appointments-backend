import express from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createAppointmentSchema } from "../schema/appointment.schema";
import { createAppointmentHandler } from "../controller/appointment.controller";
const router = express.Router();

router
  .route("/")
  .post(
    requireUser(),
    validateResource(createAppointmentSchema),
    createAppointmentHandler
  );

export default router;
