import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import { TLoginUserResponse, TRefreshTokenResponse } from "./auth.interface";
import httpStatus from "http-status";

// login controller  function
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthService.loginUserService(loginData);

  //   destructuring refresh token to set cookie
  const { refreshToken, ...others } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  // pass data to frontend
  sendResponse<TLoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully.",
    data: others,
  });
});

// refresh token controller function
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // destructuring refreshToken from cookies
  console.log(req.cookies);
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshTokenService(refreshToken);

  sendResponse<TRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

// export auth controllers in object
export const AuthController = {
  loginUser,
  refreshToken,
};
