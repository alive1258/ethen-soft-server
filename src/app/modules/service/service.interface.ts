import { Model, Types } from "mongoose";

// defined the type of service
export type TService = {
  id?: Types.ObjectId;
  name: string;
  title: string;
  slug: string;
  description: string;
  logo: string;
};

// created a model for useing method and statics
export type ServiceModel = Model<TService, Record<string, unknown>>;

export type TServiceFilters = {
  searchTerm?: string;
  name?: string;
  title?: string;
};
