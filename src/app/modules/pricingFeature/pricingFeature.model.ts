import { model, Schema } from "mongoose";
import {
  PricingFeatureModel,
  TPricingFeature,
} from "./pricingFeature.interface";

const pricingFeature = new Schema<TPricingFeature, PricingFeatureModel>(
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

export const PricingFeature = model<TPricingFeature, PricingFeatureModel>(
  "PricingFeature",
  pricingFeature
);
