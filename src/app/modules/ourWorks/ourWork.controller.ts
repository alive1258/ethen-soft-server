import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { OurWorks } from "./ourWork.service";

// Controller to handle OurWork creationF
const createOurWork = catchAsync(async (req, res) => {
  const ourWorkData = req.body;

  const result = await OurWorks.createOurWorkIntoDB(ourWorkData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurWork created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllOurWork = catchAsync(async (req, res) => {
  const result = await OurWorks.getAllOurWorkFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurWork retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single OurWork by ID
const getSingleOurWork = catchAsync(async (req, res) => {
  const { ourWorkId } = req.params;
  const result = await OurWorks.getSingleOurWorkFromDB(ourWorkId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurWork data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single OurWork retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a OurWork by ID
const updateOurWork = catchAsync(async (req, res) => {
  const { ourWorkId } = req.params;
  const updateData = req.body;
  const result = await OurWorks.updateOurWorkInDB(ourWorkId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurWork updated successfully",
    data: result,
  });
});

// Controller to handle deleting a OurWorkId by ID
const deleteOurWork = catchAsync(async (req, res) => {
  const { ourWorkId } = req.params;
  const result = await OurWorks.deleteOurWorkFromDB(ourWorkId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurWork not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurWork deleted successfully",
    data: "",
  });
});

export const OurWorkControllers = {
  createOurWork,
  getAllOurWork,
  getSingleOurWork,
  updateOurWork,
  deleteOurWork,
};
