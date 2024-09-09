import mongoose, { model, Schema } from "mongoose";
import { ClientReviewModel, TClientReview } from "./clientReview.interface";

const clientReviewSchema = new Schema<TClientReview, ClientReviewModel>(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
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
    customer: {
      type: String,
      required: true,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

export const ClientReview = model<TClientReview, ClientReviewModel>(
  "ClientReview",
  clientReviewSchema
);
