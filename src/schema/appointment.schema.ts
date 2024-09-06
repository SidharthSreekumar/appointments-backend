import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    serviceTypeId: string({
      required_error: "Service Type Id is required",
    }),
    dateTime: string({
      required_error: "Date and time is required",
    }).datetime(),
  }),
};

const params = {
  params: object({
    appointmentId: string({
      required_error: "Appointment Id is required",
    }),
  }),
};
export const createAppointmentSchema = object({ ...payload });
export const editAppointmentSchema = object({ ...params, ...payload });

export type CreateAppointmentInput = TypeOf<typeof createAppointmentSchema>;
export type EditAppointmentInput = TypeOf<typeof editAppointmentSchema>;
