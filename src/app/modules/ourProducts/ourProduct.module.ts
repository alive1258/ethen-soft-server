import { Schema, model } from "mongoose";
import { TOurProduct } from "./ourProduct.interface";

// Define the OurProduct
const ourProductSchema = new Schema<TOurProduct>(
  {
    title: {
      type: String,
      required: true,
    },

    sub_title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TOurProduct model based on the defined schema
export const OurProduct = model<TOurProduct>("OurProduct", ourProductSchema);
