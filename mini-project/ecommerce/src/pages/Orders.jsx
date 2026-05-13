import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export function Orders() {
  return (
    <>
      <title>Orders</title>

      <Header />

      <div className="max-w-[850px] mx-auto mt-[90px] mb-[100px] px-5">
        <div className="text-[26px] font-bold mb-6">Your Orders</div>

        <div className="grid gap-[50px]">
          {/* Order Card */}
          <div>
            {/* Order Header */}
            <div className="bg-white border rounded-t-md px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:gap-12">
                <div>
                  <div className="font-bold">Order Placed:</div>
                  <div>August 12</div>
                </div>

                <div>
                  <div className="font-bold">Total:</div>
                  <div>$35.06</div>
                </div>
              </div>

              <div>
                <div className="font-bold">Order ID:</div>
                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
              </div>
            </div>

            {/* Order Details */}
            <div className="border border-t-0 rounded-b-md px-6 py-10 grid grid-cols-1 md:grid-cols-[110px_1fr_220px] gap-8 items-center">
              {/* Product Image */}
              <div className="text-center">
                <img
                  className="max-w-[110px] max-h-[110px] mx-auto"
                  src="images/products/athletic-cotton-socks-6-pairs.jpg"
                  alt="Product"
                />
              </div>

              {/* Product Details */}
              <div>
                <div className="font-bold mb-1">
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>

                <div className="mb-1">Arriving on: August 15</div>
                <div className="mb-2">Quantity: 1</div>

                <button className="flex items-center justify-center w-[140px] h-9 rounded bg-yellow-400 hover:bg-yellow-500 text-sm">
                  <img
                    className="w-5 mr-2"
                    src="images/icons/buy-again.png"
                    alt="Buy Again"
                  />
                  Add to Cart
                </button>
              </div>

              {/* Actions */}
              <div className="self-start">
                <Link to="/tracking">
                  <button className="w-full md:w-[140px] text-sm px-3 py-2 border rounded hover:bg-gray-100">
                    Track package
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Second Order */}
          <div>
            <div className="bg-white border rounded-t-md px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:gap-12">
                <div>
                  <div className="font-bold">Order Placed:</div>
                  <div>June 10</div>
                </div>

                <div>
                  <div className="font-bold">Total:</div>
                  <div>$41.90</div>
                </div>
              </div>

              <div>
                <div className="font-bold">Order ID:</div>
                <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
              </div>
            </div>

            <div className="border border-t-0 rounded-b-md px-6 py-10 grid grid-cols-1 md:grid-cols-[110px_1fr_220px] gap-8 items-center">
              <div className="text-center">
                <img
                  className="max-w-[110px] max-h-[110px] mx-auto"
                  src="images/products/intermediate-composite-basketball.jpg"
                  alt="Basketball"
                />
              </div>

              <div>
                <div className="font-bold mb-1">
                  Intermediate Size Basketball
                </div>

                <div className="mb-1">Arriving on: June 17</div>
                <div className="mb-2">Quantity: 2</div>

                <button className="flex items-center justify-center w-[140px] h-9 rounded bg-yellow-400 hover:bg-yellow-500 text-sm">
                  <img
                    className="w-5 mr-2"
                    src="images/icons/buy-again.png"
                    alt="Buy Again"
                  />
                  Add to Cart
                </button>
              </div>

              <div className="self-start">
                <Link to="/tracking">
                  <button className="w-full md:w-[140px] text-sm px-3 py-2 border rounded hover:bg-gray-100">
                    Track package
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
