import { Link } from "react-router-dom";
import { ShoppingCart, Bell } from "lucide-react";

import { useAuthStore } from "../../features/auth/store/auth.store";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import { useState } from "react";
import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);

  const [openNotifications, setOpenNotifications] = useState(false);

  const { data: notifications } = useNotifications();

  const unreadCount = notifications?.filter((item) => !item.isRead).length ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          Cartly
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium">
            Products
          </Link>

          <Link to="/orders" className="text-sm font-medium">
            Orders
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setOpenNotifications(!openNotifications)}
              className="relative"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span
                  className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-xs
                  text-white
                "
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {openNotifications && <NotificationDropdown />}
          </div>

          <Link to="/cart" className="relative">
            <ShoppingCart size={20} />
          </Link>

          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name ?? "Guest"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
