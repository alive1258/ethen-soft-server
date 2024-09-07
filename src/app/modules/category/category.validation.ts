import { z } from "zod";

// zod schema for create category
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    logo: z.string({ required_error: "Logo is required" }),
    service: z.string({ required_error: "Service ID is required" }),
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
