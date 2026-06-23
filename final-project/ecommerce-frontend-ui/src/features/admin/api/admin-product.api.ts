import { api } from "../../../services/axios";

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

export const createProduct = async (data: any) => {
  const response = await api.post("/products", data);

  return response.data;
};

export const updateProduct = async (id: string, data: any) => {
  const response = await api.patch(`/products/${id}`, data);

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};
