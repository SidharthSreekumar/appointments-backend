import { omit } from "lodash";
import ServiceTypeModel, {
  ServiceTypeDocument,
  ServiceTypeInput,
} from "../models/serviceType.model";
import UserModel, { UserDocument } from "../models/user.model";
import log from "../utils/logger.util";
import { FilterQuery } from "mongoose";

export async function createServiceType(
  input: ServiceTypeInput,
  userId: UserDocument["_id"]
) {
  try {
    const user = await UserModel.findById(userId);
    if (!user?.isAdmin) {
      throw new Error("Only an admin user can create a Service Type");
    }
    const serviceType = await ServiceTypeModel.create(input);
    return omit(serviceType.toObject(), ["__v", "_id", "isActive"]);
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function getServiceType(query: FilterQuery<ServiceTypeDocument>) {
  try {
    const serviceType = await ServiceTypeModel.findOne({
      ...query,
    })
      .select({ __v: 0, _id: 0, isActive: 0, createdAt: 0, updatedAt: 0 })
      .lean();
    if (!serviceType) throw new Error("Service Type not found");
    return serviceType;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function getAllActiveServiceTypes() {
  try {
    const serviceTypes = await ServiceTypeModel.find({ isActive: true })
      .select({ __v: 0, _id: 0, isActive: 0, createdAt: 0, updatedAt: 0 })
      .lean();
    return serviceTypes;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function editServiceType(
  query: FilterQuery<ServiceTypeDocument>,
  input: ServiceTypeInput
) {
  try {
    const serviceType = await ServiceTypeModel.findOne({ ...query });
    if (!serviceType) throw new Error("Service Type not found");
    Object.assign(serviceType, input);
    const updatedServiceType = await serviceType.save();
    log.info(updatedServiceType);
    return omit(serviceType.toJSON(), ["__v", "_id"]);
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function disableServiceType(
  query: FilterQuery<ServiceTypeDocument>
) {
  try {
    const serviceType = await ServiceTypeModel.findOne({ ...query });
    if (!serviceType) throw new Error("Service Type not found");
    serviceType.isActive = false;
    const updatedServiceType = await serviceType.save();
    return updatedServiceType;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
