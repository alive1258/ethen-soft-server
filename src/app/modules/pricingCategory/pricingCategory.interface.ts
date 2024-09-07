import { Model, Types } from "mongoose";

// defined the type of pricing category
export interface TPricingCategory {
  id?: Types.ObjectId;
  name: string;
}

// create a model type for using method and statics
export type PricingCategoryModel = Model<
  TPricingCategory,
  Record<string, unknown>
>;
