import { Model } from "mongoose";

export interface TPricingCategory {
  name: string;
}

export type PricingModel = Model<TPricingCategory, Record<string, unknown>>;
