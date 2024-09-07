import mongoose, { model, Schema } from "mongoose";
import {
  FeatureAssignedPricingModel,
  TFeatureAssignedPricing,
} from "./FeatureAssignedPricing.interface";

const featureAssignedPricingSchema = new Schema<
  TFeatureAssignedPricing,
  FeatureAssignedPricingModel
>(
  {
    pricing: {
      type: String,
      required: true,
      ref: "Pricing",
    },
    pricingFeature: {
      type: String,
      required: true,
      ref: "PricingFeature",
    },
  },
  {
    timestamps: true,
  }
);

export const FeatureAssignedPricing = model<
  TFeatureAssignedPricing,
  FeatureAssignedPricingModel
>("FeatureAssignedPricing", featureAssignedPricingSchema);
