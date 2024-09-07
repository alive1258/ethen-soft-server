import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { PricingCategory } from "./pricingCategory.model";
import { TPricingCategory } from "./pricingCategory.interface";

// Service to create a new Pricing Category in the database
const createPricingCategoryIntoDB = async (
  data: TPricingCategory
): Promise<TPricingCategory> => {
  const result = await PricingCategory.create(data);

  return result;
};

// Service to retrieve all Pricing Category from the database
const getAllPricingCategoryFromDB = async (): Promise<TPricingCategory[]> => {
  const result = await PricingCategory.find();
  return result;
};

// Service to retrieve a single Pricing Category from the database by ID
const getSinglePricingCategoryFromDB = async (
  _id: string
): Promise<TPricingCategory | null> => {
  const result = await PricingCategory.findOne({ _id });
  return result;
};

// Service to update a Pricing Category in the database by ID
const updatePricingCategoryInDB = async (
  _id: string,
  updateData: Partial<TPricingCategory>
): Promise<TPricingCategory> => {
  const result = await PricingCategory.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pricing category Data not found");
  }

  return result;
};

// Service to delete a Pricing Category from the database by ID
const deletePricingCategoryFromDB = async (_id: string) => {
  const result = await PricingCategory.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "PricingCategory Data not found");
  }

  return result;
};

// Export the Pricing Category services as an object for use in other parts of the application
export const PricingCategoryServices = {
  createPricingCategoryIntoDB,
  getAllPricingCategoryFromDB,
  getSinglePricingCategoryFromDB,
  updatePricingCategoryInDB,
  deletePricingCategoryFromDB,
};
