import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TPricing, TPricingFilters } from "./pricing.interface";
import { Pricing } from "./pricing.model";
import { SortOrder } from "mongoose";
import { pricingSearchableFields } from "./pricing.constant";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { TGenericResponse } from "../../../interfaces/common";
import { TPaginationOptions } from "../../../interfaces/pagination";

// Service to create a new Pricing  in the database
const createPricingIntoDB = async (data: TPricing): Promise<TPricing> => {
  const result = await Pricing.create(data);

  return result;
};

// Service to retrieve all pricing  from the database
const getAllPricingFromDB = async (
  filters: TPricingFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TPricing[]>> => {
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
      $or: pricingSearchableFields.map((field) => ({
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

  console.log(sortConditions);

  // Applying conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // find  pricing feature data from database
  const result = await Pricing.find(whereConditions)
    .populate("service")
    .populate("pricingCategory")
    .skip(skip)
    .sort(sortConditions)
    .limit(limit)
    .exec();

  // count pricing feature data from database
  const total = await Pricing.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single pricing  from the database by ID
const getSinglePricingFromDB = async (
  _id: string
): Promise<TPricing | null> => {
  const result = await Pricing.findOne({ _id })
    .populate("service")
    .populate("pricingCategory");
  return result;
};

// Service to update a pricing  in the database by ID
const updatePricingInDB = async (
  _id: string,
  updateData: Partial<TPricing>
): Promise<TPricing> => {
  const result = await Pricing.findByIdAndUpdate(_id, updateData, {
    new: true,
  })
    .populate("service")
    .populate("pricingCategory");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing  Data not found");
  }

  return result;
};

// Service to delete a pricing  from the database by ID
const deletePricingFromDB = async (_id: string) => {
  const result = await Pricing.findByIdAndDelete(_id)
    .populate("service")
    .populate("pricingCategory");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing Data not found");
  }

  return result;
};

// Export the pricing  services as an object for use in other parts of the application
export const PricingServices = {
  createPricingIntoDB,
  getAllPricingFromDB,
  getSinglePricingFromDB,
  updatePricingInDB,
  deletePricingFromDB,
};
