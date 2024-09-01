import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BannerServices } from "./banner.service";

// Controller to handle Banner creation
const createBanner = catchAsync(async (req, res) => {
  const bannerData = req.body;

  const result = await BannerServices.createBannerIntoDB(bannerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner created successfully",
    data: result,
  });
});

// Controller to handle retrieving all Banner
const getAllBanner = catchAsync(async (req, res) => {
  const result = await BannerServices.getAllBannerFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Banner by ID
const getSingleBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const result = await BannerServices.getSingleBannerFromDB(bannerId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Banner not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Banner retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a Banner by ID
const updateBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const updateData = req.body;

  const result = await BannerServices.updateBannerInDB(bannerId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner updated successfully",
    data: result,
  });
});

// Controller to handle deleting a Banner by ID
const deleteBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const result = await BannerServices.deleteBannerFromDB(bannerId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Banner not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner deleted successfully",
    data: "",
  });
});

export const BannerControllers = {
  createBanner,
  getAllBanner,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
