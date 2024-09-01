import { Schema, model } from "mongoose";
import { TOurWork } from "./ourWork.interface";

// Define the OurWork
const ourWorkSchema = new Schema<TOurWork>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
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
    tech: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TOurWork model based on the defined schema
export const OurWork = model<TOurWork>("OurWork", ourWorkSchema);
