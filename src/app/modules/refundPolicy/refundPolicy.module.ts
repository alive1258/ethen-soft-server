import { Schema, model } from "mongoose";
import { TRefundPolicy } from "./refundPolicy.interface";

// Define the TRefundPolicy
const refundPolicySchema = new Schema<TRefundPolicy>(
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
  },
  {
    timestamps: true,
  }
);

// Create and export the TRefundPolicy model based on the defined schema
export const RefundPolicy = model<TRefundPolicy>(
  "RefundPolicy",
  refundPolicySchema
);
