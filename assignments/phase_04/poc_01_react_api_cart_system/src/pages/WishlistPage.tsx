import type { Product } from "../types";

interface WishlistPageProps {
  wishlist: Product[];
}

const WishlistPage = ({ wishlist }: WishlistPageProps) => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No wishlist items yet</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="border p-4 rounded-xl">
                <img
                  src={product.images[0]}
                  className="h-48 w-full object-contain"
                />

                <h2 className="mt-4">{product.title}</h2>

                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
