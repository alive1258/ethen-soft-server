import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  TPricingFeature,
  TPricingFeatureFilters,
} from "./pricingFeature.interface";
import { PricingFeature } from "./pricingFeature.model";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { customerFilterableFields } from "../customers/customer.constant";
import { SortOrder } from "mongoose";

// Service to create a new Pricing Feature in the database
const createPricingFeatureIntoDB = async (
  data: TPricingFeature
): Promise<TPricingFeature> => {
  const result = await PricingFeature.create(data);

  return result;
};

// Service to retrieve all Pricing Feature from the database
const getAllPricingFeatureFromDB = async (
  filters: TPricingFeatureFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TPricingFeature[]>> => {
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
  const result = await PricingFeature.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count customers data
  const total = await PricingFeature.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single Pricing Feature from the database by ID
const getSinglePricingFeatureFromDB = async (
  _id: string
): Promise<TPricingFeature | null> => {
  const result = await PricingFeature.findOne({ _id });
  return result;
};

// Service to update a Pricing Feature in the database by ID
const updatePricingFeatureInDB = async (
  _id: string,
  updateData: Partial<TPricingFeature>
): Promise<TPricingFeature> => {
  const result = await PricingFeature.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing Feature Data not found");
  }

  return result;
};

// Service to delete a Pricing Feature from the database by ID
const deletePricingFeatureFromDB = async (_id: string) => {
  const result = await PricingFeature.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "PricingFeature Data not found");
  }

  return result;
};

// Export the Pricing Feature services as an object for use in other parts of the application
export const PricingFeatureServices = {
  createPricingFeatureIntoDB,
  getAllPricingFeatureFromDB,
  getSinglePricingFeatureFromDB,
  updatePricingFeatureInDB,
  deletePricingFeatureFromDB,
};
