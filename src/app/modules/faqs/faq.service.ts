import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TFaq } from "./faq.interface";
import { Faq } from "./faq.module";

// Service to create a new Faq in the database
const createFaqIntoDB = async (FaqData: TFaq) => {
  const result = await Faq.create(FaqData);

  return result;
};

// Service to retrieve all Faq from the database
const getAllFaqFromDB = async () => {
  const result = await Faq.find();
  return result;
};

// Service to retrieve a single Faq from the database by ID
const getSingleFaqFromDB = async (_id: string) => {
  const result = await Faq.findOne({ _id });
  return result;
};

// Service to update a Faq in the database by ID
const updateFaqInDB = async (_id: string, updateData: Partial<TFaq>) => {
  const result = await Faq.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faq Data not found");
  }

  return result;
};

// Service to delete a Faq from the database by ID
const deleteFaqFromDB = async (_id: string) => {
  const result = await Faq.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faq Data not found");
  }

  return result;
};

// Export the Faq services as an object for use in other parts of the application
export const FaqServices = {
  createFaqIntoDB,
  getAllFaqFromDB,
  getSingleFaqFromDB,
  updateFaqInDB,
  deleteFaqFromDB,
};
