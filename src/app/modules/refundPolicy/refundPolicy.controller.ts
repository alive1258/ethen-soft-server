import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { RefundPolicyServices } from "./refundPolicy.service";

// Controller to handle RefundPolicy creation create
const createRefundPolicy = catchAsync(async (req, res) => {
  const trustUsData = req.body;

  const result =
    await RefundPolicyServices.createRefundPolicyIntoDB(trustUsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "RefundPolicy created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllRefundPolicy = catchAsync(async (req, res) => {
  const result = await RefundPolicyServices.getAllRefundPolicyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "RefundPolicy retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single RefundPolicy by ID
const getSingleRefundPolicy = catchAsync(async (req, res) => {
  const { refundPolicyId } = req.params;
  const result =
    await RefundPolicyServices.getSingleRefundPolicyFromDB(refundPolicyId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "RefundPolicy data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single RefundPolicy retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a trustUs by ID
const updateRefundPolicy = catchAsync(async (req, res) => {
  const { refundPolicyId } = req.params;
  const updateData = req.body;
  const result = await RefundPolicyServices.updateRefundPolicyInDB(
    refundPolicyId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "trustUs updated successfully",
    data: result,
  });
});

// Controller to handle deleting a refundPolicyId by ID
const deleteRefundPolicy = catchAsync(async (req, res) => {
  const { refundPolicyId } = req.params;
  const result =
    await RefundPolicyServices.deleteRefundPolicyFromDB(refundPolicyId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "RefundPolicy not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "RefundPolicy deleted successfully",
    data: "",
  });
});

export const RefundPolicyControllers = {
  createRefundPolicy,
  getAllRefundPolicy,
  getSingleRefundPolicy,
  updateRefundPolicy,
  deleteRefundPolicy,
};
