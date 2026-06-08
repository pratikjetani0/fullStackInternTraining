import z from "zod";

//REGISTER SCHEMA
export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),

  email: z
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

//LOGIN SCHEMA
export const loginSchema = z.object({
  email: z.email("Invalid email format"),

  password: z.string().min(1, "Password is required"),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
