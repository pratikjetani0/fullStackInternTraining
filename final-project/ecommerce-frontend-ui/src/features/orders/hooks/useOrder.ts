import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "../api/order.api";

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],

    queryFn: () => getOrderById(orderId),

    enabled: !!orderId,
  });
};
