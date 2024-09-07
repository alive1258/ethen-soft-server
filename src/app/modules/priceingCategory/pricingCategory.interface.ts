import { Model } from "mongoose";

// defined the type of pricing category
export interface TPricingCategory {
  name: string;
}

// create a model type for using method and statics
export type PricingModel = Model<TPricingCategory, Record<string, unknown>>;
