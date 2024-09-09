import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PricingServices } from "./pricing.service";

// Controller to handle Pricing creation
const createPricing = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await PricingServices.createPricingIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing created successfully",
    data: result,
  });
});

// Controller to handle retrieving all pricing categories
const getAllPricing = catchAsync(async (req, res) => {
  const { service } = req.query;
  const result = await PricingServices.getAllPricingFromDB(service);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single pricing by ID
const getSinglePricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricingServices.getSinglePricingFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Pricing data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Pricing retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a pricing  by ID
const updatePricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await PricingServices.updatePricingInDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing updated successfully",
    data: result,
  });
});

// Controller to handle deleting a pricing  by ID
const deletePricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PricingServices.deletePricingFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Pricing not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pricing deleted successfully!",
    data: "",
  });
});

export const PricingController = {
  createPricing,
  getAllPricing,
  getSinglePricing,
  updatePricing,
  deletePricing,
};
