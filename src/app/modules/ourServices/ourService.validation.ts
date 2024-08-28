import { z } from "zod";

// Zod schema for OurService
const createOurServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    slug: z.string().trim().min(1, "slug is required"),
    description: z.string().trim().min(1, "description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
    icon: z.string(),
    color_code: z.string(),
    meta_key: z.string().optional(),
    meta_description: z.string().optional(),
    image: z.string(),
  }),
});
const updateOurServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    slug: z.string().trim().min(1, "slug is required"),
    description: z.string().trim().min(1, "description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
    icon: z.string(),
    color_code: z.string(),
    meta_key: z.string().optional(),
    meta_description: z.string().optional(),
    image: z.string(),
  }),
});

export const OurServiceValidation = {
  createOurServiceValidationSchema,
  updateOurServiceValidationSchema,
};
