import { Schema, model } from "mongoose";
import { TAboutHero } from "./aboutHero.interface";

// Define the AboutHero
const AboutHeroSchema = new Schema<TAboutHero>(
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
    service_two: {
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
    service_five: {
      type: String,
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

// Create and export the TAboutHero model based on the defined schema
export const AboutHero = model<TAboutHero>("AboutHero", AboutHeroSchema);
