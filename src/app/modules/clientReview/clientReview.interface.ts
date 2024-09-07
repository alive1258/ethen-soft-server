import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";
import { TCustomer } from "../customers/customer.interface";

export interface TClientReview {
  _id?: Types.ObjectId;
  review: string;
  rating: string;
  isVerified: boolean;
  service: string | TService;
  customer: string | TCustomer;
}

export type ClientReviewModel = Model<TClientReview, Record<string, unknown>>;

export type TClientReviewFilters = {
  searchTerm?: string;
  service?: string;
  customer?: string;
};
