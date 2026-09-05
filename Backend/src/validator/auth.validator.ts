import { z } from "zod";
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
    .refine((val) => validator.isMobilePhone(val), {
      message: "Please provide a valid mobile phone number",
    }),
  password: z.string().trim().min(4, "password must be at least 4"),
  role: z.enum(["buyer", "seller"]).default("buyer"),
});
