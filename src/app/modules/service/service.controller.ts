import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";
import { ServiceServices } from "./service.service";

// Controller to handle service creation
const createService = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ServiceServices.createServiceIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

// Controller to handle retrieving all service
const getAllService = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceServices.getAllServiceFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single service by ID
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Service data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Service retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a service by ID
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ServiceServices.updateServiceInDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

// Controller to handle deleting a service by ID
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Service not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully!",
    data: "",
  });
});

// export services as object
export const ServiceControllers = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
