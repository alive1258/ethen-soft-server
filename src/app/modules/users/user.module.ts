import { Schema, model } from "mongoose";
import { User, UserName } from "./user.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<User>({
  id: { type: String },
  name: userNameSchema,
  contactNo: { type: String, required: true },
  gender: ["male", "female"],
  email: { type: String, required: true },
  profileImage: { type: String },
});

export const UserModel = model<User>("User", userSchema);
