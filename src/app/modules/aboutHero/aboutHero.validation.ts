import { z } from "zod";

// Zod schema for AboutHero
const createAboutHeroValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    service_one: z.string().trim().min(1, "service one is required"),
    service_two: z.string().trim().min(1, "service two is required"),
    service_three: z.string().trim().min(1, "service three is required"),
    service_four: z.string().trim().min(1, "service four is required"),
    service_five: z.string().optional(),
    image: z.string().trim().min(1, "image is required"),
  }),
});
const updateAboutHeroValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    service_one: z.string().trim().min(1, "service one is required"),
    service_two: z.string().trim().min(1, "service two is required"),
    service_three: z.string().trim().min(1, "service three is required"),
    service_four: z.string().trim().min(1, "service four is required"),
    service_five: z.string().optional(),
    image: z.string().trim().min(1, "image is required"),
  }),
});

export const AboutHeroValidation = {
  createAboutHeroValidationSchema,
  updateAboutHeroValidationSchema,
};
