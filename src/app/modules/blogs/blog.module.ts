import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

// Define the Blog
const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
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
    sub_description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TBlog model based on the defined schema
export const Blog = model<TBlog>("Blog", blogSchema);
