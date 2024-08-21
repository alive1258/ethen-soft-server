import { Schema, model } from "mongoose";
import { TOurDeal } from "./ourDeal.interface";

// Define the OurDeal
const ourDealSchema = new Schema<TOurDeal>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    deal: {
      type: String,
      required: true,
    },
    color_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the TOurDeal model based on the defined schema
export const OurDeal = model<TOurDeal>("OurDeal", ourDealSchema);
