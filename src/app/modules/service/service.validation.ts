import { z } from "zod";

// Zod schema for Hero
const createServiceSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).trim(),
    title: z.string({ required_error: "Title is required" }).trim(),
    description: z.string({ required_error: "Description is required" }).trim(),
    slug: z.string({ required_error: "Slug is required" }).trim(),
    logo: z.string({ required_error: "Logo is required" }).trim(),
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
