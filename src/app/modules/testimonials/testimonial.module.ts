import { Schema, model } from "mongoose";
import { TTestimonial } from "./testimonial.interface";

// Define the testimonialSchema
const testimonialSchema = new Schema<TTestimonial>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the testimonialSchema model based on the defined schema
export const Testimonial = model<TTestimonial>(
  "Testimonial",
  testimonialSchema
);
