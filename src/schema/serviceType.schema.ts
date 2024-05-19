import { number, object, string, TypeOf } from "zod";

export const createServiceTypeSchema = object({
  body: object({
    name: string({
      required_error: "Service Type name is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    duration: number({
      required_error: "Duration is required",
    }), // in minutes
    price: number({
      required_error: "Service price is required",
    }),
  }),
});

export type CreateServiceTypeInput =  TypeOf<typeof createServiceTypeSchema>;
