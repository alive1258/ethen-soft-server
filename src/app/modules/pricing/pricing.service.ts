import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TPricing } from "./pricing.interface";
import { Pricing } from "./pricing.model";

// Service to create a new Pricing  in the database
const createPricingIntoDB = async (data: TPricing): Promise<TPricing> => {
  const result = await Pricing.create(data);

  return result;
};

// Service to retrieve all pricing  from the database
const getAllPricingFromDB = async (service: any): Promise<TPricing[]> => {
  const whereConditions = service ? { service: service } : {};

  const result = await Pricing.find(whereConditions)
    .populate("service")
    .populate("pricingCategory");
  return result;
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
