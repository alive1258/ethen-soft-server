import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  TLoginUser,
  TLoginUserResponse,
  TRefreshTokenResponse,
} from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { ENUM_ROLE } from "../../../enums/user";
import { User } from "../users/user.module";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

// login service function
const loginUserService = async (
  loginData: TLoginUser
): Promise<TLoginUserResponse> => {
  // destructured the login data
  const { email, password } = loginData;

  //   find the user
  const isUserExist = await User.findOne(
    { email },
    { _id: 1, email: 1, password: 1, role: 1 }
  ).lean();

  //   throw an error if the user is not exist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  //match the password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  //   compare passwords
  if (isUserExist.password && !isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  // generating access token
  const accessToken = jwtHelpers.createToken(
    { _id: isUserExist?._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // generating refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id: isUserExist?._id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

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
  const { _id, role } = verifiedToken;

  //   set initial new accessToken variable
  let newAccessToken = "";

  //   find the user from database
  const isUserExist = await User.findOne(
    { _id },
    { _id: 1, password: 1, role: 1 }
  ).lean();

  // check the user is available or not
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  //generate new access token
  newAccessToken = jwtHelpers.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// export auth service as object
export const AuthService = {
  loginUserService,
  refreshTokenService,
};
