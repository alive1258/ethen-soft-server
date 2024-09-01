import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.module";

const createCustomerIntoDB = async (
  customer: TCustomer
): Promise<TCustomer | null> => {
  //set customer role
  if (customer) {
    customer.role = "customer";
  }

  // check that the customer is already exist or not
  const isCustomerExist = await Customer.findOne({ email: customer.email });
  if (isCustomerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already used!");
  }

  // save customer to database
  const result = await Customer.create(customer);

  return result;
};

const getSingleCustomerFromDB = async (
  id: string
): Promise<TCustomer | null> => {
  const result = await Customer.findById(id);
  return result;
};
const updateSingleCustomerFromDB = async (
  id: string,
  updatedData: Partial<TCustomer>
): Promise<TCustomer | null> => {
  const result = await Customer.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });

  return result;
};

const deleteCustomerFromDB = async (id: string): Promise<TCustomer | null> => {
  const result = await Customer.findByIdAndDelete(id);

  return result;
};

export const CustomerService = {
  createCustomerIntoDB,
  getSingleCustomerFromDB,
  updateSingleCustomerFromDB,
  deleteCustomerFromDB,
};
