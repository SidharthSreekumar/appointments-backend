import mongoose from "mongoose";
import getAlphaNumString from "../utils/nanoid.util";

export interface ServiceTypeInput {
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface ServiceTypeDocument
  extends ServiceTypeInput,
    mongoose.Document {
  serviceTypeId: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serviceTypeId: { type: String, unique: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre("save", async function (next) {
  const serviceType = this as ServiceTypeDocument;
  const existingServiceType = await ServiceTypeModel.findOne({
    name: {
      $regex: new RegExp("^" + serviceType.name.toLowerCase() + "$", "i"),
    },
  });
  if (existingServiceType) {
    return next(new Error("Service Type with this name already exists"));
  }
  const randomString = await getAlphaNumString(10);
  serviceType.serviceTypeId =
    serviceType.name.toLowerCase() + "-" + randomString;
});

const ServiceTypeModel = mongoose.model<ServiceTypeDocument>(
  "ServiceType",
  serviceSchema
);

export default ServiceTypeModel;
