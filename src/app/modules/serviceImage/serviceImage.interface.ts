import { Model, Types } from "mongoose";
import { TService } from "../service/service.interface";

export interface TServiceImage {
  _id: Types.ObjectId;
  title: string;
  image: string;
  serviceId: Types.ObjectId | TService;
}

export type ServiceImageModel = Model<TService, Record<string, unknown>>;
