import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TCompanyGallery } from "./companyGallery.interface";
import { CompanyGallery } from "./companyGallery.module";

// Service to create a new CompanyGallery in the database
const createCompanyGalleryIntoDB = async (heroData: TCompanyGallery) => {
  const result = await CompanyGallery.create(heroData);

  return result;
};

// Service to retrieve all CompanyGallery from the database
const getAllCompanyGalleryFromDB = async () => {
  const result = await CompanyGallery.find();
  return result;
};

// Service to retrieve a single CompanyGallery from the database by ID
const getSingleCompanyGalleryFromDB = async (_id: string) => {
  const result = await CompanyGallery.findOne({ _id });
  return result;
};

// Service to update a CompanyGallery in the database by ID
const updateCompanyGalleryInDB = async (
  _id: string,
  updateData: Partial<TCompanyGallery>
) => {
  const result = await CompanyGallery.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "CompanyGallery Data not found");
  }

  return result;
};

// Service to delete a CompanyGallery from the database by ID
const deleteCompanyGalleryFromDB = async (_id: string) => {
  const result = await CompanyGallery.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Hero Data not found");
  }

  return result;
};

// Export the hero services as an object for use in other parts of the application
export const TechServices = {
  createCompanyGalleryIntoDB,
  getAllCompanyGalleryFromDB,
  getSingleCompanyGalleryFromDB,
  updateCompanyGalleryInDB,
  deleteCompanyGalleryFromDB,
};
