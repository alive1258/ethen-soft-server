import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TFeatureAssignedPricing } from "./FeatureAssignedPricing.interface";
import { FeatureAssignedPricing } from "./FeatureAssignedPricing.mode";

// Service to create a new feature assigned to pricing in the database
const createFeatureAssignedPricingIntoDB = async (
  data: TFeatureAssignedPricing
): Promise<TFeatureAssignedPricing> => {
  const result = await FeatureAssignedPricing.create(data);

  return result;
};

// Service to retrieve all feature assigned to pricing from the database
const getAllFeatureAssignedPricingFromDB = async (): Promise<
  TFeatureAssignedPricing[]
> => {
  const result = await FeatureAssignedPricing.find();
  return result;
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
