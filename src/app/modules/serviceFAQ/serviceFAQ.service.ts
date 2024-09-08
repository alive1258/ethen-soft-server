import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { TServiceFAQ, TServiceFAQFilters } from "./serviceFAQ.interface";
import { ServiceFAQ } from "./serviceFAQ.model";
import { serviceFAQSearchableFields } from "./serviceFAQ.constant";

// Service to create a new service faq in the database
const createServiceFAQIntoDB = async (
  data: TServiceFAQ
): Promise<TServiceFAQ> => {
  const result = await ServiceFAQ.create(data);

  return result;
};

// Service to retrieve all service faq from the database
const getAllServiceFAQFromDB = async (
  filters: TServiceFAQFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TServiceFAQ[]>> => {
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
      $or: serviceFAQSearchableFields.map((field) => ({
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

  // find  service faq data from database
  const result = await ServiceFAQ.find(whereConditions)
    .populate("service")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count service faq data from database
  const total = await ServiceFAQ.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single service faq from the database by ID
const getSingleServiceFAQFromDB = async (
  _id: string
): Promise<TServiceFAQ | null> => {
  const result = await ServiceFAQ.findOne({ _id }).populate("service");
  return result;
};

// Service to update a service faq in the database by ID
const updateServiceFAQInDB = async (
  _id: string,
  updateData: Partial<TServiceFAQ>
): Promise<TServiceFAQ> => {
  const result = await ServiceFAQ.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service FAQ Data not found");
  }

  return result;
};

// Service to delete a service faq from the database by ID
const deleteServiceFAQFromDB = async (_id: string) => {
  const result = await ServiceFAQ.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service FAQ Data not found");
  }

  return result;
};

// Export the service faq services as an object for use in other parts of the application
export const ServiceFAQServices = {
  createServiceFAQIntoDB,
  getAllServiceFAQFromDB,
  getSingleServiceFAQFromDB,
  updateServiceFAQInDB,
  deleteServiceFAQFromDB,
};
