import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TestimonialServices } from "./testimonial.service";

// Controller to handle Testimonial creationF
const createTestimonial = catchAsync(async (req, res) => {
  const testimonialData = req.body;

  const result =
    await TestimonialServices.createTestimonialIntoDB(testimonialData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllTestimonial = catchAsync(async (req, res) => {
  const result = await TestimonialServices.getAllTestimonialFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Testimonial by ID
const getSingleTestimonial = catchAsync(async (req, res) => {
  const { testimonialId } = req.params;
  const result =
    await TestimonialServices.getSingleTestimonialFromDB(testimonialId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Testimonial data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Testimonial retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a Testimonial by ID
const updateTestimonial = catchAsync(async (req, res) => {
  const { testimonialId } = req.params;
  const updateData = req.body;
  const result = await TestimonialServices.updateTestimonialInDB(
    testimonialId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial updated successfully",
    data: result,
  });
});

// Controller to handle deleting a TestimonialId by ID
const deleteTestimonial = catchAsync(async (req, res) => {
  const { testimonialId } = req.params;
  const result =
    await TestimonialServices.deleteTestimonialFromDB(testimonialId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Testimonial not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonial deleted successfully",
    data: "",
  });
});

export const TestimonialControllers = {
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
