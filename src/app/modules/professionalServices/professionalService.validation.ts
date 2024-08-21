import { z } from "zod";

// Zod schema for ProfessionalService
const createProfessionalServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    service_one: z.string().trim().min(1, "service_one is required"),
    service_tow: z.string().trim().min(1, "service_tow is required"),
    service_three: z.string().trim().min(1, "service_tow is required"),
    service_four: z.string().trim().min(1, "service_tow is required"),
    color_code: z.string().trim().min(1, "service_tow is required"),
    image: z.string(),
  }),
});
const updateProfessionalServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z.string().trim().min(1, "description is required"),
    service_one: z.string().trim().min(1, "service_one is required"),
    service_tow: z.string().trim().min(1, "service_tow is required"),
    service_three: z.string().trim().min(1, "service_tow is required"),
    service_four: z.string().trim().min(1, "service_tow is required"),
    color_code: z.string().trim().min(1, "service_tow is required"),
    image: z.string(),
  }),
});

export const ProfessionalServiceValidation = {
  createProfessionalServiceValidationSchema,
  updateProfessionalServiceValidationSchema,
};
