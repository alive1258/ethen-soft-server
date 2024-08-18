import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

import { TrustUsServices } from "./trustUs.service";

// Controller to handle TrustUs creation
const createTrustUs = catchAsync(async (req, res) => {
  const trustUsData = req.body;

  const result = await TrustUsServices.createTrustUsIntoDB(trustUsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TrustUs created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllTrustUs = catchAsync(async (req, res) => {
  const result = await TrustUsServices.getAllTrustUsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TrustUs retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single TrustUs by ID
const getSingleTrustUs = catchAsync(async (req, res) => {
  const { trustUsId } = req.params;
  const result = await TrustUsServices.getSingleTrustUsFromDB(trustUsId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "TrustUs data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single TrustUs retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a trustUs by ID
const updateTrustUs = catchAsync(async (req, res) => {
  const { trustUsId } = req.params;
  const updateData = req.body;
  const result = await TrustUsServices.updateTrustUsInDB(trustUsId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "trustUs updated successfully",
    data: result,
  });
});

// Controller to handle deleting a trustUsId by ID
const deleteTrustUs = catchAsync(async (req, res) => {
  const { trustUsId } = req.params;
  const result = await TrustUsServices.deleteTrustUsFromDB(trustUsId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "TrustUs not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TrustUs deleted successfully",
    data: "",
  });
});

export const TrustUsControllers = {
  createTrustUs,
  getAllTrustUs,
  getSingleTrustUs,
  updateTrustUs,
  deleteTrustUs,
};
