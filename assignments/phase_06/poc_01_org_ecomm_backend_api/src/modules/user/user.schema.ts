import { email, z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),

  phone: z
    .string()
    .max(10, "Phone number cannot exceed 10 characters")
    .min(10, "Phone number must be at least 10 characters")
    .transform((phone: string) => phone.replace(/[^0-9]/g, ""))
    .optional(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
