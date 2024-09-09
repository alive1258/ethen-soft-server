import { z } from "zod";

// Zod schema for Hero
const createPricingFeatureValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
  }),
});
const updatePricingFeatureValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
  }),
});

export const PricingFeatureValidation = {
  createPricingFeatureValidationSchema,
  updatePricingFeatureValidationSchema,
};
