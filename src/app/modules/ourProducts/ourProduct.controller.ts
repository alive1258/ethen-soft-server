import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { OurProducts } from "./ourProduct.service";

// Controller to handle OurProduct creationF
const createOurProduct = catchAsync(async (req, res) => {
  const ourProductData = req.body;

  const result = await OurProducts.createOurProductIntoDB(ourProductData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurProduct created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllOurProduct = catchAsync(async (req, res) => {
  const result = await OurProducts.getAllOurProductFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurProduct retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single OurProduct by ID
const getSingleOurProduct = catchAsync(async (req, res) => {
  const { ourProductId } = req.params;
  const result = await OurProducts.getSingleOurProductFromDB(ourProductId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurProduct data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single OurProduct retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a OurProduct by ID
const updateOurProduct = catchAsync(async (req, res) => {
  const { ourProductId } = req.params;
  const updateData = req.body;
  const result = await OurProducts.updateOurProductInDB(
    ourProductId,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurProduct updated successfully",
    data: result,
  });
});

// Controller to handle deleting a OurProductId by ID
const deleteOurProduct = catchAsync(async (req, res) => {
  const { ourProductId } = req.params;
  const result = await OurProducts.deleteOurProductFromDB(ourProductId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "OurProduct not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OurProduct deleted successfully",
    data: "",
  });
});

export const OurProductControllers = {
  createOurProduct,
  getAllOurProduct,
  getSingleOurProduct,
  updateOurProduct,
  deleteOurProduct,
};
