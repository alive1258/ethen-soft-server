import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { TGenericResponse } from "../../../interfaces/common";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TService, TServiceFilters } from "./service.interface";
import { Service } from "./service.mode";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { serviceSearchableFields } from "./service.constant";

// Service to create a new service in the database
const createServiceIntoDB = async (data: TService): Promise<TService> => {
  const result = await Service.create(data);

  return result;
};

// Service to retrieve all service from the database
const getAllServiceFromDB = async (
  filters: TServiceFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TService[]>> => {
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
      $or: serviceSearchableFields.map((field) => ({
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

  // find  service data from database
  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count service data from database
  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single service from the database by ID
const getSingleServiceFromDB = async (
  _id: string
): Promise<TService | null> => {
  const result = await Service.findOne({ _id });
  return result;
};

// Service to update a service in the database by ID
const updateServiceInDB = async (
  _id: string,
  updateData: Partial<TService>
): Promise<TService> => {
  const result = await Service.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service Data not found");
  }

  return result;
};

// Service to delete a service from the database by ID
const deleteServiceFromDB = async (_id: string) => {
  const result = await Service.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service Data not found");
  }

  return result;
};

// Export the service services as an object for use in other parts of the application
export const ServiceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};
