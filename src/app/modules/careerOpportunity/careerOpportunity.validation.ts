import { z } from "zod";

// Zod schema for CareerOpportunity
const createCareerOpportunityValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
    position: z.string(),
    image: z.string(),
  }),
});
const updateCareerOpportunityValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
    position: z.string(),
    image: z.string(),
  }),
});

export const CareerOpportunityValidation = {
  createCareerOpportunityValidationSchema,
  updateCareerOpportunityValidationSchema,
};
