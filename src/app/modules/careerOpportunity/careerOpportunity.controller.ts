import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CareerOpportunities } from "./careerOpportunity.service";

// Controller to handle CareerOpportunity creationF
const createCareerOpportunity = catchAsync(async (req, res) => {
  const ourServiceData = req.body;

  const result =
    await CareerOpportunities.createCareerOpportunityIntoDB(ourServiceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CareerOpportunity created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllCareerOpportunity = catchAsync(async (req, res) => {
  const result = await CareerOpportunities.getAllCareerOpportunityFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CareerOpportunity retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single CareerOpportunity by ID
const getSingleCareerOpportunity = catchAsync(async (req, res) => {
  const { ourServiceId } = req.params;
  const result =
    await CareerOpportunities.getSingleCareerOpportunityFromDB(ourServiceId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "CareerOpportunity data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single CareerOpportunity retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a CareerOpportunity by ID
const updateCareerOpportunity = catchAsync(async (req, res) => {
  const { ourServiceId } = req.params;
  const updateData = req.body;
  const result = await CareerOpportunities.updateCareerOpportunityInDB(
    ourServiceId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CareerOpportunity updated successfully",
    data: result,
  });
});

// Controller to handle deleting a CareerOpportunityId by ID
const deleteCareerOpportunity = catchAsync(async (req, res) => {
  const { ourServiceId } = req.params;
  const result =
    await CareerOpportunities.deleteCareerOpportunityFromDB(ourServiceId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "CareerOpportunity not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CareerOpportunity deleted successfully",
    data: "",
  });
});

export const CareerOpportunityControllers = {
  createCareerOpportunity,
  getAllCareerOpportunity,
  getSingleCareerOpportunity,
  updateCareerOpportunity,
  deleteCareerOpportunity,
};
