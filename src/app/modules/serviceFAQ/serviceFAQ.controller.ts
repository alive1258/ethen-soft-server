import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";
import { ServiceFAQServices } from "./serviceFAQ.service";
import { serviceFAQFilterableFields } from "./serviceFAQ.constant";

// Controller to handle Service FAQ creation
const createServiceFAQ = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ServiceFAQServices.createServiceFAQIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service FAQ created successfully",
    data: result,
  });
});

// Controller to handle retrieving all Service FAQ
const getAllServiceFAQ = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceFAQFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceFAQServices.getAllServiceFAQFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service FAQ retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Service FAQ by ID
const getSingleServiceFAQ = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceFAQServices.getSingleServiceFAQFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Service FAQ data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Service FAQ retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a Service FAQ by ID
const updateServiceFAQ = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ServiceFAQServices.updateServiceFAQInDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service FAQ updated successfully",
    data: result,
  });
});

// Controller to handle deleting a Service FAQ by ID
const deleteServiceFAQ = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceFAQServices.deleteServiceFAQFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Service FAQ not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service FAQ deleted successfully!",
    data: "",
  });
});

// export Service FAQs as object
export const ServiceFAQController = {
  createServiceFAQ,
  getAllServiceFAQ,
  getSingleServiceFAQ,
  updateServiceFAQ,
  deleteServiceFAQ,
};
