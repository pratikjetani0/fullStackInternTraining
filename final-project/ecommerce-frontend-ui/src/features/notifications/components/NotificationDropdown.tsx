import NotificationItem from "./NotificationItem";

import { useNotifications } from "../hooks/useNotifications";

export default function NotificationDropdown() {
  const { data, isLoading } = useNotifications();

  return (
    <div
      className="
        absolute
        right-0
        top-12
        z-50
        w-96
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-xl
      "
    >
      <div className="border-b p-4">
        <h3 className="font-semibold">Notifications</h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <p className="p-4">Loading...</p>
        ) : data?.length ? (
          data.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <p className="p-4 text-slate-500">No notifications</p>
        )}
      </div>
    </div>
  );
}
