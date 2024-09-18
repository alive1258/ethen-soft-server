import mongoose, { model, Schema } from "mongoose";
import { CategoryModel, TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory, CategoryModel>(
  {
    title: {
      type: String,
      required: true,
    },
    subDescription: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    metaKey: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
      ref: "Service",
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<TCategory, CategoryModel>(
  "Category",
  categorySchema
);
