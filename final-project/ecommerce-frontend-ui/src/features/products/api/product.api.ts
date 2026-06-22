import { api } from "../../../services/axios";
import type { Product } from "../types/product.type";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");

  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
