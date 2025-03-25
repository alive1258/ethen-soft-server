import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OTPVerificationService } from "./OTPVerification.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TLoginUserResponse } from "../auth/auth.interface";
import config from "../../config";

// verify OTP controller
const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  const result = await OTPVerificationService.verifyOTP(userId, otp);

  // pass data to frontend
  sendResponse<TLoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully.",
    data: result,
  });
});
const resendOTPVerification = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, email } = req.body;

    const result = await OTPVerificationService.resendOTPVerification(
      userId,
      email
    );

    // Respond with a success message and the retrieved resend OTP verification data
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP re-sended successfully.",
      data: result,
    });
  }
);

// export as a object OTP verification controller
export const OTPVerificationController = {
  verifyOTP,
  resendOTPVerification,
};
