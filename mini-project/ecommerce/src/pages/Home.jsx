import { Header } from "../components/Header";

function Home() {
  return (
    <>
      <title>Ecommerce Project</title>

      <Header />

      <div className="mt-[60px]">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            border-l border-t border-gray-200
          "
        >
          {/* Product Card */}
          <div className="flex flex-col px-6 pt-10 pb-6 border-r border-b border-gray-200">
            <div className="flex justify-center items-center h-[180px] mb-5">
              <img
                className="max-w-full max-h-full rounded"
                src="images/products/athletic-cotton-socks-6-pairs.jpg"
                alt="Socks"
              />
            </div>

            <div className="h-10 mb-1 line-clamp-2">
              Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>

            <div className="flex items-center mb-2.5">
              <img
                className="w-[100px] mr-1.5"
                src="images/ratings/rating-45.png"
                alt="Rating"
              />
              <div className="text-green-600 mt-1">87</div>
            </div>

            <div className="font-bold mb-2">$10.90</div>

            <div className="mb-4">
              <select className="border rounded px-2 py-1">
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center mb-2 text-green-600 opacity-0">
              <img
                className="h-5 mr-1.5"
                src="images/icons/checkmark.png"
                alt="Added"
              />
              Added
            </div>

            <button className="w-full h-[34px] bg-yellow-400 hover:bg-yellow-500 rounded px-2">
              Add to Cart
            </button>
          </div>

          {/* Duplicate more product cards here */}
        </div>
      </div>
    </>
  );
}

export default Home;
