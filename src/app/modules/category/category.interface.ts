import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

// declared category type
export type TCategory = {
  id?: Types.ObjectId;
  title: string;
  slug: string;
  subDescription: string;
  logo: string;
  metaKey: string;
  metaDescription: string;
  service: string | TService;
};

// created model for using method or statics
export type CategoryModel = Model<TCategory, Record<string, unknown>>;

// defined the category filters params

export type TCategoryFilters = {
  searchTerm?: string;
  name?: string;
  title?: string;
  service?: string;
};
