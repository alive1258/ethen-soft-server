import { z } from "zod";

// Zod schema for HomeAbout
const createHomeAboutValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    image: z.string(),
    description: z.string().trim().min(1, "Description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
  }),
});
const updateHomeAboutValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    image: z.string(),
    description: z.string().trim().min(1, "Description is required"),
    sub_description: z.string().trim().min(1, "sub_description is required"),
  }),
});

export const HomeAboutValidation = {
  createHomeAboutValidationSchema,
  updateHomeAboutValidationSchema,
};
