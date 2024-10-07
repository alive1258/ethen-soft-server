import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TCustomer, TCustomerFilters } from "./customer.interface";
import { Customer } from "./customer.module";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { customerFilterableFields } from "./customer.constant";
import { ENUM_ROLE } from "../../../enums/user";
import { generateCustomerId } from "../users/user.utils";

const createCustomerIntoDB = async (
  customer: TCustomer
): Promise<TCustomer | null> => {
  // set initial isEmailVerified to false
  if (customer?.isEmailVerified) {
    customer.isEmailVerified = false;
  }

  if (customer) {
    customer.role = ENUM_ROLE.CUSTOMER;
  }
  // Check if a user with the given email already exists
  if (await Customer.findOne({ email: customer.email })) {
    throw new ApiError(httpStatus.CONFLICT, "Customer already exist");
  }

  //generate custom id

  const id = await generateCustomerId();

  customer["id"] = id;

  // Create a new user in the database using the provided user data
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
