import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TAboutHero } from "./aboutHero.interface";
import { AboutHero } from "./aboutHero.module";

// Work to create a new AboutHero in the database
const createAboutHeroIntoDB = async (AboutHeroData: TAboutHero) => {
  const result = await AboutHero.create(AboutHeroData);

  return result;
};

// Work to retrieve all AboutHero from the database
const getAllAboutHeroFromDB = async () => {
  const result = await AboutHero.find();
  return result;
};

// Work to retrieve a single AboutHero from the database by ID
const getSingleAboutHeroFromDB = async (_id: string) => {
  const result = await AboutHero.findOne({ _id });
  return result;
};

// Work to update a AboutHero in the database by ID
const updateAboutHeroInDB = async (
  _id: string,
  updateData: Partial<TAboutHero>
) => {
  const result = await AboutHero.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "AboutHero Data not found");
  }

  return result;
};

// Work to delete a AboutHero from the database by ID
const deleteAboutHeroFromDB = async (_id: string) => {
  const result = await AboutHero.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "AboutHero Data not found");
  }

  return result;
};

// Export the AboutHero Works as an object for use in other parts of the application
export const AboutHeros = {
  createAboutHeroIntoDB,
  getAllAboutHeroFromDB,
  getSingleAboutHeroFromDB,
  updateAboutHeroInDB,
  deleteAboutHeroFromDB,
};
