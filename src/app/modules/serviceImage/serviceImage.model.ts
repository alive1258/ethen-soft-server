import mongoose, { model, Schema } from "mongoose";
import { ServiceImageModel, TServiceImage } from "./serviceImage.interface";

const serviceImageSchema = new Schema<TServiceImage, ServiceImageModel>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceImage = model<TServiceImage, ServiceImageModel>(
  "ServiceImage",
  serviceImageSchema
);
