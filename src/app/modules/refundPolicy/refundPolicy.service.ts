import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TRefundPolicy } from "./refundPolicy.interface";
import { RefundPolicy } from "./refundPolicy.module";

// Service to create a new RefundPolicy in the database
const createRefundPolicyIntoDB = async (heroData: TRefundPolicy) => {
  const result = await RefundPolicy.create(heroData);

  return result;
};

// Service to retrieve all RefundPolicy from the database
const getAllRefundPolicyFromDB = async () => {
  const result = await RefundPolicy.find();
  return result;
};

// Service to retrieve a single RefundPolicy from the database by ID
const getSingleRefundPolicyFromDB = async (_id: string) => {
  const result = await RefundPolicy.findOne({ _id });
  return result;
};

// Service to update a RefundPolicy in the database by ID
const updateRefundPolicyInDB = async (
  _id: string,
  updateData: Partial<TRefundPolicy>
) => {
  const result = await RefundPolicy.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "RefundPolicy Data not found");
  }

  return result;
};

// Service to delete a RefundPolicy from the database by ID
const deleteRefundPolicyFromDB = async (_id: string) => {
  const result = await RefundPolicy.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "RefundPolicy Data not found");
  }

  return result;
};

// Export the RefundPolicy services as an object for use in other parts of the application
export const RefundPolicyServices = {
  createRefundPolicyIntoDB,
  getAllRefundPolicyFromDB,
  getSingleRefundPolicyFromDB,
  updateRefundPolicyInDB,
  deleteRefundPolicyFromDB,
};
