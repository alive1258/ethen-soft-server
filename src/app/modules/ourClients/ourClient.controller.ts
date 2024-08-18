import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { OurClientServices } from "./ourClient.service";

// Controller to handle OurClient creationF
const createOurClient = catchAsync(async (req, res) => {
  const ourClientData = req.body;

  const result = await OurClientServices.createOurClientIntoDB(ourClientData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurClient created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllOurClient = catchAsync(async (req, res) => {
  const result = await OurClientServices.getAllOurClientFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurClient retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single OurClient by ID
const getSingleOurClient = catchAsync(async (req, res) => {
  const { ourClientId } = req.params;
  const result = await OurClientServices.getSingleOurClientFromDB(ourClientId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurClient data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single OurClient retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a OurClient by ID
const updateOurClient = catchAsync(async (req, res) => {
  const { ourClientId } = req.params;
  const updateData = req.body;
  const result = await OurClientServices.updateOurClientInDB(
    ourClientId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurClient updated successfully",
    data: result,
  });
});

// Controller to handle deleting a OurClientId by ID
const deleteOurClient = catchAsync(async (req, res) => {
  const { ourClientId } = req.params;
  const result = await OurClientServices.deleteOurClientFromDB(ourClientId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurClient not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurClient deleted successfully",
    data: "",
  });
});

export const OurClientControllers = {
  createOurClient,
  getAllOurClient,
  getSingleOurClient,
  updateOurClient,
  deleteOurClient,
};
