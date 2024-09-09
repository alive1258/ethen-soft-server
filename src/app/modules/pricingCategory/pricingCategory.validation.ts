import { z } from "zod";

// Zod schema for Hero
const createPricingCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
  }),
});
const updatePricingCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
  }),
});

export const PricingCategoryValidation = {
  createPricingCategoryValidationSchema,
  updatePricingCategoryValidationSchema,
};
