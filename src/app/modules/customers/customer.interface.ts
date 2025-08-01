import { Model, Types } from "mongoose";

export type TCustomerName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TCustomer = {
  _id?: Types.ObjectId;
  id: string;
  name: TCustomerName;
  role: string;
  password: string;
  gender: "male" | "female" | "other";
  email: string;
  contactNo: string;
  isEmailVerified: boolean;
  profileImage?: string;
  isDeleted: boolean;
  isClient: boolean;
};

// for crating static

export interface CustomerModel extends Model<TCustomer> {
  isUserExists(id: string): Promise<TCustomer | null>;
}

// customers filters fields
export type TCustomerFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  role?: number;
  isClient?: boolean;
};
