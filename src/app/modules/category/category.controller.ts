import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";

// Controller to handle category creation
const createCategory = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await CategoryServices.createCategoryIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

// Controller to handle retrieving all category categories
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single category by ID
const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Category data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Category retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a category  by ID
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await CategoryServices.updateCategoryInDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

// Controller to handle deleting a category  by ID
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Category not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully!",
    data: "",
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
