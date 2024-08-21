import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { JoinUsServices } from "./joinUs.service";

// Controller to handle JoinUs creation
const createJoinUs = catchAsync(async (req, res) => {
  const teamData = req.body;

  const result = await JoinUsServices.createJoinUsIntoDB(teamData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "JoinUs created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllJoinUs = catchAsync(async (req, res) => {
  const result = await JoinUsServices.getAllJoinUsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "JoinUs retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single JoinUs by ID
const getSingleJoinUs = catchAsync(async (req, res) => {
  const { joinUsId } = req.params;
  const result = await JoinUsServices.getSingleJoinUsFromDB(joinUsId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "JoinUs data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single JoinUs retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a team by ID
const updateJoinUs = catchAsync(async (req, res) => {
  const { joinUsId } = req.params;
  const updateData = req.body;
  const result = await JoinUsServices.updateJoinUsInDB(joinUsId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "team updated successfully",
    data: result,
  });
});

// Controller to handle deleting a joinUsId by ID
const deleteJoinUs = catchAsync(async (req, res) => {
  const { joinUsId } = req.params;
  const result = await JoinUsServices.deleteJoinUsFromDB(joinUsId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "JoinUs not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "JoinUs deleted successfully",
    data: "",
  });
});

export const JoinUsControllers = {
  createJoinUs,
  getAllJoinUs,
  getSingleJoinUs,
  updateJoinUs,
  deleteJoinUs,
};
