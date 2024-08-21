import { z } from "zod";

// Zod schema for CompanyGallery
const createCompanyGalleryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    image: z.string().url("Image must be a valid URL"),
  }),
});

const updateCompanyGalleryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    image: z.string().url("Image must be a valid URL"),
  }),
});

export const CompanyGalleryValidation = {
  createCompanyGalleryValidationSchema,
  updateCompanyGalleryValidationSchema,
};
