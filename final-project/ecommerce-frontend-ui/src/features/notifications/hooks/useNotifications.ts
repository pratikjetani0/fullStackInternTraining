import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../api/notification.api";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 30000,
  });
};
