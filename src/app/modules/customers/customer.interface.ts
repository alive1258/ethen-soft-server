import { Model } from "mongoose";

export type TCustomerName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TCustomer = {
  id: string;
  name: TCustomerName;
  password: string;
  gender: "male" | "female" | "other";
  email: string;
  contactNo: string;
  profileImage?: string;
  isDeleted: boolean;
};

// for crating static

export interface CustomerModel extends Model<TCustomer> {
  isUserExists(id: string): Promise<TCustomer | null>;
}
