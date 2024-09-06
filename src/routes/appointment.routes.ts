import express from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createAppointmentSchema,
  editAppointmentSchema,
} from "../schema/appointment.schema";
import {
  createAppointmentHandler,
  editAppointmentHandler,
  getAllActiveAppointmentsHandler,
  getAllUserAppointmentsHandler,
} from "../controller/appointment.controller";
const router = express.Router();

router
  .route("/")
  .post(
    requireUser(),
    validateResource(createAppointmentSchema),
    createAppointmentHandler
  )
  .get(requireUser(), getAllUserAppointmentsHandler);

router.get("/all", requireUser(true), getAllActiveAppointmentsHandler);
// Edit an appointment
router.patch(
  "/edit/:appointmentId",
  requireUser(),
  validateResource(editAppointmentSchema),
  editAppointmentHandler
);

export default router;
