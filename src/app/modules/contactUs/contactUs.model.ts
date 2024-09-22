import { model, Schema } from "mongoose";
import { ContactUsModel, TContactUs } from "./contactUs.interface";

const contactUsSchema = new Schema<TContactUs, ContactUsModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactUs = model<TContactUs, ContactUsModel>(
  "ContactUs",
  contactUsSchema
);
