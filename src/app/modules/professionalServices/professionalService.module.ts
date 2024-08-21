import { Schema, model } from "mongoose";
import { TProfessionalService } from "./professionalService.interface";

// Define the ProfessionalService
const ourServiceSchema = new Schema<TProfessionalService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    service_one: {
      type: String,
      required: true,
    },
    service_tow: {
      type: String,
      required: true,
    },
    service_three: {
      type: String,
      required: true,
    },
    service_four: {
      type: String,
      required: true,
    },
    color_code: {
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

// Create and export the TProfessionalService model based on the defined schema
export const ProfessionalService = model<TProfessionalService>(
  "ProfessionalService",
  ourServiceSchema
);
