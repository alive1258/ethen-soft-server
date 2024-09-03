import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TCustomer, TCustomerFilters } from "./customer.interface";
import { Customer } from "./customer.module";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { customerFilterableFields } from "./customer.constant";

const createCustomerIntoDB = async (
  customer: TCustomer
): Promise<TCustomer | null> => {
  //set customer role and set initial isEmailVerified to false
  if (customer) {
    customer.role = "customer";
    customer.isEmailVerified = false;
  }

  // check that the customer is already exist or not
  const isCustomerExist = await Customer.findOne({ email: customer.email });
  if (isCustomerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already used!");
  }

  // save customer to database
  const result = await Customer.create(customer);

  return result;
};

// get all customers
const getAllCustomersFromDB = async (
  filters: TCustomerFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TCustomer[]>> => {
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
      $or: customerFilterableFields.map((field) => ({
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

  // find  customers dat from db
  const result = await Customer.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count customers data
  const total = await Customer.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single customer data from database
const getSingleCustomerFromDB = async (
  id: string
): Promise<TCustomer | null> => {
  // find customer from database with the help of id
  const result = await Customer.findById(id);
  return result;
};

// update single customer data from database
const updateSingleCustomerFromDB = async (
  id: string,
  updatedData: Partial<TCustomer>
): Promise<TCustomer | null> => {
  // update customer from database with the help of id
  const result = await Customer.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

// delete single customer data from database
const deleteCustomerFromDB = async (id: string): Promise<TCustomer | null> => {
  // delete customer from database with the help of id
  const result = await Customer.findByIdAndDelete(id);

  return result;
};

// Export the customer services as an object for use in other parts of the application
export const CustomerService = {
  createCustomerIntoDB,
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
  updateSingleCustomerFromDB,
  deleteCustomerFromDB,
};
