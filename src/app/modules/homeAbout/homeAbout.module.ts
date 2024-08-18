import { Schema, model } from "mongoose";
import { THomeAbout } from "./homeAbout.interface";

// Define the HomeAbout
const HomeAboutSchema = new Schema<THomeAbout>(
  {
    title: {
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

// Create and export the THomeAbout model based on the defined schema
export const HomeAbout = model<THomeAbout>("HomeAbout", HomeAboutSchema);
