import { api } from "../../../services/axios";

export const simulatePayment = async (orderId: string) => {
  const response = await api.post("/payments/simulate", {
    orderId,
    success: true,
  });

  return response.data;
};
