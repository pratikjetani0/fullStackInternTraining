import { Link } from "react-router-dom";

import type { Product } from "../types/product.type";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.name}</h3>

      <p className="mt-2 text-sm text-gray-600">{product.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold">₹{product.price}</span>

        <span className="text-sm">Stock: {product.stock}</span>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="mt-4 block rounded bg-black px-4 py-2 text-center text-white"
      >
        View Details
      </Link>
    </div>
  );
}
