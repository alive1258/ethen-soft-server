import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";
import { TCustomer } from "../customers/customer.interface";

export interface TClientReview {
  review: string;
  rating: string;
  serviceId: Types.ObjectId | TService;
  customerId: Types.ObjectId | TCustomer;
}

export type ClientReviewModel = Model<TClientReview, Record<string, unknown>>;

export type TClientReviewFilters = {
  searchTerm?: string;
  serviceId?: string;
  customerId?: string;
};
