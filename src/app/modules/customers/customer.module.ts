import { Query, Schema, model } from "mongoose";

import bcrypt from "bcrypt";
import config from "../../config";
import { CustomerModel, TCustomer, TCustomerName } from "./customer.interface";

// Name Schema
const customerNameSchema = new Schema<TCustomerName>({
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
// Customer Schema
const customerSchema = new Schema<TCustomer, CustomerModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: customerNameSchema,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: [20, "Password can't be more than 20 characters"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    contactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["male", "female", "other"],
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isClient: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual
customerSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${
    this.name.middleName ? this.name.middleName + " " : ""
  }${this.name.lastName}`;
});

// Pre-save middleware to hash the password before saving the user document
customerSchema.pre("save", async function (next) {
  const customer = this as TCustomer;

  // Hash the password with bcrypt before saving
  customer.password = await bcrypt.hash(
    customer.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// Post-save middleware to remove the password field from the saved document
customerSchema.post<TCustomer>("save", async function (doc, next) {
  doc.password = "";
  next();
});

// Pre-find middleware to automatically exclude soft-deleted users from query results
customerSchema.pre<Query<TCustomer & Document, TCustomer>>(
  "find",
  function (next) {
    this.where({ isDeleted: { $ne: true } }).select("-password");
    next();
  }
);

// Pre-findOne middleware to automatically exclude soft-deleted users from single record queries
customerSchema.pre<Query<TCustomer & Document, TCustomer>>(
  "findOne",
  function (next) {
    this.where({ isDeleted: { $ne: true } }).select("-password");
    next();
  }
);

// Pre-aggregate middleware to automatically exclude soft-deleted users in aggregation queries
customerSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Static method to check if a user exists by email
customerSchema.statics.isUserExists = async function (id: string) {
  const existingCustomer = await this.findOne({ id });

  return existingCustomer;
};

// Create and export the User model based on the defined schema
export const Customer = model<TCustomer, CustomerModel>(
  "Customer",
  customerSchema
);
