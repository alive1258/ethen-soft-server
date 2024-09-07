import { z } from "zod";

// zod schema for create category
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    logo: z.string().trim().min(1, "Logo is required"),
    service: z.string().trim().min(1, "Service ID is required"),
  }),
});

// zod schema for update category
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(),
    service: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
