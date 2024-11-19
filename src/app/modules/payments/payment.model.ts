import mongoose, { model, Mongoose, Schema } from "mongoose";
import { PaymentModel, TPayment } from "./payment.interface";

const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new Schema<TPayment, PaymentModel>(
  {
    service: {
      type: String,
      ref: "Pricing",
    },
    totalAmount: {
      type: String,
      required: true,
    },
    paidStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "REJECTED"],
      default: "PENDING",
    },
    transactionId: {
      type: String,
      required: true,
    },

    user: {
      type: String,
      required: true,
      ref: "Customer",
    },
    pricing: {
      type: String,
      required: true,
      ref: "Pricing",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<TPayment, PaymentModel>("Payment", paymentSchema);
