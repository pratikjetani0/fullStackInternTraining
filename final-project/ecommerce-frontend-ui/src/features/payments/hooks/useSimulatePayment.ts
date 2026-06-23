import { useMutation } from "@tanstack/react-query";

import { simulatePayment } from "../api/payment.api";

export const useSimulatePayment = () => {
  return useMutation({
    mutationFn: simulatePayment,
  });
};
