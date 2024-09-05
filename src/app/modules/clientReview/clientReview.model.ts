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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
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
