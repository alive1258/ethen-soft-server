import { Schema, model } from "mongoose";
import { TBanner } from "./banner.interface";

// Define the bannerSchema
const bannerSchema = new Schema<TBanner>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the bannerSchema model based on the defined schema
export const Banner = model<TBanner>("Banner", bannerSchema);
