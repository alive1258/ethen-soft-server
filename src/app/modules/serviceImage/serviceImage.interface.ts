import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

export interface TServiceImage {
  _id?: Types.ObjectId;
  title: string;
  image: string;
  serviceId: Types.ObjectId | TService;
}

export type ServiceImageModel = Model<TServiceImage, Record<string, unknown>>;

export type TServiceImageFilters = {
  searchTerm?: string;
  name?: string;
  title?: string;
};
