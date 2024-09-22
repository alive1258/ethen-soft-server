import { z } from "zod";

// Zod schema for OurWork
const createOurWorkValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must only contain lowercase letters, numbers, and hyphens"
      ),
    type: z.string().trim().min(1, "type is required"),
    description: z.string().trim().min(1, "description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
    meta_description: z.string().trim().min(1, "sub_description is required"),
    meta_key: z.string().trim().min(1, "sub_description is required"),
    tech: z.string(),
    image: z.string(),
  }),
});
const updateOurWorkValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must only contain lowercase letters, numbers, and hyphens"
      ),
    type: z.string().trim().min(1, "type is required"),
    description: z.string().trim().min(1, "description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
    meta_description: z.string().trim().min(1, "sub_description is required"),
    meta_key: z.string().trim().min(1, "sub_description is required"),
    tech: z.string(),
    image: z.string(),
  }),
});

export const OurWorkValidation = {
  createOurWorkValidationSchema,
  updateOurWorkValidationSchema,
};
