import { z } from "zod";

// Zod schema for Hero
const createPricingValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    price: z.string({ required_error: "Price is required" }),
    service: z.string({ required_error: "Service ID is required" }),
    pricingCategory: z.string({
      required_error: "PricingCategory ID is required",
    }),
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
