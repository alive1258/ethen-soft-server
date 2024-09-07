import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

// declared category type
export type TCategory = {
  id?: Types.ObjectId;
  name: string;
  title: string;
  description: string;
  logo: string;
  service: Types.ObjectId | TService;
};

// created model for using method or statics
export type CategoryModel = Model<TCategory, Record<string, unknown>>;
