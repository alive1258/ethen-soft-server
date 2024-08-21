import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProfessionalServices } from "./professionalService.service";

// Controller to handle ProfessionalService creationF
const createProfessionalService = catchAsync(async (req, res) => {
  const professionalServiceData = req.body;

  const result = await ProfessionalServices.createProfessionalServiceIntoDB(
    professionalServiceData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProfessionalService created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllProfessionalService = catchAsync(async (req, res) => {
  const result = await ProfessionalServices.getAllProfessionalServiceFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProfessionalService retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single ProfessionalService by ID
const getSingleProfessionalService = catchAsync(async (req, res) => {
  const { professionalServiceId } = req.params;
  const result = await ProfessionalServices.getSingleProfessionalServiceFromDB(
    professionalServiceId
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "ProfessionalService data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single ProfessionalService retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a ProfessionalService by ID
const updateProfessionalService = catchAsync(async (req, res) => {
  const { professionalServiceId } = req.params;
  const updateData = req.body;
  const result = await ProfessionalServices.updateProfessionalServiceInDB(
    professionalServiceId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProfessionalService updated successfully",
    data: result,
  });
});

// Controller to handle deleting a ProfessionalServiceId by ID
const deleteProfessionalService = catchAsync(async (req, res) => {
  const { professionalServiceId } = req.params;
  const result = await ProfessionalServices.deleteProfessionalServiceFromDB(
    professionalServiceId
  );
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "ProfessionalService not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ProfessionalService deleted successfully",
    data: "",
  });
});

export const ProfessionalServiceControllers = {
  createProfessionalService,
  getAllProfessionalService,
  getSingleProfessionalService,
  updateProfessionalService,
  deleteProfessionalService,
};
