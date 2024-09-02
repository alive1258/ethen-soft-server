import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { userFilterableFields } from "./user.constant";
import { TUser, TUserFilters } from "./user.interface";
import { User } from "./user.module";
import { TGenericResponse } from "../../../interfaces/common";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// Service to create a new user in the database
const createUserIntoDB = async (userData: TUser) => {
  // set initial isEmailVerified to false
  if (userData?.isEmailVerified) {
    userData.isEmailVerified = false;
  }
  // Check if a user with the given email already exists
  if (await User.isUserExists(userData.email)) {
    throw new ApiError(httpStatus.CONFLICT, "user already exist"); // Throw an error if the user already exists
  }

  // Create a new user in the database using the provided user data
  const result = await User.create(userData); // built in static methods

  // Remove the password field from the result
  // result.password = "";

  return result;
};

// Service to retrieve all users from the database
const getAllUsersFromDB = async (
  filters: TUserFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TUser[]>> => {
  // destructuring searchTerm and filters data
  const { searchTerm, ...filtersData } = filters;

  // destructuring pagination dependency
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //andConditions used for containing all query to get data from database
  const andConditions: any[] = [];

  // Search term filter (e.g., for name or email)
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Additional filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: `^${value}$`,
          $options: "i",
        },
      })),
    });
  }

  // Sorting conditions
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Applying conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // find  customers dat from db
  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count customers data
  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single user from the database by ID
const getSingleUserFromDB = async (_id: string) => {
  const result = await User.findOne({ _id });
  // Use Mongoose's aggregate method to match a user by ID
  // const result = await User.aggregate([{ $match: { _id: _id } }]);

  // checking user's availability
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  return result;
};

// Service to update a user in the database by ID
const updateUserInDB = async (_id: string, updateData: Partial<TUser>) => {
  // Update the user document with the provided data
  const result = await User.findByIdAndUpdate(_id, updateData, {
    new: true, // Return the updated document
    // runValidators: true, // Ensure the update respects schema validation
  });

  // checking user's availability
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

// Service to perform a soft delete of a user by setting `isDeleted` to true
const deleteUserFromDB = async (_id: string) => {
  // Update the user document to mark it as deleted
  const result = await User.updateOne({ _id }, { isDeleted: true });

  // checking user's availability
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
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
