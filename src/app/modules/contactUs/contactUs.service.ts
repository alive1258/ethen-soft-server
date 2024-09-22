import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { TGenericResponse } from "../../../interfaces/common";
import { TPaginationOptions } from "../../../interfaces/pagination";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TContactUs, TContactUsFilters } from "./contactUs.interface";
import { ContactUs } from "./contactUs.model";
import { contactUsSearchableFields } from "./contactUs.constant";

// Service to create a new contactUs in the database
const createContactUsIntoDB = async (data: TContactUs): Promise<TContactUs> => {
  const result = await ContactUs.create(data);

  return result;
};

// Service to retrieve all contactUs from the database
const getAllContactUsFromDB = async (
  filters: TContactUsFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TContactUs[]>> => {
  // destructuring filters
  const { searchTerm, ...filtersData } = filters;

  //   destructuring all pagination dependencies
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //andConditions used for containing all query to get data from database
  const andConditions: any[] = [];

  // Search term filter (e.g., for name or email)
  if (searchTerm) {
    andConditions.push({
      $or: contactUsSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Additional filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: `^${value}$`,
          $options: "i",
        },
      })),
    });
  }

  // Sorting conditions
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Applying conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // find  contactUs data from database
  const result = await ContactUs.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count contactUs data from database
  const total = await ContactUs.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single contactUs from the database by ID
const getSingleContactUsFromDB = async (
  _id: string
): Promise<TContactUs | null> => {
  const result = await ContactUs.findOne({ _id });
  return result;
};

// Service to update a contactUs in the database by ID
const updateContactUsInDB = async (
  _id: string,
  updateData: Partial<TContactUs>
): Promise<TContactUs> => {
  const result = await ContactUs.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
  }

  return result;
};

// Service to delete a contactUs from the database by ID
const deleteContactUsFromDB = async (_id: string) => {
  const result = await ContactUs.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data not found");
  }

  return result;
};

// Export the contactUs services as an object for use in other parts of the application
export const ContactUsServices = {
  createContactUsIntoDB,
  getAllContactUsFromDB,
  getSingleContactUsFromDB,
  updateContactUsInDB,
  deleteContactUsFromDB,
};
