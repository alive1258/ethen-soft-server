import { z } from "zod";

// Zod schema for Hero
const createServiceSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).trim(),
    description: z.string({ required_error: "Description is required" }).trim(),
    subDescription: z
      .string({ required_error: "Sub description is required" })
      .trim(),
    metaKey: z.string({ required_error: "Meta key is required" }).trim(),
    metaDescription: z
      .string({ required_error: "Meta description is required" })
      .trim(),
    slug: z.string({ required_error: "Slug is required" }).trim(),
    logo: z
      .string({ required_error: "Logo is required" })
      .trim()
      .url({ message: "Logo must be a valid URL" })
      .refine((val) => /\.(jpg|jpeg|png|gif|svg)$/.test(val), {
        message:
          "Logo must be a valid image URL (.jpg, .jpeg, .png, .gif, .svg)",
      }),
    colorCode: z.string({ required_error: "Color code is required" }).trim(),
  }),
});
const updateServiceSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    logo: z.string().optional(),
    subDescription: z.string().optional(),
    metaKey: z.string().optional(),
    metaDescription: z.string().optional(),
    colorCode: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createServiceSchema,
  updateServiceSchema,
};
