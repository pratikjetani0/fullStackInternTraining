import { api } from "../../../services/axios";
import type { Notification } from "../types/notification.type";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get("/notifications/me");

  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await api.patch(`/notifications/${id}/read`);

  return response.data;
};
