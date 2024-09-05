import { z } from "zod";

// Zod schema for Banner
const createBannerValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    image: z.string().url("Image must be a valid URL"),
    slug: z.string().url("Image must be a valid URL"),
  }),
});

const updateBannerValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    slug: z.string().trim().min(1, "Name is required"),
    image: z.string().url("Image must be a valid URL"),
  }),
});

export const BannerValidation = {
  createBannerValidationSchema,
  updateBannerValidationSchema,
};
