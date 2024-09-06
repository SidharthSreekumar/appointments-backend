import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { FilterQuery } from "mongoose";
import log from "../utils/logger.util";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON({ flattenMaps: true }), [
      "password",
      "isAdmin",
      "__v",
    ]);
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Validate a user's login credentials
 *
 * @param email - The email address of the user
 * @param password - The password of the user
 * @returns A boolean indicating whether the credentials are valid or not
 */
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) return false;

    // Compare the provided password with the user's password
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    // Return the user data (without password and isAdmin)
    return omit(user.toObject({ flattenMaps: true }), [
      "password",
      "isAdmin",
      "__v",
    ]);
  } catch (error) {
    // Log any errors
    log.error(error);
    // Throw an error if something went wrong
    throw new Error("Unable to validate password");
  }
}

// ! For internal use only
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

/**
 * Edit a user
 *
 * @param userId - The id of the user to edit
 * @param loggedInUserId - The id of the user who is editing the user
 * @param input - The input to edit the user
 * @returns The edited user with password and isAdmin omitted
 */
export async function editUser(
  userId: UserDocument["_id"],
  loggedInUserId: UserDocument["_id"],
  input: Omit<UserInput, "password" | "email">
): Promise<Omit<UserDocument, "password" | "isAdmin" | "__v">> {
  try {
    // Find the user who is doing the editing
    const loggedInUser = await UserModel.findById(loggedInUserId);
    if (!loggedInUser) throw new Error("User not found");

    // Check if logged in user is same as the user being edited if not check if it is admin
    if (loggedInUserId !== userId && !loggedInUser.isAdmin) {
      throw new Error(
        "Only the owner or admin can edit a user. Please log in as the user you want to edit or ask an admin to do it for you."
      );
    }

    // Find the user to edit
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    // Update the user
    Object.assign(user, input);
    const updatedUser = await user.save();

    // Return the updated user with password and isAdmin omitted
    return omit(updatedUser.toJSON(), ["password", "isAdmin", "__v"]);
  } catch (error: any) {
    throw new Error(error);
  }
}
