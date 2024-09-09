import { model, Schema } from "mongoose";
import {
  PricingCategoryModel,
  TPricingCategory,
} from "./pricingCategory.interface";

const pricingCategorySchema = new Schema<
  TPricingCategory,
  PricingCategoryModel
>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PricingCategory = model<TPricingCategory, PricingCategoryModel>(
  "PricingCategory",
  pricingCategorySchema
);
