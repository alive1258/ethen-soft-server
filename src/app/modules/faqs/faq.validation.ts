import { z } from "zod";

// Zod schema for Faq
const createFaqValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "Description is required"),
  }),
});
const updateFaqValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "Description is required"),
  }),
});

export const FaqValidation = {
  createFaqValidationSchema,
  updateFaqValidationSchema,
};
