import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ClientReviewServices } from "./clientReview.service";
import pick from "../../utils/pick";
import { clientReviewFilterableFields } from "./clientReview.constant";
import { paginationFields } from "../../constants/pagination";

// Controller to handle client review creation
const createClientReview = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ClientReviewServices.createClientReviewIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client review created successfully",
    data: result,
  });
});

// Controller to handle retrieving all client review categories
const getAllClientReview = catchAsync(async (req, res) => {
  const filters = pick(req.query, clientReviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ClientReviewServices.getAllClientReviewFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client review retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single client review by ID
const getSingleClientReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClientReviewServices.getSingleClientReviewFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Client review data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Client review retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a client review  by ID
const updateClientReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ClientReviewServices.updateClientReviewInDB(
    id,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client review updated successfully",
    data: result,
  });
});

// Controller to handle deleting a client review  by ID
const deleteClientReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClientReviewServices.deleteClientReviewFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Client review not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client review deleted successfully!",
    data: "",
  });
});

export const ClientReviewController = {
  createClientReview,
  getAllClientReview,
  getSingleClientReview,
  updateClientReview,
  deleteClientReview,
};
