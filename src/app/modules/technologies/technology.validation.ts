import { z } from "zod";

// Zod schema for Technology
const createTechnologyValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    image: z.string().url("Image must be a valid URL"),
  }),
});

const updateTechnologyValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
  }),
});

export const TechnologyValidation = {
  createTechnologyValidationSchema,
  updateTechnologyValidationSchema,
};
