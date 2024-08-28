import { Schema, model } from "mongoose";
import { TOurService } from "./ourService.interface";

// Define the OurService
const ourServiceSchema = new Schema<TOurService>(
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

// Create and export the TOurService model based on the defined schema
export const OurService = model<TOurService>("OurService", ourServiceSchema);
