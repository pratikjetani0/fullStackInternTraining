import { Link } from "react-router";

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[60px] bg-green-900 text-white px-4 flex items-center justify-between z-50">
      {/* Left Section */}
      <div className="w-auto md:w-[208px]">
        <Link
          to="/"
          className="inline-block px-[9.5px] py-1.5 rounded border border-transparent hover:border-white"
        >
          <img
            className="hidden sm:block h-[26px] mt-[1px]"
            src="images/logo-white.png"
            alt="Logo"
          />

          <img
            className="block sm:hidden h-[26px] mt-[1px]"
            src="images/mobile-logo-white.png"
            alt="Mobile Logo"
          />
        </Link>
      </div>

      {/* Middle Section */}
      <div className="flex flex-1 max-w-[850px] mx-2.5">
        <input
          className="flex-1 w-0 h-[38px] px-4 text-base border-none rounded-l-md text-black outline-none"
          type="text"
          placeholder="Search"
        />

        <button className="w-[45px] h-[40px] bg-green-200 rounded-r-md shrink-0 flex items-center justify-center">
          <img
            className="h-5 mt-[3px]"
            src="images/icons/search-icon.png"
            alt="Search"
          />
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[180px] shrink-0 flex justify-end">
        <Link
          to="/orders"
          className="flex items-center px-3 text-white border border-transparent hover:border-white rounded"
        >
          <span className="text-[15px] font-bold">Orders</span>
        </Link>

        <Link
          to="/checkout"
          className="relative flex items-center text-white border border-transparent hover:border-white rounded px-2"
        >
          <img
            className="w-[38px]"
            src="images/icons/cart-icon.png"
            alt="Cart"
          />

          <div className="absolute top-[8.5px] right-[46px] w-[26px] text-center text-green-900 text-sm font-bold">
            3
          </div>

          <div className="ml-1 text-[15px] font-bold">Cart</div>
        </Link>
      </div>
    </div>
  );
}
