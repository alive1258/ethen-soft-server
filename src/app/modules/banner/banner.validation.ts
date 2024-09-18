import { z } from "zod";

// Zod schema for Banner
const createBannerValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must only contain lowercase letters, numbers, and hyphens"
      ),
    image: z.string().url("Image must be a valid URL"),
  }),
});

const updateBannerValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must only contain lowercase letters, numbers, and hyphens"
      ),
    image: z.string().url("Image must be a valid URL"),
  }),
});

export const BannerValidation = {
  createBannerValidationSchema,
  updateBannerValidationSchema,
};
