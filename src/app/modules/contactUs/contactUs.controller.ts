import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";
import { ContactUsServices } from "./contactUs.service";
import { contactUsFilterableFields } from "./contactUs.constant";

// Controller to handle contactUs creation
const createContactUs = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ContactUsServices.createContactUsIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message sended successfully",
    data: result,
  });
});

// Controller to handle retrieving all contactUs
const getAllContactUs = catchAsync(async (req, res) => {
  const filters = pick(req.query, contactUsFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ContactUsServices.getAllContactUsFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single contactUs by ID
const getSingleContactUs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactUsServices.getSingleContactUsFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Message data not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Message retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a contactUs by ID
const updateContactUs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ContactUsServices.updateContactUsInDB(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message updated successfully",
    data: result,
  });
});

// Controller to handle deleting a contactUs by ID
const deleteContactUs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactUsServices.deleteContactUsFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Message not found!",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message deleted successfully!",
    data: "",
  });
});

// export services image controllers as object
export const ContactUsController = {
  createContactUs,
  getAllContactUs,
  getSingleContactUs,
  updateContactUs,
  deleteContactUs,
};
