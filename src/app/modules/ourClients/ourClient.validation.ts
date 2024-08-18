import { z } from "zod";

// Zod schema for OurClient
const createOurClientValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "name is required"),
    image: z.string(),
  }),
});
const updateOurClientValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "name is required"),
    image: z.string(),
  }),
});

export const OurClientValidation = {
  createOurClientValidationSchema,
  updateOurClientValidationSchema,
};
