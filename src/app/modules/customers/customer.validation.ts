import { z } from "zod";

// Zod schema for creating a Customer
const createCustomerValidationSchema = z.object({
  body: z.object({
    id: z.string().trim().min(1, "ID is required"),
    name: z.object({
      firstName: z.string().trim().min(1, "First name is required"),
      middleName: z.string().trim().optional(),
      lastName: z.string().trim().min(1, "Last name is required"),
    }),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({
        message: "Gender must be 'male', 'female', or 'other'",
      }),
    }),
    email: z.string().trim().email("Invalid email address"),
    isEmailVerified: z.boolean().optional(),
    contactNo: z
      .string()
      .trim()
      .min(10, "Contact number must be at least 10 digits"),
    profileImage: z.string().trim().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

// Zod schema for updating a Customer
const updateCustomerValidationSchema = z.object({
  body: z.object({
    id: z.string().trim().min(1, "ID is required").optional(),
    name: z
      .object({
        firstName: z
          .string()
          .trim()
          .min(1, "First name is required")
          .optional(),
        middleName: z.string().trim().optional(),
        lastName: z.string().trim().min(1, "Last name is required").optional(),
      })
      .optional(),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    gender: z
      .enum(["male", "female", "other"], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'",
        }),
      })
      .optional(),
    email: z.string().trim().email("Invalid email address").optional(),
    isEmailVerified: z.boolean().optional(),
    contactNo: z
      .string()
      .trim()
      .min(10, "Contact number must be at least 10 digits")
      .optional(),
    profileImage: z.string().trim().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CustomerValidation = {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
};
