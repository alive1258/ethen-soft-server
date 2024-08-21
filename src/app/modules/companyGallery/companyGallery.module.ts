import { Schema, model } from "mongoose";
import { TCompanyGallery } from "./companyGallery.interface";

// Define the heroSchema
const CompanyGallerySchema = new Schema<TCompanyGallery>(
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

// Create and export the CompanyGallerySchema model based on the defined schema
export const CompanyGallery = model<TCompanyGallery>(
  "CompanyGallery",
  CompanyGallerySchema
);
