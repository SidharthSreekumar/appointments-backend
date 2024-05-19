import ServiceTypeModel, {
  ServiceTypeInput,
} from "../models/serviceType.model";
import UserModel, { UserDocument } from "../models/user.model";

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
    return serviceType;
  } catch (error: any) {
    throw new Error(error);
  }
}
