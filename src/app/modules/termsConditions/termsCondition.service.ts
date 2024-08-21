import { TTermsCondition } from "./termsCondition.interface";
import { TermsCondition } from "./termsCondition.module";

// Service to create a new TermsCondition in the database
const createTermsConditionIntoDB = async (heroData: TTermsCondition) => {
  const result = await TermsCondition.create(heroData);

  return result;
};

// Service to retrieve all TermsCondition from the database
const getAllTermsConditionFromDB = async () => {
  const result = await TermsCondition.find();
  return result;
};

// Service to retrieve a single TermsCondition from the database by ID
const getSingleTermsConditionFromDB = async (_id: string) => {
  const result = await TermsCondition.findOne({ _id });
  return result;
};

// Service to update a TermsCondition in the database by ID
const updateTermsConditionInDB = async (
  _id: string,
  updateData: Partial<TTermsCondition>
) => {
  const result = await TermsCondition.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("TermsCondition Data not found");
  }

  return result;
};

// Service to delete a TermsCondition from the database by ID
const deleteTermsConditionFromDB = async (_id: string) => {
  const result = await TermsCondition.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("TermsCondition Data not found");
  }

  return result;
};

// Export the TermsCondition services as an object for use in other parts of the application
export const TermsConditionServices = {
  createTermsConditionIntoDB,
  getAllTermsConditionFromDB,
  getSingleTermsConditionFromDB,
  updateTermsConditionInDB,
  deleteTermsConditionFromDB,
};
