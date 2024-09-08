import { Model, Types } from "mongoose";

// defined the type of service
export type TService = {
  id?: Types.ObjectId;
  title: string;
  logo: string;
  slug: string;
  description: string;
  subDescription: string;
  colorCode: string;
  metaDescription: string;
  metaKey: string;
};

// created a model for using method and statics
export type ServiceModel = Model<TService, Record<string, unknown>>;

export type TServiceFilters = {
  searchTerm?: string;
  name?: string;
  title?: string;
};
