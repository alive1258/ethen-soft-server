import { TCareerOpportunity } from "./careerOpportunity.interface";
import { CareerOpportunity } from "./careerOpportunity.module";

// Service to create a new CareerOpportunity in the database
const createCareerOpportunityIntoDB = async (
  CareerOpportunityData: TCareerOpportunity
) => {
  const result = await CareerOpportunity.create(CareerOpportunityData);

  return result;
};

// Service to retrieve all CareerOpportunity from the database
const getAllCareerOpportunityFromDB = async () => {
  const result = await CareerOpportunity.find();
  return result;
};

// Service to retrieve a single CareerOpportunity from the database by ID
const getSingleCareerOpportunityFromDB = async (_id: string) => {
  const result = await CareerOpportunity.findOne({ _id });
  return result;
};

// Service to update a CareerOpportunity in the database by ID
const updateCareerOpportunityInDB = async (
  _id: string,
  updateData: Partial<TCareerOpportunity>
) => {
  const result = await CareerOpportunity.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("CareerOpportunity Data not found");
  }

  return result;
};

// Service to delete a CareerOpportunity from the database by ID
const deleteCareerOpportunityFromDB = async (_id: string) => {
  const result = await CareerOpportunity.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("CareerOpportunity Data not found");
  }

  return result;
};

// Export the CareerOpportunity services as an object for use in other parts of the application
export const CareerOpportunities = {
  createCareerOpportunityIntoDB,
  getAllCareerOpportunityFromDB,
  getSingleCareerOpportunityFromDB,
  updateCareerOpportunityInDB,
  deleteCareerOpportunityFromDB,
};
