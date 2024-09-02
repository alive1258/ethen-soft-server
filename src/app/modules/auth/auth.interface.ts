import { Model } from "mongoose";
import { TCustomer } from "../customers/customer.interface";
import { TUser } from "../users/user.interface";

// type for Token
export interface TToken extends Document {
  user: TUser["_id"] | TCustomer["_id"];
  token: string;
  expiryDate: Date;
}

// type for token model
export type TokenModel = Model<TToken, Record<string, unknown>>;

// login user data type
export type TLoginUser = {
  email: string;
  password: string;
};

// login response data type
export type TLoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

// refresh token response data type
export type TRefreshTokenResponse = {
  accessToken: string;
};

// verified user data type
export type TVerifiedUser = {
  _id: string;
  role: String;
  iat?: number;
  exp?: number;
};
