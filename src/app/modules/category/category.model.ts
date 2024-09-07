import mongoose, { model, Schema } from "mongoose";
import { CategoryModel, TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory, CategoryModel>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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

categorySchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

export const Category = model<TCategory, CategoryModel>(
  "Category",
  categorySchema
);
