import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required").max(255),

  description: z.string().trim().min(1, "Description is required"),

  price: z.number().positive("Price must be greater than 0"),

  stock: z.number().int().min(0, "Stock cannot be negative"),

  imageUrl: z.string().optional(),

  isActive: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
