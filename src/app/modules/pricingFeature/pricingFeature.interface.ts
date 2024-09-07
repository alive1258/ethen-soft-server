import { Model, Types } from "mongoose";

// defined the type of pricing feature
export interface TPricingFeature {
  id?: Types.ObjectId;
  name: string;
}

// create a model type for using method and statics
export type PricingFeatureModel = Model<
  TPricingFeature,
  Record<string, unknown>
>;

// type of search and filters data
export type TPricingFeatureFilters = {
  searchTerm?: string;
  name?: string;
};
