import { z } from "zod";

// Zod schema for OTPVerification
const createOTPVerificationZodSchema = z.object({
  body: z.object({
    userId: z.string(), // Assuming ObjectId is represented as a string
    otp: z.string().trim(),
    role: z.string().optional(),
    createdAt: z.date().optional(),
    expiresAt: z.date().optional(),
  }),
});

const updateOTPVerificationZodSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "userId is required"),
    otp: z.string().trim().min(1, "otp is required"),
    createdAt: z.date(),
    expiresAt: z.date(),
  }),
});

export const OTPVerificationValidation = {
  createOTPVerificationZodSchema,
  updateOTPVerificationZodSchema,
};
