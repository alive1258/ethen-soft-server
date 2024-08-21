import { TOurDeal } from "./ourDeal.interface";
import { OurDeal } from "./ourDeal.module";

// Deal to create a new OurDeal in the database
const createOurDealIntoDB = async (OurDealData: TOurDeal) => {
  const result = await OurDeal.create(OurDealData);

  return result;
};

// Deal to retrieve all OurDeal from the database
const getAllOurDealFromDB = async () => {
  const result = await OurDeal.find();
  return result;
};

// Deal to retrieve a single OurDeal from the database by ID
const getSingleOurDealFromDB = async (_id: string) => {
  const result = await OurDeal.findOne({ _id });
  return result;
};

// Deal to update a OurDeal in the database by ID
const updateOurDealInDB = async (
  _id: string,
  updateData: Partial<TOurDeal>
) => {
  const result = await OurDeal.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("OurDeal Data not found");
  }

  return result;
};

// Deal to delete a OurDeal from the database by ID
const deleteOurDealFromDB = async (_id: string) => {
  const result = await OurDeal.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("OurDeal Data not found");
  }

  return result;
};

// Export the OurDeal services as an object for use in other parts of the application
export const OurDeals = {
  createOurDealIntoDB,
  getAllOurDealFromDB,
  getSingleOurDealFromDB,
  updateOurDealInDB,
  deleteOurDealFromDB,
};
