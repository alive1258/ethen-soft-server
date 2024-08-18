import { Schema, model } from "mongoose";
import { TFaq } from "./faq.interface";

// Define the Faq
const faqSchema = new Schema<TFaq>(
  {
    title: {
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

// Create and export the TFaq model based on the defined schema
export const Faq = model<TFaq>("Faq", faqSchema);
