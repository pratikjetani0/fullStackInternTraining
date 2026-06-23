import { api } from "../../../services/axios";

export const createOrder = async () => {
  const response = await api.post("/orders");

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};
