import { TJoinUs } from "./joinUs.interface";
import { JoinUs } from "./joinUs.module";

// Service to create a new JoinUs in the database
const createJoinUsIntoDB = async (heroData: TJoinUs) => {
  const result = await JoinUs.create(heroData);

  return result;
};

// Service to retrieve all JoinUs from the database
const getAllJoinUsFromDB = async () => {
  const result = await JoinUs.find();
  return result;
};

// Service to retrieve a single JoinUs from the database by ID
const getSingleJoinUsFromDB = async (_id: string) => {
  const result = await JoinUs.findOne({ _id });
  return result;
};

// Service to update a JoinUs in the database by ID
const updateJoinUsInDB = async (_id: string, updateData: Partial<TJoinUs>) => {
  const result = await JoinUs.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("JoinUs Data not found");
  }

  return result;
};

// Service to delete a JoinUs from the database by ID
const deleteJoinUsFromDB = async (_id: string) => {
  const result = await JoinUs.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("JoinUs Data not found");
  }

  return result;
};

// Export the JoinUs services as an object for use in other parts of the application
export const JoinUsServices = {
  createJoinUsIntoDB,
  getAllJoinUsFromDB,
  getSingleJoinUsFromDB,
  updateJoinUsInDB,
  deleteJoinUsFromDB,
};
