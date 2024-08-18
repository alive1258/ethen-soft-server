import { Schema, model } from "mongoose";
import { TOurClient } from "./ourClient.interface";

// Define the OurClient
const ourClientSchema = new Schema<TOurClient>(
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

// Create and export the TOurClient model based on the defined schema
export const OurClient = model<TOurClient>("OurClient", ourClientSchema);
