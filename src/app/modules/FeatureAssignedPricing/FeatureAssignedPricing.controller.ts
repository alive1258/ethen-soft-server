import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FeatureAssignedPricingServices } from "./FeatureAssignedPricing.service";
import pick from "../../utils/pick";
import { featureAssignedPricingFilterableFields } from "./FeatureAssignedPricing.constant";
import { paginationFields } from "../../constants/pagination";

// Controller to handle feature assigned to pricing creation
const createFeatureAssignedPricing = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await FeatureAssignedPricingServices.createFeatureAssignedPricingIntoDB(
      data
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feature assigned to pricing created successfully",
    data: result,
  });
});

// Controller to handle retrieving all feature assigned to pricing
const getAllFeatureAssignedPricing = catchAsync(async (req, res) => {
  const filters = pick(req.query, featureAssignedPricingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result =
    await FeatureAssignedPricingServices.getAllFeatureAssignedPricingFromDB(
      filters,
      paginationOptions
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feature assigned to pricing retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single feature assigned to pricing by ID
const getSingleFeatureAssignedPricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await FeatureAssignedPricingServices.getSingleFeatureAssignedPricingFromDB(
      id
    );

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

// Controller to handle updating a feature assigned to pricing by ID
const updateFeatureAssignedPricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result =
    await FeatureAssignedPricingServices.updateFeatureAssignedPricingInDB(
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

// Controller to handle deleting a feature assigned to pricing by ID
const deleteFeatureAssignedPricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await FeatureAssignedPricingServices.deleteFeatureAssignedPricingFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Feature assigned to pricing not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feature assigned to pricing deleted successfully!",
    data: "",
  });
});

export const FeatureAssignedPricingController = {
  createFeatureAssignedPricing,
  getAllFeatureAssignedPricing,
  getSingleFeatureAssignedPricing,
  updateFeatureAssignedPricing,
  deleteFeatureAssignedPricing,
};
