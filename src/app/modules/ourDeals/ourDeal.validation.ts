import { z } from "zod";

// Zod schema for OurDeal
const createOurDealValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    deal: z.string().trim().min(1, "deal is required"),
    color_code: z.string(),
    image: z.string(),
  }),
});
const updateOurDealValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    deal: z.string().trim().min(1, "deal is required"),
    color_code: z.string(),
    image: z.string(),
  }),
});

export const OurDealValidation = {
  createOurDealValidationSchema,
  updateOurDealValidationSchema,
};
