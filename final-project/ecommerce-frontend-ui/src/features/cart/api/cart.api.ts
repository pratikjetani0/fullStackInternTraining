import { api } from "../../../services/axios";
import type { Cart } from "../types/cart.types";


export const getCart = async (): Promise<Cart> => {
  const response = await api.get("/cart");

  return response.data;
};

export const addToCart = async (productId: string, quantity = 1) => {
  const response = await api.post("/cart/items", {
    productId,
    quantity,
  });

  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.patch(`/cart/items/${productId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartItem = async (productId: string) => {
  const response = await api.delete(`/cart/items/${productId}`);

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/clear");

  return response.data;
};
