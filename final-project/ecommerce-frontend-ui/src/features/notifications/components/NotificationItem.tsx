import type { Notification } from "../types/notification.type";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  return (
    <div
      className={`
        border-b
        p-4
        hover:bg-slate-50
        ${!notification.isRead ? "bg-blue-50" : ""}
      `}
    >
      <h4 className="font-medium">{notification.title}</h4>

      <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
    </div>
  );
}
