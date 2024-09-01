import { TOurWork } from "./ourWork.interface";
import { OurWork } from "./ourWork.module";

// Work to create a new OurWork in the database
const createOurWorkIntoDB = async (OurWorkData: TOurWork) => {
  const result = await OurWork.create(OurWorkData);

  return result;
};

// Work to retrieve all OurWork from the database
const getAllOurWorkFromDB = async () => {
  const result = await OurWork.find();
  return result;
};

// Work to retrieve a single OurWork from the database by ID
const getSingleOurWorkFromDB = async (slug: string) => {
  const result = await OurWork.findOne({ slug });
  return result;
};

// Work to update a OurWork in the database by ID
const updateOurWorkInDB = async (
  _id: string,
  updateData: Partial<TOurWork>
) => {
  const result = await OurWork.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("OurWork Data not found");
  }

  return result;
};

// Work to delete a OurWork from the database by ID
const deleteOurWorkFromDB = async (_id: string) => {
  const result = await OurWork.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("OurWork Data not found");
  }

  return result;
};

// Export the OurWork Works as an object for use in other parts of the application
export const OurWorks = {
  createOurWorkIntoDB,
  getAllOurWorkFromDB,
  getSingleOurWorkFromDB,
  updateOurWorkInDB,
  deleteOurWorkFromDB,
};
