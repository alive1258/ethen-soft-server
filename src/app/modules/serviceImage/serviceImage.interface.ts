import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

export interface TServiceImage {
  _id?: Types.ObjectId;
  title: string;
  image: string;
  service: string | TService;
}

export type ServiceImageModel = Model<TServiceImage, Record<string, unknown>>;

export type TServiceImageFilters = {
  searchTerm?: string;
  name?: string;
  title?: string;
};
