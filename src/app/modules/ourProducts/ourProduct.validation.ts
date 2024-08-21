import { z } from "zod";

// Zod schema for OurProduct
const createOurProductValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    sub_title: z.string().trim().min(1, "sub_title is required"),
    description: z.string().trim().min(1, "sub_title is required"),
    tech: z.string(),
    image: z.string(),
  }),
});
const updateOurProductValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    sub_title: z.string().trim().min(1, "sub_title is required"),
    description: z.string().trim().min(1, "description is required"),
    tech: z.string(),
    image: z.string(),
  }),
});

export const OurProductValidation = {
  createOurProductValidationSchema,
  updateOurProductValidationSchema,
};
