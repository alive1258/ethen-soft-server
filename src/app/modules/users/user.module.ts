import { Query, Schema, model } from "mongoose";
import { TUser, UserModel, TUserName } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

// Define the userNameSchema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name can't be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, "Middle name can't be more than 20 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, "Last name can't be more than 20 characters"],
  },
});

// Define the userSchema
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
      maxlength: [20, "password cant not be more than 20 characters"],
    },
    role: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender",
      },
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft deletion flag, default is false (not deleted)
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual
userSchema.virtual("fullName").get(function () {
  return `${
    this.name.firstName
  } ${this.name.middleName ? this.name.middleName + " " : ""} ${
    this.name.lastName
  }`;
});

// Pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  const user = this as TUser;

  // Hash the password with bcrypt before saving
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// Post-save middleware to remove the password field from the saved document
userSchema.post<TUser>("save", async function (doc, next) {
  doc.password = "";
  next();
});

// Pre-find middleware to automatically exclude soft-deleted users from query results
userSchema.pre<Query<TUser & Document, TUser>>("find", function (next) {
  this.where({ isDeleted: { $ne: true } }).select("-password");
  next();
});

// Pre-findOne middleware to automatically exclude soft-deleted users from single record queries
userSchema.pre<Query<TUser & Document, TUser>>("findOne", function (next) {
  this.where({ isDeleted: { $ne: true } }).select("-password");
  next();
});

// Pre-aggregate middleware to automatically exclude soft-deleted users in aggregation queries
userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Static method to check if a user exists by email
userSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await User.findOne({ email });

  return existingUser;
};

// Create and export the User model based on the defined schema
export const User = model<TUser, UserModel>("User", userSchema);
