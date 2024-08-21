import { TOurProduct } from "./ourProduct.interface";
import { OurProduct } from "./ourProduct.module";

// Product to create a new OurProduct in the database
const createOurProductIntoDB = async (OurProductData: TOurProduct) => {
  const result = await OurProduct.create(OurProductData);

  return result;
};

// Product to retrieve all OurProduct from the database
const getAllOurProductFromDB = async () => {
  const result = await OurProduct.find();
  return result;
};

// Product to retrieve a single OurProduct from the database by ID
const getSingleOurProductFromDB = async (_id: string) => {
  const result = await OurProduct.findOne({ _id });
  return result;
};

// Product to update a OurProduct in the database by ID
const updateOurProductInDB = async (
  _id: string,
  updateData: Partial<TOurProduct>
) => {
  const result = await OurProduct.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("OurProduct Data not found");
  }

  return result;
};

// Product to delete a OurProduct from the database by ID
const deleteOurProductFromDB = async (_id: string) => {
  const result = await OurProduct.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("OurProduct Data not found");
  }

  return result;
};

// Export the OurProduct Products as an object for use in other parts of the application
export const OurProducts = {
  createOurProductIntoDB,
  getAllOurProductFromDB,
  getSingleOurProductFromDB,
  updateOurProductInDB,
  deleteOurProductFromDB,
};
