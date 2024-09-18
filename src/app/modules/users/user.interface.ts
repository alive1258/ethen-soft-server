import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};
//user t

export type TUser = {
  _id?: Types.ObjectId;
  id?: string | undefined;
  name: TUserName;
  password: string;
  gender: "male" | "female" | "other";
  email: string;
  isEmailVerified: boolean;
  role: string;
  contactNo: string;
  profileImage?: string | undefined;
  isDeleted: boolean;
};

// for crating static
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
}

// user filters fields type
export type TUserFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  role?: number;
};
