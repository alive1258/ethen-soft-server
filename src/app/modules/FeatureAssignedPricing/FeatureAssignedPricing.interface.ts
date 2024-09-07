import { Model, Types } from "mongoose";
import { TPricingFeature } from "../pricingFeature/pricingFeature.interface";
import { TPricing } from "../pricing/pricing.interface";

// defined the feature assigned to pricing type
export interface TFeatureAssignedPricing {
  id?: Types.ObjectId;
  pricing: Types.ObjectId | TPricing;
  pricingFeature: Types.ObjectId | TPricingFeature;
}

// feature assigned to pricing model for using method and statics
export type FeatureAssignedPricingModel = Model<
  TFeatureAssignedPricing,
  Record<string, unknown>
>;

export type TFeatureAssignedPricingFilters = {
  searchTerm?: string;
  pricingId?: string;
};
