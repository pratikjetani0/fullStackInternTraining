import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/admin-product.api";

export const useAdminProducts = () => {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: getProducts,
  });
};