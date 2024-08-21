import { Schema, model } from "mongoose";
import { TPrivacyPolicy } from "./privacyPolicy.interface";

// Define the TPrivacyPolicy
const privacyPolicySchema = new Schema<TPrivacyPolicy>(
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

// Create and export the TPrivacyPolicy model based on the defined schema
export const PrivacyPolicy = model<TPrivacyPolicy>(
  "PrivacyPolicy",
  privacyPolicySchema
);
