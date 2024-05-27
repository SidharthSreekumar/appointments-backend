import { object, string, TypeOf } from "zod";

export const createAppointmentSchema = object({
  body: object({
    serviceTypeId: string({
      required_error: "Service Type ID is required",
    }),
    dateTime: string({
      required_error: "Date and time is required",
    }).datetime(),
  }),
});

export type CreateAppointmentInput = TypeOf<typeof createAppointmentSchema>;
