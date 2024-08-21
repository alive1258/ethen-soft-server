import { Schema, model } from "mongoose";
import { TJoinUs } from "./joinUs.interface";

// Define the TJoinUs
const joinUsSchema = new Schema<TJoinUs>(
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
    color_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TJoinUs model based on the defined schema
export const JoinUs = model<TJoinUs>("JoinUs", joinUsSchema);
