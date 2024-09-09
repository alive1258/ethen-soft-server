import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";
import { ServiceImageServices } from "./serviceImage.service";
import { serviceImageFilterableFiends } from "./serviceImage.constant";

// Controller to handle service image creation
const createServiceImage = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ServiceImageServices.createServiceImageIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service image created successfully",
    data: result,
  });
});

// Controller to handle retrieving all service image
const getAllServiceImage = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceImageFilterableFiends);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceImageServices.getAllServiceImageFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service image retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single service image by ID
const getSingleServiceImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceImageServices.getSingleServiceImageFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Service image data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Service image retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a service image by ID
const updateServiceImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ServiceImageServices.updateServiceImageInDB(
    id,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service image updated successfully",
    data: result,
  });
});

// Controller to handle deleting a service image by ID
const deleteServiceImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceImageServices.deleteServiceImageFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Service not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service image deleted successfully!",
    data: "",
  });
});

// export services image controllers as object
export const ServiceImageController = {
  createServiceImage,
  getAllServiceImage,
  getSingleServiceImage,
  updateServiceImage,
  deleteServiceImage,
};
