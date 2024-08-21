import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PrivacyPolicyServices } from "./privacyPolicy.service";

// Controller to handle PrivacyPolicy creation
const createPrivacyPolicy = catchAsync(async (req, res) => {
  const trustUsData = req.body;

  const result =
    await PrivacyPolicyServices.createPrivacyPolicyIntoDB(trustUsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PrivacyPolicy created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllPrivacyPolicy = catchAsync(async (req, res) => {
  const result = await PrivacyPolicyServices.getAllPrivacyPolicyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PrivacyPolicy retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single PrivacyPolicy by ID
const getSinglePrivacyPolicy = catchAsync(async (req, res) => {
  const { privacyPolicyId } = req.params;
  const result =
    await PrivacyPolicyServices.getSinglePrivacyPolicyFromDB(privacyPolicyId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "PrivacyPolicy data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single PrivacyPolicy retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a trustUs by ID
const updatePrivacyPolicy = catchAsync(async (req, res) => {
  const { privacyPolicyId } = req.params;
  const updateData = req.body;
  const result = await PrivacyPolicyServices.updatePrivacyPolicyInDB(
    privacyPolicyId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "trustUs updated successfully",
    data: result,
  });
});

// Controller to handle deleting a privacyPolicyId by ID
const deletePrivacyPolicy = catchAsync(async (req, res) => {
  const { privacyPolicyId } = req.params;
  const result =
    await PrivacyPolicyServices.deletePrivacyPolicyFromDB(privacyPolicyId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "PrivacyPolicy not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PrivacyPolicy deleted successfully",
    data: "",
  });
});

export const PrivacyPolicyControllers = {
  createPrivacyPolicy,
  getAllPrivacyPolicy,
  getSinglePrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
};
