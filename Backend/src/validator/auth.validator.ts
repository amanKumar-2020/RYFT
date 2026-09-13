import { email, optional, z } from "zod";
import validator from "validator";

export const validateRegister = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "name must be at least than 2")
    .max(30, "name should be less than 30"),
  email: z.email("Invalid email address").trim(),
  contact: z
    .string()
    .trim()
    .refine((val) => validator.isMobilePhone(val, "en-IN"), {
      message: "Please provide a valid Indian mobile number",
    }),
  password: z.string().trim().min(4, "password must be at least 4"),
  isSeller: z.boolean().default(false),
});

export const validateLogin = z
  .object({
    email: z.email("Invalid Email").trim().optional(),
    contact: z.string().trim().optional(),
    password: z.string().trim().min(4, "password must be at least 4"),
  })
  .refine(
    (data) => {
      return !!data.email || !!data.contact;
    },
    {
      message: "You must provide either an email or a phone number",
      path: ["email"], 
    },
  );