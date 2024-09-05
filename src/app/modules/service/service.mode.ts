import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

// Define the service schema
const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    logo: {
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
