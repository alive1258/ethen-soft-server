import { Schema, model } from "mongoose";
import { TTrustUs } from "./trustUs.interface";

// Define the TTrustUs
const trustUsSchema = new Schema<TTrustUs>(
  {
    title: {
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
  },
  {
    timestamps: true,
  }
);

// Create and export the TTrustUs model based on the defined schema
export const TrustUs = model<TTrustUs>("TrustUs", trustUsSchema);
