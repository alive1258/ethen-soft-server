import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TOurClient } from "./ourClient.interface";
import { OurClient } from "./ourClient.module";

// Service to create a new OurClient in the database
const createOurClientIntoDB = async (OurClientData: TOurClient) => {
  const result = await OurClient.create(OurClientData);

  return result;
};

// Service to retrieve all OurClient from the database
const getAllOurClientFromDB = async () => {
  const result = await OurClient.find();
  return result;
};

// Service to retrieve a single OurClient from the database by ID
const getSingleOurClientFromDB = async (_id: string) => {
  const result = await OurClient.findOne({ _id });
  return result;
};

// Service to update a OurClient in the database by ID
const updateOurClientInDB = async (
  _id: string,
  updateData: Partial<TOurClient>
) => {
  const result = await OurClient.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "OurClient Data not found");
  }

  return result;
};

// Service to delete a OurClient from the database by ID
const deleteOurClientFromDB = async (_id: string) => {
  const result = await OurClient.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "OurClient Data not found");
  }

  return result;
};

// Export the OurClient services as an object for use in other parts of the application
export const OurClientServices = {
  createOurClientIntoDB,
  getAllOurClientFromDB,
  getSingleOurClientFromDB,
  updateOurClientInDB,
  deleteOurClientFromDB,
};
