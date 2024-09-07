import { z } from "zod";

// Zod schema for Hero
const createPricingValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    price: z.string().trim().min(1, "Price is required"),
    service: z.string().trim().min(1, "Service ID is required"),
    pricingCategory: z.string().trim().min(1, "PricingCategory ID is required"),
  }),
});
const updatePricingValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.string().optional(),
  }),
});

export const PricingValidation = {
  createPricingValidationSchema,
  updatePricingValidationSchema,
};
