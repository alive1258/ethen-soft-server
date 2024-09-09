import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TCategory, TCategoryFilters } from "./category.interface";
import { Category } from "./category.model";
import { TPaginationOptions } from "../../../interfaces/pagination";
import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { categorySearchableFields } from "./category.constant";
import { TGenericResponse } from "../../../interfaces/common";

// Service to create a new Category  in the database
const createCategoryIntoDB = async (data: TCategory): Promise<TCategory> => {
  const result = await Category.create(data);

  return result;
};

// Service to retrieve all Category  from the database
const getAllCategoryFromDB = async (
  filters: TCategoryFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TCategory[]>> => {
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
      $or: categorySearchableFields.map((field) => ({
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
  const result = await Category.find(whereConditions)
    .populate("service")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count service data from database
  const total = await Category.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single Category  from the database by ID
const getSingleCategoryFromDB = async (
  _id: string
): Promise<TCategory | null> => {
  const result = await Category.findOne({ _id }).populate("service");
  return result;
};

// Service to update a Category  in the database by ID
const updateCategoryInDB = async (
  _id: string,
  updateData: Partial<TCategory>
): Promise<TCategory> => {
  const result = await Category.findByIdAndUpdate(_id, updateData, {
    new: true,
  }).populate("service");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category  Data not found");
  }

  return result;
};

// Service to delete a Category  from the database by ID
const deleteCategoryFromDB = async (_id: string) => {
  const result = await Category.findByIdAndDelete(_id).populate("service");

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Data not found");
  }

  return result;
};

// Export the Category  services as an object for use in other parts of the application
export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};
