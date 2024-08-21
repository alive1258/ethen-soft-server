import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TechServices } from "./tech.service";

// Controller to handle Technology creation
const createTechnology = catchAsync(async (req, res) => {
  const technologyData = req.body;

  const result = await TechServices.createTechnologyIntoDB(technologyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Technology created successfully",
    data: result,
  });
});

// Controller to handle retrieving all Technology
const getAllTechnology = catchAsync(async (req, res) => {
  const result = await TechServices.getAllTechnologyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Technology retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Technology by ID
const getSingleTechnology = catchAsync(async (req, res) => {
  const { technologyId } = req.params;
  const result = await TechServices.getSingleTechnologyFromDB(technologyId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Technology not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Technology retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a Technology by ID
const updateTechnology = catchAsync(async (req, res) => {
  const { technologyId } = req.params;
  const updateData = req.body;

  const result = await TechServices.updateTechnologyInDB(
    technologyId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Technology updated successfully",
    data: result,
  });
});

// Controller to handle deleting a Technology by ID
const deleteTechnology = catchAsync(async (req, res) => {
  const { technologyId } = req.params;
  const result = await TechServices.deleteTechnologyFromDB(technologyId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Technology not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Technology deleted successfully",
    data: "",
  });
});

export const TechnologyControllers = {
  createTechnology,
  getAllTechnology,
  getSingleTechnology,
  updateTechnology,
  deleteTechnology,
};
