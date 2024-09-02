import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { THomeAbout } from "./homeAbout.interface";
import { HomeAbout } from "./homeAbout.module";

// Service to create a new HomeAbout in the database
const createHomeAboutIntoDB = async (HomeAboutData: THomeAbout) => {
  const result = await HomeAbout.create(HomeAboutData);

  return result;
};

// Service to retrieve all HomeAbout from the database
const getAllHomeAboutFromDB = async () => {
  const result = await HomeAbout.find();
  return result;
};

// Service to retrieve a single HomeAbout from the database by ID
const getSingleHomeAboutFromDB = async (_id: string) => {
  const result = await HomeAbout.findOne({ _id });
  return result;
};

// Service to update a HomeAbout in the database by ID
const updateHomeAboutInDB = async (
  _id: string,
  updateData: Partial<THomeAbout>
) => {
  const result = await HomeAbout.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "HomeAbout Data not found");
  }

  return result;
};

// Service to delete a HomeAbout from the database by ID
const deleteHomeAboutFromDB = async (_id: string) => {
  const result = await HomeAbout.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "HomeAbout Data not found");
  }

  return result;
};

// Export the HomeAbout services as an object for use in other parts of the application
export const HomeAboutServices = {
  createHomeAboutIntoDB,
  getAllHomeAboutFromDB,
  getSingleHomeAboutFromDB,
  updateHomeAboutInDB,
  deleteHomeAboutFromDB,
};
