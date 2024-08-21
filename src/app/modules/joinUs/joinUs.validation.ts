import { z } from "zod";

// Zod schema for Hero
const createJoinUsValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    image: z.string(),
    description: z.string().trim().min(1, "description is required"),
    color_code: z.string().trim().min(1, "color_code is required"),
  }),
});
const updateJoinUsValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    image: z.string(),
    description: z.string().trim().min(1, "description is required"),
    color_code: z.string().trim().min(1, "color_code is required"),
  }),
});

export const JoinUsValidation = {
  createJoinUsValidationSchema,
  updateJoinUsValidationSchema,
};
