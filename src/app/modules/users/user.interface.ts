import { Model } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TUser = {
  id: string;
  name: TUserName;
  password: string;
  gender: "male" | "female" | "other";
  email: string;
  contactNo: string;
  profileImage?: string | undefined;
  isDeleted: boolean;
};

// for crating static
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
}
