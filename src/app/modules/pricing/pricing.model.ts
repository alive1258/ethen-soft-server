import mongoose, { model, Mongoose, Schema } from "mongoose";
import { PricingModel, TPricing } from "./pricing.interface";

const pricingSchema = new Schema<TPricing, PricingModel>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    pricingCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "PricingCategory",
    },
  },
  {
    timestamps: true,
  }
);

export const Pricing = model<TPricing, PricingModel>("Pricing", pricingSchema);
