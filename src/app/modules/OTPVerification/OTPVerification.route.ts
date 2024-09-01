import express from "express";
import { OTPVerificationController } from "./OTPVerification.controller";

const router = express.Router();

// verify OTP route
router.post("/verifyOTP", OTPVerificationController.verifyOTP);

// OTP resend route
router.post(
  "/resendOTPVerification",
  OTPVerificationController.resendOTPVerification
);

export const OTPVerificationRoute = router;
