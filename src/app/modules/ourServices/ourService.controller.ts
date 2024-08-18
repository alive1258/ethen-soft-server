import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { OurServices } from "./ourService.service";

// Controller to handle OurService creationF
const createOurService = catchAsync(async (req, res) => {
  const ourServiceData = req.body;

  const result = await OurServices.createOurServiceIntoDB(ourServiceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurService created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllOurService = catchAsync(async (req, res) => {
  const result = await OurServices.getAllOurServiceFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurService retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single OurService by ID
const getSingleOurService = catchAsync(async (req, res) => {
  const { ourServiceId } = req.params;
  const result = await OurServices.getSingleOurServiceFromDB(ourServiceId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurService data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single OurService retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a OurService by ID
const updateOurService = catchAsync(async (req, res) => {
  const { ourServiceId } = req.params;
  const updateData = req.body;
  const result = await OurServices.updateOurServiceInDB(
    ourServiceId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurService updated successfully",
    data: result,
  });
});

// Controller to handle deleting a OurServiceId by ID
const deleteOurService = catchAsync(async (req, res) => {
  const { ourServiceId } = req.params;
  const result = await OurServices.deleteOurServiceFromDB(ourServiceId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurService not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurService deleted successfully",
    data: "",
  });
});

export const OurServiceControllers = {
  createOurService,
  getAllOurService,
  getSingleOurService,
  updateOurService,
  deleteOurService,
};
