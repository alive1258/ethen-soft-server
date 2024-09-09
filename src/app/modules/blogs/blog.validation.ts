import { z } from "zod";

// Zod schema for blog
const createBlogValidationSchema = z.object({
  body: z.object({
    subject: z.string().trim().min(1, "subject is required"),
    title: z.string().trim().min(1, "title is required"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must only contain lowercase letters, numbers, and hyphens"
      ),
    image: z.string(),
    description: z.string().trim().min(1, "Description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    subject: z.string().trim().min(1, "subject is required"),
    title: z.string().trim().min(1, "title is required"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must only contain lowercase letters, numbers, and hyphens"
      ),
    image: z.string(),
    description: z.string().trim().min(1, "Description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
