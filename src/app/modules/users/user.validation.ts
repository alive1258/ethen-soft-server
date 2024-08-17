import { z } from "zod";

// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can't be more than 20 characters"),
  middleName: z
    .string()
    .trim()
    .max(20, "Middle name can't be more than 20 characters")
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(20, "Last name can't be more than 20 characters"),
});

// Zod schema for User
const createUserValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    name: userNameValidationSchema,
    password: z.string().min(6, "Password is required"),
    contactNo: z.string().min(1, "Contact number is required"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Invalid gender" }),
    }),
    email: z.string().trim().email("Invalid email format"),
    profileImage: z.string().optional(),
    isDeleted: z.boolean(),
  }),
});
// Zod schema for User
const updateUserValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    name: userNameValidationSchema,
    password: z.string().min(6, "Password is required"),
    contactNo: z.string().min(1, "Contact number is required"),
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Invalid gender" }),
    }),
    email: z.string().trim().email("Invalid email format"),
    profileImage: z.string().optional(),
    isDeleted: z.boolean(),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
