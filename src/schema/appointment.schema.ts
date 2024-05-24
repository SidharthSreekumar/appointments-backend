import { date, object, string } from "zod";

export const createAppointmentSchema = object({
  body: object({
    serviceType: string({
      required_error: "Service Type ID is required",
    }),
    date: date({
      required_error: "Date is required",
    }),
    startTime: date({
      required_error: "Start time is required",
    }),
    endTime: date({
      required_error: "End time is required",
    }),
  }),
});
