import { TOurService } from "./ourService.interface";
import { OurService } from "./ourService.module";

// Service to create a new OurService in the database
const createOurServiceIntoDB = async (OurServiceData: TOurService) => {
  const result = await OurService.create(OurServiceData);

  return result;
};

// Service to retrieve all OurService from the database
const getAllOurServiceFromDB = async () => {
  const result = await OurService.find();
  return result;
};

// Service to retrieve a single OurService from the database by ID
const getSingleOurServiceFromDB = async (_id: string) => {
  const result = await OurService.findOne({ _id });
  return result;
};

// Service to update a OurService in the database by ID
const updateOurServiceInDB = async (
  _id: string,
  updateData: Partial<TOurService>
) => {
  const result = await OurService.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("OurService Data not found");
  }

  return result;
};

// Service to delete a OurService from the database by ID
const deleteOurServiceFromDB = async (_id: string) => {
  const result = await OurService.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("OurService Data not found");
  }

  return result;
};

// Export the OurService services as an object for use in other parts of the application
export const OurServices = {
  createOurServiceIntoDB,
  getAllOurServiceFromDB,
  getSingleOurServiceFromDB,
  updateOurServiceInDB,
  deleteOurServiceFromDB,
};
