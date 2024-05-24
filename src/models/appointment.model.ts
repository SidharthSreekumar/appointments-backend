import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ServiceTypeDocument } from "./serviceType.model";

export interface AppointmentInput {
  client: UserDocument["_id"];
  serviceTypeId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  valid: boolean;
}

export interface AppointmentDocument
  extends AppointmentInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceTypeId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.pre("save", async function (next) {
  const appointment = this as AppointmentDocument;
  const existingAppointment = await AppointmentModel.findOne({
    startTime: { $lt: appointment.endTime },
    endTime: { $gt: appointment.startTime },
  });

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
