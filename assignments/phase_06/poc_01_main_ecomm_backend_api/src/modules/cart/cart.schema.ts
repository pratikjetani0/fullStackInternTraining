import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.uuid("Invalid product id"),

  quantity: z.number().int().positive("Quantity must be greater than 0"),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive("Quantity must be greater than 0"),
});

export type AddToCartDto = z.infer<typeof addToCartSchema>;
export type UpdateCartItemDto = z.infer<typeof updateCartItemSchema>;
