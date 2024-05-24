import AppointmentModel, {
  AppointmentInput,
} from "../models/appointment.model";
import { UserDocument } from "../models/user.model";

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
export async function getActiveAppointment() {
  return await AppointmentModel.find({ valid: true });
}

export async function getAvailableTimeSlots() {}
