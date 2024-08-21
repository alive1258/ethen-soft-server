import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { OurDeals } from "./ourDeal.service";

// Controller to handle OurDeal creationF
const createOurDeal = catchAsync(async (req, res) => {
  const ourDealData = req.body;

  const result = await OurDeals.createOurDealIntoDB(ourDealData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurDeal created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllOurDeal = catchAsync(async (req, res) => {
  const result = await OurDeals.getAllOurDealFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurDeal retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single OurDeal by ID
const getSingleOurDeal = catchAsync(async (req, res) => {
  const { ourDealId } = req.params;
  const result = await OurDeals.getSingleOurDealFromDB(ourDealId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurDeal data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single OurDeal retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a OurDeal by ID
const updateOurDeal = catchAsync(async (req, res) => {
  const { ourDealId } = req.params;
  const updateData = req.body;
  const result = await OurDeals.updateOurDealInDB(ourDealId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurDeal updated successfully",
    data: result,
  });
});

// Controller to handle deleting a OurDealId by ID
const deleteOurDeal = catchAsync(async (req, res) => {
  const { ourDealId } = req.params;
  const result = await OurDeals.deleteOurDealFromDB(ourDealId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurDeal not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurDeal deleted successfully",
    data: "",
  });
});

export const OurDealControllers = {
  createOurDeal,
  getAllOurDeal,
  getSingleOurDeal,
  updateOurDeal,
  deleteOurDeal,
};
