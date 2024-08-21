import { TPrivacyPolicy } from "./privacyPolicy.interface";
import { PrivacyPolicy } from "./privacyPolicy.module";

// Service to create a new PrivacyPolicy in the database
const createPrivacyPolicyIntoDB = async (heroData: TPrivacyPolicy) => {
  const result = await PrivacyPolicy.create(heroData);

  return result;
};

// Service to retrieve all PrivacyPolicy from the database
const getAllPrivacyPolicyFromDB = async () => {
  const result = await PrivacyPolicy.find();
  return result;
};

// Service to retrieve a single PrivacyPolicy from the database by ID
const getSinglePrivacyPolicyFromDB = async (_id: string) => {
  const result = await PrivacyPolicy.findOne({ _id });
  return result;
};

// Service to update a PrivacyPolicy in the database by ID
const updatePrivacyPolicyInDB = async (
  _id: string,
  updateData: Partial<TPrivacyPolicy>
) => {
  const result = await PrivacyPolicy.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("PrivacyPolicy Data not found");
  }

  return result;
};

// Service to delete a PrivacyPolicy from the database by ID
const deletePrivacyPolicyFromDB = async (_id: string) => {
  const result = await PrivacyPolicy.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("PrivacyPolicy Data not found");
  }

  return result;
};

// Export the PrivacyPolicy services as an object for use in other parts of the application
export const PrivacyPolicyServices = {
  createPrivacyPolicyIntoDB,
  getAllPrivacyPolicyFromDB,
  getSinglePrivacyPolicyFromDB,
  updatePrivacyPolicyInDB,
  deletePrivacyPolicyFromDB,
};
