import { TBanner } from "./banner.interface";
import { Banner } from "./bannner.module";

// Service to create a new Banner in the database
const createBannerIntoDB = async (heroData: TBanner) => {
  const result = await Banner.create(heroData);

  return result;
};

// Service to retrieve all Banner from the database
const getAllBannerFromDB = async () => {
  const result = await Banner.find();
  return result;
};

// Service to retrieve a single Banner from the database by ID
const getSingleBannerFromDB = async (_id: string) => {
  const result = await Banner.findOne({ _id });
  return result;
};

// Service to update a Banner in the database by ID
const updateBannerInDB = async (_id: string, updateData: Partial<TBanner>) => {
  const result = await Banner.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("Banner Data not found");
  }

  return result;
};

// Service to delete a Banner from the database by ID
const deleteBannerFromDB = async (_id: string) => {
  const result = await Banner.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("Hero Data not found");
  }

  return result;
};

// Export the hero services as an object for use in other parts of the application
export const BannerServices = {
  createBannerIntoDB,
  getAllBannerFromDB,
  getSingleBannerFromDB,
  updateBannerInDB,
  deleteBannerFromDB,
};
