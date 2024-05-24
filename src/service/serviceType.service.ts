import { omit } from "lodash";
import ServiceTypeModel, {
  ServiceTypeInput,
} from "../models/serviceType.model";
import UserModel, { UserDocument } from "../models/user.model";
import log from "../utils/logger.util";

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
    return omit(serviceType.toObject(), ["__v", "_id"]);
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
