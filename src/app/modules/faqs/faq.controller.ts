import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FaqServices } from "./faq.service";

// Controller to handle Faq creationF
const createFaq = catchAsync(async (req, res) => {
  const faqData = req.body;

  const result = await FaqServices.createFaqIntoDB(faqData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllFaq = catchAsync(async (req, res) => {
  const result = await FaqServices.getAllFaqFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Faq by ID
const getSingleFaq = catchAsync(async (req, res) => {
  const { faqId } = req.params;
  const result = await FaqServices.getSingleFaqFromDB(faqId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Faq data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Faq retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a Faq by ID
const updateFaq = catchAsync(async (req, res) => {
  const { faqId } = req.params;
  const updateData = req.body;
  const result = await FaqServices.updateFaqInDB(faqId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq updated successfully",
    data: result,
  });
});

// Controller to handle deleting a FaqId by ID
const deleteFaq = catchAsync(async (req, res) => {
  const { faqId } = req.params;
  const result = await FaqServices.deleteFaqFromDB(faqId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Faq not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq deleted successfully",
    data: "",
  });
});

export const FaqControllers = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
