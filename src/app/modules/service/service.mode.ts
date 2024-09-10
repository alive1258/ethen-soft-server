import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

// Define the service schema
const serviceSchema = new Schema<TService>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    subDescription: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    metaKey: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TTrustUs model based on the defined schema
export const Service = model<TService>("Service", serviceSchema);
