import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ServiceDocument } from "./serviceType.model";

export interface AppointmentInput {
  client: UserDocument["_id"];
  serviceType: ServiceDocument["_id"];
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
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model<AppointmentDocument>(
  "Appointment",
  appointmentSchema
);

export default AppointmentModel;
