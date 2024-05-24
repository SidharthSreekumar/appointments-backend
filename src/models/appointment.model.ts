import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import ServiceTypeModel, { ServiceTypeDocument } from "./serviceType.model";

export interface AppointmentInput {
  client: UserDocument["_id"];
  serviceTypeId: string;
  dateTime: string; // Date validation is done via Zod (appointment.schema.ts)
}

export interface AppointmentDocument
  extends AppointmentInput,
    mongoose.Document {
  startTime: Date;
  endTime: Date;
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceTypeId: { type: String, required: true },
    dateTime: { type: String, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre save tasks
 *
 * Error handling is done in appointment.service.ts
 */
appointmentSchema.pre("save", async function (next) {
  const appointment = this as AppointmentDocument;

  // Getting service duration for the input id
  const serviceType = await ServiceTypeModel.findOne({
    serviceTypeId: appointment.serviceTypeId,
  }).lean();

  if (!serviceType) {
    throw new Error("Service Type does not exist");
  }

  const parsedStartTime = new Date(appointment.dateTime);
  const parsedEndTime = new Date(appointment.dateTime);
  parsedEndTime.setMinutes(
    parsedStartTime.getMinutes() + (serviceType?.duration ?? 30)
  );

  appointment.startTime = parsedStartTime;
  appointment.endTime = parsedEndTime;

  // Checking for existing appointments for the input time
  const existingAppointment = await AppointmentModel.findOne({
    $or: [
      { startTime: { $lt: appointment.endTime, $gte: appointment.startTime } },
      { endTime: { $gt: appointment.startTime, $lte: appointment.endTime } },
      {
        startTime: { $lte: appointment.startTime },
        endTime: { $gte: appointment.endTime },
      },
    ],
  }).lean();

  if (existingAppointment) {
    throw new Error("Slot is already booked for time");
  }

  next();
});

const AppointmentModel = mongoose.model<AppointmentDocument>(
  "Appointment",
  appointmentSchema
);

export default AppointmentModel;
