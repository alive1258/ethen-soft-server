import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  TFeatureAssignedPricing,
  TFeatureAssignedPricingFilters,
} from "./FeatureAssignedPricing.interface";
import { FeatureAssignedPricing } from "./FeatureAssignedPricing.mode";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { featureAssignedPricingSearchableFields } from "./FeatureAssignedPricing.constant";
import { SortOrder } from "mongoose";

// Service to create a new feature assigned to pricing in the database
const createFeatureAssignedPricingIntoDB = async (
  data: TFeatureAssignedPricing
): Promise<TFeatureAssignedPricing> => {
  const result = await FeatureAssignedPricing.create(data);

  return result;
};

// Service to retrieve all feature assigned to pricing from the database
const getAllFeatureAssignedPricingFromDB = async (
  filters: TFeatureAssignedPricingFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TFeatureAssignedPricing[]>> => {
  // destructuring filters
  const { searchTerm, pricingId, ...filtersData } = filters;

  //   destructuring all pagination dependencies
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //andConditions used for containing all query to get data from database
  const andConditions: any[] = [];

  // Search term filter (e.g., for name or email)
  if (searchTerm) {
    andConditions.push({
      $or: featureAssignedPricingSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filter with pricing id
  if (pricingId) {
    andConditions.push({
      "pricing._id": pricingId,
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

  // find  feature assigned to pricing data from database
  const result = await FeatureAssignedPricing.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count feature assigned to pricing data from database
  const total = await FeatureAssignedPricing.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single feature assigned to pricing from the database by ID
const getSingleFeatureAssignedPricingFromDB = async (
  _id: string
): Promise<TFeatureAssignedPricing | null> => {
  const result = await FeatureAssignedPricing.findOne({ _id });
  return result;
};

// Service to update a feature assigned to pricing in the database by ID
const updateFeatureAssignedPricingInDB = async (
  _id: string,
  updateData: Partial<TFeatureAssignedPricing>
): Promise<TFeatureAssignedPricing> => {
  const result = await FeatureAssignedPricing.findByIdAndUpdate(
    _id,
    updateData,
    {
      new: true,
    }
  );

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Feature assigned to pricing Data not found"
    );
  }

  return result;
};

// Service to delete a feature assigned to pricing from the database by ID
const deleteFeatureAssignedPricingFromDB = async (_id: string) => {
  const result = await FeatureAssignedPricing.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Feature assigned to pricing Data not found"
    );
  }

  return result;
};

// Export the feature assigned to pricing services as an object for use in other parts of the application
export const FeatureAssignedPricingServices = {
  createFeatureAssignedPricingIntoDB,
  getAllFeatureAssignedPricingFromDB,
  getSingleFeatureAssignedPricingFromDB,
  updateFeatureAssignedPricingInDB,
  deleteFeatureAssignedPricingFromDB,
};
