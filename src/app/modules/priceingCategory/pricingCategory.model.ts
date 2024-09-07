import { model, Schema } from "mongoose";
import { PricingModel, TPricingCategory } from "./pricingCategory.interface";

const pricingCategory = new Schema<TPricingCategory, PricingModel>(
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

export const PricingCategory = model<TPricingCategory, PricingModel>(
  "PricingCategory",
  pricingCategory
);
