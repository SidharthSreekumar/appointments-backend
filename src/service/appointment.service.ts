import { FilterQuery } from "mongoose";
import AppointmentModel, {
  AppointmentDocument,
  AppointmentInput,
} from "../models/appointment.model";
import UserModel, { UserDocument } from "../models/user.model";
import log from "../utils/logger.util";

/**
 * Create an appointment
 * @param input - appointment input
 * @returns created appointment
 */
export async function createAppointment(input: AppointmentInput) {
  try {
    const appointment = await AppointmentModel.create(input);
    return appointment.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Get all active appointments from all clients
 *
 * @returns active appointments
 */
export async function getAllActiveAppointments(userId: UserDocument["_id"]) {
  try {
    const user = await UserModel.findById(userId);
    if (!user || !user.isAdmin) {
      throw new Error("Only an admin user can see all active appointments");
    }
    const appointments = await AppointmentModel.find({ valid: true }).lean();
    return appointments;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get all active appointments of a logged in non admin user
export async function getAllUserAppointments(userId: UserDocument["_id"]) {
  try {
    if (!userId) throw new Error("Logged in user not found");
    const appointments = await AppointmentModel.find({
      client: userId,
      valid: true,
    }).lean();
    return appointments;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Edit appointment before 24 hours (or a set time)
export async function editAppointment(
  userId: UserDocument["_id"],
  query: FilterQuery<AppointmentDocument>,
  input: Omit<AppointmentInput, "client">
) {
  try {
    const appointment = await AppointmentModel.findOne({ ...query });
    if (!appointment) throw new Error("Appointment not found");
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours
    const timeDifference =
      Number(Date.now()) - Number(appointment.startTime.toUTCString());
    log.info({
      timeDifference,
      oneDay,
      dateNow: Date.now(),
      appDate: appointment.startTime.toUTCString(),
    });
    // if (Date.now) Object.assign(appointment, input);
  } catch (error: any) {
    throw new Error(error);
  }
}

// Cancel appointment
