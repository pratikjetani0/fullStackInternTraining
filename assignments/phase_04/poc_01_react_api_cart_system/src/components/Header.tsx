import { Search, User, ShoppingBag, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Header = () => {

  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalWishlist = wishlist.length;

  return (
    <header className="w-full bg-[#f5f5f5] px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:scale-105 "
          onClick={() => navigate("/")}
        >
          <div className="text-4xl font-light">⌘</div>
          <h1 className="text-4xl font-bold tracking-[6px]">SCOPE</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          {/* Search Box */}
          <div className="flex items-center border border-black px-4 py-2 w-[360px] bg-white">
            <Search size={22} strokeWidth={1.5} />
            <input
              type="text"
              placeholder='Search "BLACK SHIRT"'
              className="ml-3 w-full bg-transparent outline-none text-md"
            />
          </div>

          {/* User Icon */}
          <button>
            <User size={26} strokeWidth={1.5} />
          </button>

          {/* Cart */}
          <button
            className="relative flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag size={26} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 border-2 border-[#f5f5f5]">
              {totalItems}
            </span>
          </button>

          {/* Wishlist button  */}
          <button
            className="relative cursor-pointer"
            onClick={() => navigate("/wishlist")}
          >
            <Heart size={26} />

            <span className="absolute -top-2 -right-2 text-sm font-semibold">
              {totalWishlist}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
