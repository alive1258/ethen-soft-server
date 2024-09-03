import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TTrustUs } from "./trustUs.interface";
import { TrustUs } from "./trustUs.module";

// Service to create a new TrustUs in the database
const createTrustUsIntoDB = async (heroData: TTrustUs) => {
  const result = await TrustUs.create(heroData);

  return result;
};

// Service to retrieve all TrustUs from the database
const getAllTrustUsFromDB = async () => {
  const result = await TrustUs.find();
  return result;
};

// Service to retrieve a single TrustUs from the database by ID
const getSingleTrustUsFromDB = async (_id: string) => {
  const result = await TrustUs.findOne({ _id });
  return result;
};

// Service to update a TrustUs in the database by ID
const updateTrustUsInDB = async (
  _id: string,
  updateData: Partial<TTrustUs>
) => {
  const result = await TrustUs.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "TrustUs Data not found");
  }

  return result;
};

// Service to delete a TrustUs from the database by ID
const deleteTrustUsFromDB = async (_id: string) => {
  const result = await TrustUs.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "TrustUs Data not found");
  }

  return result;
};

// Export the TrustUs services as an object for use in other parts of the application
export const TrustUsServices = {
  createTrustUsIntoDB,
  getAllTrustUsFromDB,
  getSingleTrustUsFromDB,
  updateTrustUsInDB,
  deleteTrustUsFromDB,
};
