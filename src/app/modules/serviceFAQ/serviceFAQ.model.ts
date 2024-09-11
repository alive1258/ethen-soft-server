import mongoose, { model, Schema } from "mongoose";
import { serviceFAQModel, TServiceFAQ } from "./serviceFAQ.interface";

const serviceFAQSchema = new Schema<TServiceFAQ, serviceFAQModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

export const ServiceFAQ = model<TServiceFAQ, serviceFAQModel>(
  "ServiceFAQ",
  serviceFAQSchema
);
