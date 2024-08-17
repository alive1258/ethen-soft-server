import { TUser } from "./user.interface";
import { User } from "./user.module";

// Service to create a new user in the database
const createUserIntoDB = async (userData: TUser) => {
  // Check if a user with the given email already exists
  if (await User.isUserExists(userData.email)) {
    throw new Error("user already exist"); // Throw an error if the user already exists
  }

  // Create a new user in the database using the provided user data
  const result = await User.create(userData); // built in static methods

  // Remove the password field from the result
  // result.password = "";

  return result;
};

// Service to retrieve all users from the database
const getAllUsersFromDB = async () => {
  // Find all user documents in the collection
  // const result = await User.find();
  const result = await User.find();
  return result;
};

// Service to retrieve a single user from the database by ID
const getSingleUserFromDB = async (_id: string) => {
  const result = await User.findOne({ _id });
  // Use Mongoose's aggregate method to match a user by ID
  // const result = await User.aggregate([{ $match: { _id: _id } }]);
  return result;
};

// Service to update a user in the database by ID
const updateUserInDB = async (_id: string, updateData: Partial<TUser>) => {
  // Update the user document with the provided data
  const result = await User.findByIdAndUpdate(_id, updateData, {
    new: true, // Return the updated document
    // runValidators: true, // Ensure the update respects schema validation
  });

  if (!result) {
    throw new Error("User not found");
  }

  return result;
};

// Service to perform a soft delete of a user by setting `isDeleted` to true
const deleteUserFromDB = async (_id: string) => {
  // Update the user document to mark it as deleted
  const result = await User.updateOne({ _id }, { isDeleted: true });
  return result;
};

// Export the user services as an object for use in other parts of the application
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
