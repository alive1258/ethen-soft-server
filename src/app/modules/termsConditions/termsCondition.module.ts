import { Schema, model } from "mongoose";
import { TTermsCondition } from "./termsCondition.interface";

// Define the TTermsCondition
const termsConditionSchema = new Schema<TTermsCondition>(
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

// Create and export the TTermsCondition model based on the defined schema
export const TermsCondition = model<TTermsCondition>(
  "TermsCondition",
  termsConditionSchema
);
