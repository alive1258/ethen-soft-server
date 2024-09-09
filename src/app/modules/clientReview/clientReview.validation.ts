import { z } from "zod";

// Zod schema for Hero
const createClientReviewValidationSchema = z.object({
  body: z.object({
    review: z.string().trim().min(1, "Review is required"),
    rating: z.string().trim().min(1, "Rating is required"),
    service: z.string().trim().min(1, "Service ID is required"),
    customer: z.string().trim().min(1, "Customer ID is required"),
  }),
});
const updateClientReviewValidationSchema = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.string().optional(),
    service: z.string().optional(),
    customer: z.string().optional(),
  }),
});

export const ClientReviewValidation = {
  createClientReviewValidationSchema,
  updateClientReviewValidationSchema,
};
