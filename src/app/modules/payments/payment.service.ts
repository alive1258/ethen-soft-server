import axios from "axios";

import config from "../../config";
import { Payment } from "./payment.model";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { IOrder, TPayment, TPaymentFilters } from "./payment.interface";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { paymentSearchableFields } from "./payment.constant";
import { Customer } from "../customers/customer.module";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

// create order
const paymentCreate = async (order: IOrder) => {
  const tran_id = `tran_${Date.now()}`;

  const customer = await Customer.findOne({ _id: order.userId });

  if (!customer) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Customer does not found!");
  }

  // create data for payment ssl
  const data = {
    store_id: config.ssl.store_id,
    store_passwd: config.ssl.store_password,
    total_amount: order?.totalAmount,
    currency: order?.currency,
    tran_id: tran_id,
    success_url: `${config.production_url}/payments/success/${tran_id}`,
    fail_url: `${config.production_url}/payments/fail`,
    cancel_url: `${config.production_url}/payments/cancel`,
    ipn_url: `${config.production_url}/payments/ipn`,
    shipping_method: "Courier",
    product_name: order.serviceId,
    cus_name: `${customer?.name}`,
    cus_email: customer?.email,
    cus_add1: order.address,
    cus_city: order?.city,
    cus_country: order?.country,
  };

  // Order data to save in database
  const orderData = {
    totalAmount: order?.totalAmount,
    user: customer._id,
    service: order?.serviceId,
    pricing: order?.pricingId,
    paidStatus: "PENDING",
    transactionId: tran_id,
  };

  // Send request to SSLCommerz API
  const response = await axios({
    method: "POST",
    url: config.ssl.payment_url,
    data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // save data to database
  await Payment.create(orderData);

  // Redirect to the payment gateway URL
  return response.data?.redirectGatewayURL;
};

const paymentSuccess = async (payload: any) => {
  // update the payment to success
  const result = await Payment.findOneAndUpdate(
    { transactionId: payload },
    { paidStatus: "SUCCESS" },
    { new: true }
  );

  return result;
};

const paymentFail = async (payload: any) => {
  // delete the transaction from database
  const result = await Payment.deleteOne({ transactionId: payload });

  return result;
};

const paymentCancel = async (payload: any) => {
  // delete the transaction from database
  const result = await Payment.deleteOne({ transactionId: payload });

  return result;
};

const getAllPayments = async (
  filters: TPaymentFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TPayment[]>> => {
  // destructuring filters
  const { searchTerm, ...filtersData } = filters;

  //   destructuring all pagination dependencies
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //andConditions used for containing all query to get data from database
  const andConditions: any[] = [];

  // Search term filter (e.g., for name or email)
  if (searchTerm) {
    andConditions.push({
      $or: paymentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Additional filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: `^${value}$`,
          $options: "i",
        },
      })),
    });
  }

  // Sorting conditions
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // Applying conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // find  pricing feature data from database
  const result = await Payment.find(whereConditions)
    .populate("service")
    .populate("user")
    .skip(skip)
    .sort(sortConditions)
    .limit(limit)
    .exec();

  // count pricing feature data from database
  const total = await Payment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const PaymentService = {
  paymentCreate,
  paymentSuccess,
  paymentCancel,
  paymentFail,
  getAllPayments,
};
