import { z } from "zod";

// Zod schema for Hero
const createTermsConditionValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    image: z.string(),
    description: z.string().trim().min(1, "Description is required"),
  }),
});
const updateTermsConditionValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    image: z.string(),
    description: z.string().trim().min(1, "Description is required"),
  }),
});

export const TermsConditionValidation = {
  createTermsConditionValidationSchema,
  updateTermsConditionValidationSchema,
};
