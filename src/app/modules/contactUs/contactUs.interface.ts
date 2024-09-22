import { Model } from "mongoose";

export interface TContactUs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactUsModel = Model<TContactUs, Record<string, unknown>>;

export type TContactUsFilters = {
  searchTerm?: string;
  name?: string;
};
