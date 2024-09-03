import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { THero } from "./hero.interface";
import { Hero } from "./hero.module";

// Service to create a new hero in the database
const createHeroIntoDB = async (heroData: THero) => {
  const result = await Hero.create(heroData);

  return result;
};

// Service to retrieve all heroes from the database
const getAllHeroesFromDB = async () => {
  const result = await Hero.find();
  return result;
};

// Service to retrieve a single hero from the database by ID
const getSingleHeroFromDB = async (_id: string) => {
  const result = await Hero.findOne({ _id });
  return result;
};

// Service to update a hero in the database by ID
const updateHeroInDB = async (_id: string, updateData: Partial<THero>) => {
  const result = await Hero.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Hero Data not found");
  }

  return result;
};

// Service to delete a hero from the database by ID
const deleteHeroFromDB = async (_id: string) => {
  const result = await Hero.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Hero Data not found");
  }

  return result;
};

// Export the hero services as an object for use in other parts of the application
export const HeroServices = {
  createHeroIntoDB,
  getAllHeroesFromDB,
  getSingleHeroFromDB,
  updateHeroInDB,
  deleteHeroFromDB,
};
