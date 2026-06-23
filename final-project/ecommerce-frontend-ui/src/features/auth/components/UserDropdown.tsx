import { Link } from "react-router-dom";

import { useAuthStore } from "../store/auth.store";

export default function UserDropdown() {
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className="
        absolute
        right-0
        top-12
        z-50
        w-64
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-xl
      "
    >
      <div className="border-b p-4">
        <p className="font-semibold">{user?.name}</p>

        <p className="text-sm text-slate-500">{user?.email}</p>
      </div>

      <div className="py-2">
        <Link to="/profile" className="block px-4 py-2 hover:bg-slate-100">
          My Profile
        </Link>

        <Link to="/orders" className="block px-4 py-2 hover:bg-slate-100">
          Orders
        </Link>

        <Link to="/wishlist" className="block px-4 py-2 hover:bg-slate-100">
          Wishlist
        </Link>
      </div>

      <div className="border-t p-2">
        <button
          className="
            w-full
            rounded-lg
            px-4
            py-2
            text-left
            text-red-500
            hover:bg-red-50
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
