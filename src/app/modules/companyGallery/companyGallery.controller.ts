import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TechServices } from "./companyGallery.service";
import sendResponse from "../../utils/sendResponse";

// Controller to handle CompanyGallery creation
const createCompanyGallery = catchAsync(async (req, res) => {
  const companyGalleryData = req.body;

  const result =
    await TechServices.createCompanyGalleryIntoDB(companyGalleryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CompanyGallery created successfully",
    data: result,
  });
});

// Controller to handle retrieving all CompanyGallery
const getAllCompanyGallery = catchAsync(async (req, res) => {
  const result = await TechServices.getAllCompanyGalleryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CompanyGallery retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single CompanyGallery by ID
const getSingleCompanyGallery = catchAsync(async (req, res) => {
  const { companyGalleryId } = req.params;
  const result =
    await TechServices.getSingleCompanyGalleryFromDB(companyGalleryId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "CompanyGallery not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single CompanyGallery retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a CompanyGallery by ID
const updateCompanyGallery = catchAsync(async (req, res) => {
  const { companyGalleryId } = req.params;
  const updateData = req.body;
  const result = await TechServices.updateCompanyGalleryInDB(
    companyGalleryId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CompanyGallery updated successfully",
    data: result,
  });
});

// Controller to handle deleting a CompanyGallery by ID
const deleteCompanyGallery = catchAsync(async (req, res) => {
  const { companyGalleryId } = req.params;
  const result =
    await TechServices.deleteCompanyGalleryFromDB(companyGalleryId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "CompanyGallery not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CompanyGallery deleted successfully",
    data: "",
  });
});

export const CompanyGalleryControllers = {
  createCompanyGallery,
  getAllCompanyGallery,
  getSingleCompanyGallery,
  updateCompanyGallery,
  deleteCompanyGallery,
};
