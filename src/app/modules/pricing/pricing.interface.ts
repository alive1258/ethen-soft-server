import { Model, Types } from "mongoose";

// defined the pricing type
export interface TPricing {
  id?: Types.ObjectId;
  title: string;
  price: string;
  service: string;
  pricingCategory: string;
}

// pricing model for using method and statics
export type PricingModel = Model<TPricing, Record<string, unknown>>;
