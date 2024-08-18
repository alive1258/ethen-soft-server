import { TTechnology } from "./technology.interface";
import { Technology } from "./technology.module";

// Service to create a new Technology in the database
const createTechnologyIntoDB = async (heroData: TTechnology) => {
  const result = await Technology.create(heroData);

  return result;
};

// Service to retrieve all Technology from the database
const getAllTechnologyFromDB = async () => {
  const result = await Technology.find();
  return result;
};

// Service to retrieve a single Technology from the database by ID
const getSingleTechnologyFromDB = async (_id: string) => {
  const result = await Technology.findOne({ _id });
  return result;
};

// Service to update a Technology in the database by ID
const updateTechnologyInDB = async (
  _id: string,
  updateData: Partial<TTechnology>
) => {
  const result = await Technology.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("Technology Data not found");
  }

  return result;
};

// Service to delete a Technology from the database by ID
const deleteTechnologyFromDB = async (_id: string) => {
  const result = await Technology.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("Hero Data not found");
  }

  return result;
};

// Export the hero services as an object for use in other parts of the application
export const TechServices = {
  createTechnologyIntoDB,
  getAllTechnologyFromDB,
  getSingleTechnologyFromDB,
  updateTechnologyInDB,
  deleteTechnologyFromDB,
};
