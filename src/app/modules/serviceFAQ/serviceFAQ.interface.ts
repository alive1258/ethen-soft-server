import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

export interface TServiceFAQ {
  _id?: Types.ObjectId;
  question: string;
  answer: string;
  service: string | TService;
  isVerified: boolean;
}

export type serviceFAQModel = Model<TServiceFAQ, Record<string, unknown>>;

export interface TServiceFAQFilters {
  searchTerm?: string;
  question?: string;
  answer?: string;
  service?: string;
}
