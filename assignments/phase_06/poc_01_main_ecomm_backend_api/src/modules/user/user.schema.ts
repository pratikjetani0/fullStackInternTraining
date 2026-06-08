import { email, z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
