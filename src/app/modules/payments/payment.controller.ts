import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";
import { paymentFilterableFields } from "./payment.constant";

// Controller to handle create payment
const paymentCreate = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await PaymentService.paymentCreate(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment created successfully",
    data: result,
  });
});

// Controller to handle retrieving all payments
const getAllPayments = catchAsync(async (req, res) => {
  const filters = pick(req.query, paymentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PaymentService.getAllPayments(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

// Controller to handle payment success
const paymentSuccess = catchAsync(async (req, res) => {
  const data = req.params;
  const result = await PaymentService.paymentSuccess(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

// Controller to handle payment cancel
const paymentCancel = catchAsync(async (req, res) => {
  const data = req.params;

  const result = await PaymentService.paymentCancel(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment updated successfully",
    data: result,
  });
});

// payment fail controller
const paymentFail = catchAsync(async (req, res) => {
  const data = req.params;
  const result = await PaymentService.paymentFail(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment deleted successfully!",
    data: result,
  });
});

export const PaymentController = {
  paymentCreate,
  getAllPayments,
  paymentCancel,
  paymentSuccess,
  paymentFail,
};
