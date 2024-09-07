import { z } from "zod";

// Zod schema for Hero
const createFeatureAssignedPricingValidationSchema = z.object({
  body: z.object({
    pricing: z.string({ required_error: "Pricing ID is required" }),
    pricingFeature: z.string({
      required_error: "Pricing feature ID is required",
    }),
  }),
});
const updateFeatureAssignedPricingValidationSchema = z.object({
  body: z.object({
    pricing: z.string().optional(),
    pricingFeature: z.string().optional(),
  }),
});

export const FeatureAssignedPricingValidation = {
  createFeatureAssignedPricingValidationSchema,
  updateFeatureAssignedPricingValidationSchema,
};
