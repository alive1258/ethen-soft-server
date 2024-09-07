import { Model, Types } from "mongoose";

// defined the feature assigned to pricing type
export interface TFeatureAssignedPricing {
  id?: Types.ObjectId;
  pricing: Types.ObjectId;
  pricingFeature: Types.ObjectId;
}

// feature assigned to pricing model for using method and statics
export type FeatureAssignedPricingModel = Model<
  TFeatureAssignedPricing,
  Record<string, unknown>
>;
