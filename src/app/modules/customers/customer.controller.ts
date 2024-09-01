import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CustomerService } from "./customer.service";
import { Types } from "mongoose";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../utils/pick";
import { customerFilterableFilds } from "./customer.constant";
import { paginationFields } from "../../constants/pagination";

const createCustomers = catchAsync(async (req: Request, res: Response) => {
  const customerData = req.body;

  console.log(req.body);
  const result = await CustomerService.createCustomerIntoDB(customerData);

  // if (result?._id) {
  //   const data: {
  //     _id: Types.ObjectId;
  //     email: string;
  //   } = { _id: result._id, email: result.email };
  //   const newResult = await UserOTPVerificationService.sendOTPVerificationEmail(
  //     data
  //   );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer Created successfully.",
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerFilterableFilds);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CustomerService.getAllCusromersFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All customers received successfully.",
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerService.getSingleCustomerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer received successfully.",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await CustomerService.updateSingleCustomerFromDB(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer updated successfully.",
    data: result,
  });
});

const deleteSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerService.deleteCustomerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer deleted successfully.",
    data: result,
  });
});

export const CustomerController = {
  createCustomers,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteSingleCustomer,
};
