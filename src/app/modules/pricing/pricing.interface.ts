import { Model, Types } from "mongoose";

// defined the pricing type
export interface TPricing {
  title: string;
  price: string;
  category: Types.ObjectId;
  service: Types.ObjectId;
  pricingCategory: Types.ObjectId;
}

// pricing model for using method and statics
export type PricingModel = Model<TPricing, Record<string, unknown>>;
