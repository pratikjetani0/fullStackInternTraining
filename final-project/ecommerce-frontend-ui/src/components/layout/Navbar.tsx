import { Link } from "react-router-dom";
import { ShoppingCart, Bell, User } from "lucide-react";

// import { useAuthStore } from "../../features/auth/store/auth.store";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import NavbarSearch from "./NavbarSearch";
import UserDropdown from "../../features/auth/components/UserDropdown";
import { useCart } from "../../features/cart/hooks/useCart";

export default function Navbar() {
  // const user = useAuthStore((state) => state.user);

  const [openNotifications, setOpenNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  const { data: notifications } = useNotifications();
  const { data: cart } = useCart();

  const unreadCount = notifications?.filter((item) => !item.isRead).length ?? 0;

  useClickOutside(dropdownRef, () => {
    setOpenNotifications(false);
  });

  useClickOutside(userRef, () => {
    setOpenUserMenu(false);
  });

  const cartCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          Cartly
        </Link>

        {/* SERACH */}
        <div className="flex flex-1 px-10 justify-center">
          <NavbarSearch />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <div ref={dropdownRef} className="relative">
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

          <div ref={userRef} className="relative">
            <button onClick={() => setOpenUserMenu(!openUserMenu)}>
              <User size={20} />
            </button>

            {openUserMenu && <UserDropdown />}
          </div>

          <div className="relative">
            <Link to="/cart">
              <ShoppingCart size={20} />
            </Link>

            {cartCount > 0 && (
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
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
