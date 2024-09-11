import { z } from "zod";

// Zod schema for Hero
const createServiceFAQValidationSchema = z.object({
  body: z.object({
    question: z.string().trim().min(1, "Question is required"),
    answer: z.string().trim().min(1, "Answer is required"),
    service: z.string().trim().min(1, "Service ID is required"),
  }),
});
const updateServiceFAQValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    service: z.string().optional(),
  }),
});

export const ServiceFAQValidation = {
  createServiceFAQValidationSchema,
  updateServiceFAQValidationSchema,
};
