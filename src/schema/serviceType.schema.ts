import { number, object, string, TypeOf } from "zod";

const payload = {
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
};

const params = {
  params: object({
    serviceTypeId: string({
      required_error: "Service Type Id is required",
    }),
  }),
};

export const createServiceTypeSchema = object({
  ...payload,
});

export const getServiceTypeSchema = object({
  ...params,
});

export const updateServiceTypeSchema = object({
  ...payload,
  ...params,
});

export type CreateServiceTypeInput = TypeOf<typeof createServiceTypeSchema>;
export type GetServiceTypeInput = TypeOf<typeof getServiceTypeSchema>;
