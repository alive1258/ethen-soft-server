import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

// Controller to handle user creation
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // Validate the incoming user data using Zod schema
    const zodParserData = userValidationSchema.parse(userData);

    // Create a new user in the database using the validated data
    const result = await UserServices.createUserIntoDB(zodParserData);

    // Respond with a success message and the created user data
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.massage || "User creation failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Controller to handle retrieving all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Retrieve all users from the database
    const result = await UserServices.getAllUsersFromDB();

    // Respond with a success message and the retrieved users
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Controller to handle retrieving a single user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Retrieve a single user from the database by their ID
    const result = await UserServices.getSingleUserFromDB(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with a success message and the retrieved user data
    res.status(200).json({
      success: true,
      message: "Single User retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Controller to handle updating a user by ID
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Validate the incoming update data using Zod schema (if necessary)
    // const validatedUpdateData = userUpdateValidationSchema.parse(updateData);

    // Update the user in the database using the validated data
    const result = await UserServices.updateUserInDB(userId, updateData);

    // Respond with a success message and the updated user data
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Controller to handle deleting a user by ID
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Delete the user from the database by their ID
    const result = await UserServices.deleteUserFromDB(userId);

    // Respond with a success message and the result of the deletion
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Export the user controllers as an object for use in other parts of the application
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
