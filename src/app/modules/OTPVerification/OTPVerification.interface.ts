import { Model, Types } from "mongoose";

// OTP verification type declaration
export interface TOTPVerification {
  userId: Types.ObjectId;
  otp: string;
  role?: string;
  createdAt: Date;
  expiresAt: Date;
}

// OTP verification model type declaration
export type OTPVerificationModel = Model<
  TOTPVerification,
  Record<string, unknown>
>;
