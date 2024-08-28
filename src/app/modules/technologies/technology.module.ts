import { Schema, model } from "mongoose";
import { TTechnology } from "./technology.interface";

// Define the heroSchema
const technologySchema = new Schema<TTechnology>(
  {
    name: {
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

// Create and export the technologySchema model based on the defined schema
export const Technology = model<TTechnology>("Technology", technologySchema);
