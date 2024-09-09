import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  TLoginUser,
  TLoginUserResponse,
  TRefreshTokenResponse,
} from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { ENUM_ROLE } from "../../../enums/user";
import { User } from "../users/user.module";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { TUser } from "../users/user.interface";
import { Customer } from "../customers/customer.module";
import { OTPVerificationService } from "../OTPVerification/OTPVerification.service";

// Service to handle user login
const loginUserService = async (
  loginData: TLoginUser
): Promise<TLoginUserResponse> => {
  // Destructure email and password from the login data
  const { email, password } = loginData;

  // Find the user by email in both Customer and User collections
  const customerData = await Customer.findOne(
    { email },
    { _id: 1, email: 1, password: 1, role: 1 }
  ).lean();

  const userData =
    customerData ||
    (await User.findOne(
      { email },
      { _id: 1, email: 1, password: 1, role: 1, isEmailVerified: 1 }
    ).lean());

  console.log(userData);

  // Throw an error if neither Customer nor User exists
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  console.log(password);
  // Compare the provided password with the stored hashed password
  const isPasswordMatched = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  // Throw an error if email is not verified.
  if (!userData?.isEmailVerified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email is not verified!");
  }

  // Generate an access token
  const accessToken = jwtHelpers.createToken(
    { _id: userData._id, role: userData.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // Generate a refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id: userData._id, role: userData.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // Return the access and refresh tokens
  return {
    accessToken,
    refreshToken,
  };
};

//refresh token service function
const refreshTokenService = async (
  token: string
): Promise<TRefreshTokenResponse> => {
  // set an initial verified token variable
  let verifiedToken = null;

  try {
    // checked the token
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    // throw an error if the token is invalid
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }
  //checking deleted user's refresh token
  const { _id } = verifiedToken;

  //   set initial new accessToken variable
  let newAccessToken = "";

  //  try to find the customer data from database
  const customerData = await Customer.findOne(
    { _id },
    { _id: 1, password: 1, role: 1 }
  ).lean();

  //   if customer data is not available then find user data from database
  const userData =
    customerData ||
    (await User.findOne({ _id }, { _id: 1, password: 1, role: 1 }).lean());

  // check the user is available or not
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  //generate new access token
  newAccessToken = jwtHelpers.createToken(
    { _id: userData._id, role: userData.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const forgetPasswordService = async (email: string) => {
  if (!email) {
    throw new ApiError(httpStatus.NOT_FOUND, "Email not Found!");
  }
  //  try to find the customer data from database
  const customerData = await Customer.findOne(
    { email },
    { _id: 1, email: 1 }
  ).lean();

  //   if customer data is not available then find user data from database
  const userData =
    customerData ||
    (await User.findOne({ email }, { _id: 1, email: 1 }).lean());

  // check the user is available or not
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }
  const result = await OTPVerificationService.sendOTPVerificationEmail(
    userData?._id,
    userData?.email
  );

  return result;
};

//reset password

const resetPasswordService = async (
  user: JwtPayload | null,
  newPassword: string
): Promise<TLoginUserResponse> => {
  //  try to find the customer data from database
  const customerData = await Customer.findOne({ _id: user?._id });

  //   if customer data is not available then find user data from database
  const userData = customerData || (await User.findOne({ _id: user?._id }));

  // check the user is available or not
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  userData.password = newPassword;
  await userData.save();

  const loginData = { email: userData?.email, password: newPassword };
  const result = await loginUserService(loginData);

  return result;
};

// export auth service as object
export const AuthService = {
  loginUserService,
  refreshTokenService,
  forgetPasswordService,
  resetPasswordService,
};
