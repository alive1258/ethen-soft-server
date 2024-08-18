import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { HomeAboutServices } from "./homeAbout.service";

// Controller to handle HomeAbout creationF
const createHomeAbout = catchAsync(async (req, res) => {
  const HomeAboutData = req.body;

  const result = await HomeAboutServices.createHomeAboutIntoDB(HomeAboutData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "HomeAbout created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllHomeAbout = catchAsync(async (req, res) => {
  const result = await HomeAboutServices.getAllHomeAboutFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "HomeAbout retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single HomeAbout by ID
const getSingleHomeAbout = catchAsync(async (req, res) => {
  const { homeAboutId } = req.params;
  const result = await HomeAboutServices.getSingleHomeAboutFromDB(homeAboutId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "HomeAbout data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single HomeAbout retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a HomeAbout by ID
const updateHomeAbout = catchAsync(async (req, res) => {
  const { homeAboutId } = req.params;
  const updateData = req.body;
  const result = await HomeAboutServices.updateHomeAboutInDB(
    homeAboutId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "HomeAbout updated successfully",
    data: result,
  });
});

// Controller to handle deleting a homeAboutId by ID
const deleteHomeAbout = catchAsync(async (req, res) => {
  const { homeAboutId } = req.params;
  const result = await HomeAboutServices.deleteHomeAboutFromDB(homeAboutId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "HomeAbout not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "HomeAbout deleted successfully",
    data: "",
  });
});

export const HomeAboutControllers = {
  createHomeAbout,
  getAllHomeAbout,
  getSingleHomeAbout,
  updateHomeAbout,
  deleteHomeAbout,
};
