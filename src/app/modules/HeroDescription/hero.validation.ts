import { z } from "zod";

// Zod schema for Hero
const createHeroValidationSchema = z.object({
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
    description: z.string().trim().min(1, "Description is required"),
  }),
});
const updateHeroValidationSchema = z.object({
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
    description: z.string().trim().min(1, "Description is required"),
  }),
});

export const HeroValidation = {
  createHeroValidationSchema,
  updateHeroValidationSchema,
};
