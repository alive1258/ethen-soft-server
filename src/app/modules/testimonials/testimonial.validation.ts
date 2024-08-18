import { z } from "zod";

// Zod schema for Hero
const createTestimonialValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Title is required"),
    image: z.string(),
    rating: z.number(),
    description: z.string().trim().min(1, "Description is required"),
    profession: z.string().trim().min(1, "profession is required"),
  }),
});
const updateTestimonialValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Title is required"),
    image: z.string(),
    rating: z.number(),
    description: z.string().trim().min(1, "Description is required"),
    profession: z.string().trim().min(1, "profession is required"),
  }),
});

export const TestimonialValidation = {
  createTestimonialValidationSchema,
  updateTestimonialValidationSchema,
};
