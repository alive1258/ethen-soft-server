import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { TGenericResponse } from "../../../interfaces/common";
import { TPaginationOptions } from "../../../interfaces/pagination";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TServiceImage, TServiceImageFilters } from "./serviceImage.interface";
import { ServiceImage } from "./serviceImage.model";
import { serviceImageSearchableFiends } from "./serviceImage.constant";

// Service to create a new service image in the database
const createServiceImageIntoDB = async (
  data: TServiceImage
): Promise<TServiceImage> => {
  const result = await ServiceImage.create(data);

  return result;
};

// Service to retrieve all service image from the database
const getAllServiceImageFromDB = async (
  filters: TServiceImageFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TServiceImage[]>> => {
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
      $or: serviceImageSearchableFiends.map((field) => ({
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

  // find  service image data from database
  const result = await ServiceImage.find(whereConditions)
    .populate("service")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count service image data from database
  const total = await ServiceImage.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single service image from the database by ID
const getSingleServiceImageFromDB = async (
  _id: string
): Promise<TServiceImage | null> => {
  const result = await ServiceImage.findOne({ _id });
  return result;
};

// Service to update a service image in the database by ID
const updateServiceImageInDB = async (
  _id: string,
  updateData: Partial<TServiceImage>
): Promise<TServiceImage> => {
  const result = await ServiceImage.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service Data not found");
  }

  return result;
};

// Service to delete a service image from the database by ID
const deleteServiceImageFromDB = async (_id: string) => {
  const result = await ServiceImage.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service Data not found");
  }

  return result;
};

// Export the service image services as an object for use in other parts of the application
export const ServiceImageServices = {
  createServiceImageIntoDB,
  getAllServiceImageFromDB,
  getSingleServiceImageFromDB,
  updateServiceImageInDB,
  deleteServiceImageFromDB,
};
