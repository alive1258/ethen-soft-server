import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TermsConditionServices } from "./termsCondition.service";

// Controller to handle TermsCondition creation
const createTermsCondition = catchAsync(async (req, res) => {
  const trustUsData = req.body;

  const result =
    await TermsConditionServices.createTermsConditionIntoDB(trustUsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TermsCondition created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllTermsCondition = catchAsync(async (req, res) => {
  const result = await TermsConditionServices.getAllTermsConditionFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TermsCondition retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single TermsCondition by ID
const getSingleTermsCondition = catchAsync(async (req, res) => {
  const { termsConditionId } = req.params;
  const result =
    await TermsConditionServices.getSingleTermsConditionFromDB(
      termsConditionId
    );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "TermsCondition data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single TermsCondition retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a trustUs by ID
const updateTermsCondition = catchAsync(async (req, res) => {
  const { termsConditionId } = req.params;
  const updateData = req.body;
  const result = await TermsConditionServices.updateTermsConditionInDB(
    termsConditionId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "trustUs updated successfully",
    data: result,
  });
});

// Controller to handle deleting a termsConditionId by ID
const deleteTermsCondition = catchAsync(async (req, res) => {
  const { termsConditionId } = req.params;
  const result =
    await TermsConditionServices.deleteTermsConditionFromDB(termsConditionId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "TermsCondition not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TermsCondition deleted successfully",
    data: "",
  });
});

export const TermsConditionControllers = {
  createTermsCondition,
  getAllTermsCondition,
  getSingleTermsCondition,
  updateTermsCondition,
  deleteTermsCondition,
};
