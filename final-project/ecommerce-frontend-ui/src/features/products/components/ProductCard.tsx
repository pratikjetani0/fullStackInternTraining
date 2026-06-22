import { Link } from "react-router-dom";

import type { Product } from "../types/product.type";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="h-48 overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl || "https://placehold.co/600x400?text=Product"}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">₹{product.price}</span>

          <span className="text-sm text-slate-500">Stock {product.stock}</span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="
            mt-4
            block
            rounded-lg
            bg-black
            py-2
            text-center
            text-white
          "
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
