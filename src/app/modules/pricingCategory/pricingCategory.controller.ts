import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PricingCategoryServices } from "./pricingController.service";

// Controller to handle PricingCategory creation
const createPricingCategory = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await PricingCategoryServices.createPricingCategoryIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing category created successfully",
    data: result,
  });
});

// Controller to handle retrieving all pricing categories
const getAllPricingCategory = catchAsync(async (req, res) => {
  const result = await PricingCategoryServices.getAllPricingCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PricingCategory retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single PricingCategory by ID
const getSinglePricingCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await PricingCategoryServices.getSinglePricingCategoryFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Pricing category data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Pricing category retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a pricing category by ID
const updatePricingCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await PricingCategoryServices.updatePricingCategoryInDB(
    id,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing category updated successfully",
    data: result,
  });
});

// Controller to handle deleting a Pricing category by ID
const deletePricingCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricingCategoryServices.deletePricingCategoryFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Pricing category not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing category deleted successfully!",
    data: "",
  });
});

export const PricingCategoryController = {
  createPricingCategory,
  getAllPricingCategory,
  getSinglePricingCategory,
  updatePricingCategory,
  deletePricingCategory,
};
