import { Schema, model } from "mongoose";
import { TOurProduct } from "./ourProduct.interface";

// Define the OurProduct
const ourProductSchema = new Schema<TOurProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sub_description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color_code: {
      type: String,
      required: true,
    },
    meta_key: {
      type: String,
    },
    meta_description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TOurProduct model based on the defined schema
export const OurProduct = model<TOurProduct>("OurProduct", ourProductSchema);
