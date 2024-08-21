import { Schema, model } from "mongoose";
import { TCareerOpportunity } from "./careerOpportunity.interface";

// Define the CareerOpportunity
const careerOpportunitySchema = new Schema<TCareerOpportunity>(
  {
    title: {
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
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TCareerOpportunity model based on the defined schema
export const CareerOpportunity = model<TCareerOpportunity>(
  "CareerOpportunity",
  careerOpportunitySchema
);
