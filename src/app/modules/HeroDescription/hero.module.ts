import { Schema, model } from "mongoose";
import { THero } from "./hero.interface";

// Define the heroSchema
const heroSchema = new Schema<THero>(
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the hero model based on the defined schema
export const Hero = model<THero>("Hero", heroSchema);
