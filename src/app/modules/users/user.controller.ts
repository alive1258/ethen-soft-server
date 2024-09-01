import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
// import userValidationSchema from "./user.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";
import { userFilterableFields } from "./user.constant";

// Controller to handle user creation
const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  // Create a new user in the database using the validated data
  const result = await UserServices.createUserIntoDB(userData);

  // Respond with a success message and the retrieved user data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// Controller to handle retrieving all users
const getAllUsers = catchAsync(async (req, res) => {
  // formating filters data as database requirment
  const filtersData = pick(req.query, userFilterableFields);

  // formating pagination fields with query requirment
  const paginationOptions = pick(req.query, paginationFields);

  // Retrieve all users from the database
  const result = await UserServices.getAllUsersFromDB(
    filtersData,
    paginationOptions
  );
  // Respond with a success message and the retrieved user data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single user by ID
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  // Retrieve a single user from the database by their ID
  const result = await UserServices.getSingleUserFromDB(userId);

  // Respond with a success message and the retrieved user data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single User retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a user by ID
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  // users updated data
  const updateData = req.body;

  // Update the user in the database using the validated data
  const result = await UserServices.updateUserInDB(userId, updateData);

  // Respond with a success message and the updated user data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

// Controller to handle deleting a user by ID
const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  // Delete the user from the database by their ID
  const result = await UserServices.deleteUserFromDB(userId);

  // Respond with a success message and the result of the deletion
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: "",
  });
});

// Export the user controllers as an object for use in other parts of the application
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
