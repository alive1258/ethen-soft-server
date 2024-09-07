import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TClientReview, TClientReviewFilters } from "./clientReview.interface";
import { ClientReview } from "./clientReview.model";
import { TPaginationOptions } from "../../../interfaces/pagination";
import { TGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { clientReviewSearchableFields } from "./clientReview.constant";
import { SortOrder } from "mongoose";

// Service to create a new client review  in the database
const createClientReviewIntoDB = async (
  data: TClientReview
): Promise<TClientReview> => {
  const result = await ClientReview.create(data);

  return result;
};

// Service to retrieve all client review  from the database
const getAllClientReviewFromDB = async (
  filters: TClientReviewFilters,
  paginationOptions: TPaginationOptions
): Promise<TGenericResponse<TClientReview[]>> => {
  // destructuring filters
  const { searchTerm, serviceId, customerId, ...filtersData } = filters;

  //   destructuring all pagination dependencies
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //andConditions used for containing all query to get data from database
  const andConditions: any[] = [];

  // Search term filter (e.g., for name or email)
  if (searchTerm) {
    andConditions.push({
      $or: clientReviewSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filtering with service id
  if (serviceId) {
    andConditions.push({
      $and: { "service._id": serviceId },
    });
  }

  // filtering with customer id
  if (customerId) {
    andConditions.push({
      $and: { "customer._id": customerId },
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

  // find  clients review data from database
  const result = await ClientReview.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .exec();

  // count client review data from database
  const total = await ClientReview.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Service to retrieve a single client review  from the database by ID
const getSingleClientReviewFromDB = async (
  _id: string
): Promise<TClientReview | null> => {
  const result = await ClientReview.findOne({ _id })
    .populate("service")
    .populate("customer");

  return result;
};

// Service to update a client review  in the database by ID
const updateClientReviewInDB = async (
  _id: string,
  updateData: Partial<TClientReview>
): Promise<TClientReview> => {
  const result = await ClientReview.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Client review  Data not found");
  }

  return result;
};

// Service to delete a client review  from the database by ID
const deleteClientReviewFromDB = async (_id: string) => {
  const result = await ClientReview.findByIdAndDelete(_id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Client review Data not found");
  }

  return result;
};

// Export the client review  services as an object for use in other parts of the application
export const ClientReviewServices = {
  createClientReviewIntoDB,
  getAllClientReviewFromDB,
  getSingleClientReviewFromDB,
  updateClientReviewInDB,
  deleteClientReviewFromDB,
};
