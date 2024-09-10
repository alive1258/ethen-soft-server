import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

// defined the pricing type
export interface TPricing {
  id?: Types.ObjectId;
  title: string;
  price: string;
  service: string | TService;
  pricingCategory: string;
}

// pricing model for using method and statics
export type PricingModel = Model<TPricing, Record<string, unknown>>;

export interface TPricingFilters {
  searchTerm?: string;
  service?: string;
  title?: string;
}
