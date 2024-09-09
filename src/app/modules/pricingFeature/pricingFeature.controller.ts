import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PricingFeatureServices } from "./pricingFeature.service";
import pick from "../../utils/pick";
import { pricingFeaturesFilterableFields } from "./pricingFeature.constant";
import { paginationFields } from "../../constants/pagination";

// Controller to handle pricing feature creation
const createPricingFeature = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await PricingFeatureServices.createPricingFeatureIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing feature created successfully",
    data: result,
  });
});

// Controller to handle retrieving all pricing feature
const getAllPricingFeature = catchAsync(async (req, res) => {
  const filters = pick(req.query, pricingFeaturesFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PricingFeatureServices.getAllPricingFeatureFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing feature retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single pricing feature by ID
const getSinglePricingFeature = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricingFeatureServices.getSinglePricingFeatureFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Pricing feature data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Pricing Feature retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a pricing feature by ID
const updatePricingFeature = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await PricingFeatureServices.updatePricingFeatureInDB(
    id,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing feature updated successfully",
    data: result,
  });
});

// Controller to handle deleting a Pricing Feature by ID
const deletePricingFeature = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricingFeatureServices.deletePricingFeatureFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Pricing feature not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing feature deleted successfully!",
    data: "",
  });
});

// export pricing features as object
export const PricingFeatureController = {
  createPricingFeature,
  getAllPricingFeature,
  getSinglePricingFeature,
  updatePricingFeature,
  deletePricingFeature,
};
