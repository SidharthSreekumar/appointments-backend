import mongoose from "mongoose";

export interface ServiceTypeInput {
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface ServiceTypeDocument extends ServiceTypeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceTypeModel = mongoose.model<ServiceTypeDocument>(
  "ServiceType",
  serviceSchema
);

export default ServiceTypeModel;
