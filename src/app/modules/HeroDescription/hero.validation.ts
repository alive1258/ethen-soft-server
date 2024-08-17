import { z } from "zod";

// Zod schema for Hero
const createHeroValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
  }),
});
const updateHeroValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
  }),
});

export const HeroValidation = {
  createHeroValidationSchema,
  updateHeroValidationSchema,
};
