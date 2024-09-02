import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TProfessionalService } from "./professionalService.interface";
import { ProfessionalService } from "./professionalService.module";

// Service to create a new ProfessionalService in the database
const createProfessionalServiceIntoDB = async (
  ProfessionalServiceData: TProfessionalService
) => {
  const result = await ProfessionalService.create(ProfessionalServiceData);

  return result;
};

// Service to retrieve all ProfessionalService from the database
const getAllProfessionalServiceFromDB = async () => {
  const result = await ProfessionalService.find();
  return result;
};

// Service to retrieve a single ProfessionalService from the database by ID
const getSingleProfessionalServiceFromDB = async (_id: string) => {
  const result = await ProfessionalService.findOne({ _id });
  return result;
};

// Service to update a ProfessionalService in the database by ID
const updateProfessionalServiceInDB = async (
  _id: string,
  updateData: Partial<TProfessionalService>
) => {
  const result = await ProfessionalService.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "ProfessionalService Data not found"
    );
  }

  return result;
};

// Service to delete a ProfessionalService from the database by ID
const deleteProfessionalServiceFromDB = async (_id: string) => {
  const result = await ProfessionalService.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "ProfessionalService Data not found"
    );
  }

  return result;
};

// Export the ProfessionalService services as an object for use in other parts of the application
export const ProfessionalServices = {
  createProfessionalServiceIntoDB,
  getAllProfessionalServiceFromDB,
  getSingleProfessionalServiceFromDB,
  updateProfessionalServiceInDB,
  deleteProfessionalServiceFromDB,
};
