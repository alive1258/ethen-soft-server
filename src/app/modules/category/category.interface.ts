import { Model, Types } from "mongoose";

// declared category type
export type TCategory = {
  id?: Types.ObjectId;
  name: string;
  title: string;
  description: string;
  logo: string;
  serviceId: Types.ObjectId;
};

// created model for using method or statics
export type CategoryModel = Model<TCategory, Record<string, unknown>>;
