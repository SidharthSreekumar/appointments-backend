import { FilterQuery } from "mongoose";
import AppointmentModel, {
  AppointmentDocument,
  AppointmentInput,
} from "../models/appointment.model";
import UserModel, { UserDocument } from "../models/user.model";
import dayjs from "dayjs";
import { omit } from "lodash";

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

/**
 * Get all active appointments of a logged in non admin user
 *
 * @param userId - id of the user
 * @returns active appointments of the user
 */
export async function getAllUserAppointments(userId: UserDocument["_id"]) {
  try {
    // Check if user is logged in
    if (!userId) throw new Error("Logged in user not found");

    // Find all active appointments of the user
    const appointments = await AppointmentModel.find({
      client: userId,
      valid: true,
    }).lean();

    // Return the appointments
    return appointments;
  } catch (error: any) {
    // Handle any errors
    throw new Error(error);
  }
}

/**
 * Edit an appointment
 * @param userId - user id who is editing the appointment
 * @param query - query to find the appointment
 * @param input - input to edit the appointment
 * @returns edited appointment
 */
export async function editAppointment(
  userId: UserDocument["_id"],
  query: FilterQuery<AppointmentDocument>,
  input: Omit<AppointmentInput, "client">
): Promise<Omit<AppointmentDocument, "__v" | "_id">> {
  try {
    const appointment = await AppointmentModel.findOne({ ...query });
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Only the owner or admin can edit an appointment
    if (!user?.isAdmin || !user.id.equals(appointment?.client)) {
      throw new Error("Only the owner or admin can edit an appointment");
    }

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Checking if the original appointment date is at least 24 hours after
    const currentDate = dayjs();
    // current date < appointment date - 1 day
    if (dayjs().isBefore(dayjs(appointment.startTime).subtract(1, "day"))) {
      Object.assign(appointment, input);
      const updatedAppointment = await appointment.save();
      return omit(updatedAppointment.toJSON(), ["__v", "_id"]);
    } else {
      throw new Error("Cannot edit an appointment before 24 hours");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
