import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

// Service to create a new Category  in the database
const createCategoryIntoDB = async (data: TCategory): Promise<TCategory> => {
  const result = await Category.create(data);

  return result;
};

// Service to retrieve all Category  from the database
const getAllCategoryFromDB = async (): Promise<TCategory[]> => {
  const result = await Category.find().populate("service");
  return result;
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
