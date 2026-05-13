import { Link } from "react-router-dom";

function Checkout() {
  return (
    <>
      <title>Checkout</title>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-[100px] bg-white border-b z-50">
        <div className="max-w-[1100px] mx-auto px-8 h-full flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                className="hidden sm:block h-8"
                src="images/logo.png"
                alt="Logo"
              />
              <img
                className="block sm:hidden h-8"
                src="images/mobile-logo.png"
                alt="Mobile Logo"
              />
            </Link>
          </div>

          <div className="text-xl font-bold">
            Checkout (
            <Link to="/" className="text-green-700 hover:underline">
              3 items
            </Link>
            )
          </div>

          <div>
            <img
              className="h-8"
              src="images/icons/checkout-lock-icon.png"
              alt="Lock"
            />
          </div>
        </div>
      </div>

      {/* Page */}
      <div className="max-w-[1100px] mx-auto px-8 mt-[140px] mb-[100px]">
        <div className="text-[22px] font-bold mb-5">Review your order</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-3 items-start">
          {/* Order Summary */}
          <div>
            <div className="border rounded p-5 mb-3">
              <div className="text-green-700 font-bold text-[19px] mt-1 mb-5">
                Delivery date: Tuesday, June 21
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6">
                <img
                  className="max-w-full max-h-[120px] mx-auto"
                  src="images/products/athletic-cotton-socks-6-pairs.jpg"
                  alt="Product"
                />

                <div>
                  <div className="font-bold mb-2">
                    Black and Gray Athletic Cotton Socks - 6 Pairs
                  </div>
                  <div className="font-bold mb-1">$10.90</div>

                  <div>
                    Quantity: <span className="font-semibold">2</span>
                    <span className="ml-2 text-green-700 cursor-pointer">
                      Update
                    </span>
                    <span className="ml-2 text-red-600 cursor-pointer">
                      Delete
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-bold mb-3">
                    Choose a delivery option:
                  </div>

                  <div className="grid grid-cols-[24px_1fr] mb-3 cursor-pointer">
                    <input type="radio" defaultChecked className="mt-1" />
                    <div>
                      <div className="font-medium">Tuesday, June 21</div>
                      <div className="text-gray-500 text-sm">FREE Shipping</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[24px_1fr] mb-3 cursor-pointer">
                    <input type="radio" className="mt-1" />
                    <div>
                      <div className="font-medium">Wednesday, June 15</div>
                      <div className="text-gray-500 text-sm">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border rounded p-5 pb-2 lg:order-none order-first mb-3 lg:mb-0">
            <div className="font-bold text-lg mb-3">Payment Summary</div>

            <div className="grid grid-cols-[1fr_auto] text-sm mb-2">
              <div>Items (3):</div>
              <div>$42.75</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-sm mb-2">
              <div>Shipping & handling:</div>
              <div>$4.99</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-sm mb-2 pt-2 border-t">
              <div>Total before tax:</div>
              <div>$47.74</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-sm mb-2">
              <div>Estimated tax (10%):</div>
              <div>$4.77</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-lg font-bold text-green-700 border-t pt-4">
              <div>Order total:</div>
              <div>$52.51</div>
            </div>

            <button className="w-full py-3 rounded bg-yellow-400 hover:bg-yellow-500 mt-5 mb-5">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
