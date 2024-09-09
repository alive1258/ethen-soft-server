import mongoose, { Schema } from "mongoose";
import {
  OTPVerificationModel,
  TOTPVerification,
} from "./OTPVerification.interface";

// OTP verification schema
const OTPVerificationSchema = new Schema<
  TOTPVerification,
  OTPVerificationModel
>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const OTPVerification = mongoose.model<
  TOTPVerification,
  OTPVerificationModel
>("OTPVerification", OTPVerificationSchema);
