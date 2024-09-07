import { z } from "zod";

// Zod schema for Hero
const createServiceSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    slug: z.string().trim().min(1, "Slug is required"),
    logo: z.string().trim().min(1, "Logo is required"),
  }),
});
const updateServiceSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    logo: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createServiceSchema,
  updateServiceSchema,
};
