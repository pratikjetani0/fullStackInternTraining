import { useMarkNotificationRead } from "../hooks/useMarkNotificationRead";
import type { Notification } from "../types/notification.type";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const markReadMutation = useMarkNotificationRead();

  const handleClick = () => {
    if (!notification.isRead) {
      markReadMutation.mutate(notification.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        cursor-pointer
        border-b
        p-4
        hover:bg-slate-50
        ${!notification.isRead ? "bg-blue-50" : ""}
      `}
    >
      <div className="flex flex-wrap items-center justify-between">
        <h4 className="font-medium">{notification.title}</h4>

        <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
        {!notification.isRead && (
          <span
            className="
            h-2
            w-2
            rounded-full
            bg-blue-500
          "
          />
        )}
      </div>
    </div>
  );
}
