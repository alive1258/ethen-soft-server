import express from "express";
import { OTPVerificationController } from "./OTPVerification.controller";
import validateRequest from "../../middleware/validateRequest";
import { OTPVerificationValidation } from "./OTPVerification.validation";

const router = express.Router();

// verify OTP route
router.post(
  "/verifyOTP",
  validateRequest(OTPVerificationValidation.createOTPVerificationZodSchema),
  OTPVerificationController.verifyOTP
);

// OTP resend route
router.post(
  "/resendOTPVerification",
  OTPVerificationController.resendOTPVerification
);

export const OTPVerificationRoute = router;
