import { z } from "zod";

// Zod schema for Service Image
const createServiceImageSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    image: z.string().trim().min(1, "Image is required"),
    service: z.string().trim().min(1, "Service ID is required"),
  }),
});
const updateServiceImageSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    service: z.string().optional(),
  }),
});

export const ServiceImageValidation = {
  createServiceImageSchema,
  updateServiceImageSchema,
};
