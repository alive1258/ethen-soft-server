import { Types } from "mongoose";

export type TService = {
  id?: Types.ObjectId;
  name: string;
  title: string;
  slug: string;
  description: string;
  logo: string;
};
