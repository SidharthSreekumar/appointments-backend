import AppointmentModel, {
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
 * Get all active appointments
 *
 * @returns active appointments
 */
export async function getActiveAppointment(userId: UserDocument["_id"]) {
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

export async function getAvailableTimeSlots() {}
