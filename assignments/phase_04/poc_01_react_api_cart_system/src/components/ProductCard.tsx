import { Heart } from "lucide-react";

import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

const ProductCard = ({
  product,
  onOpen,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) => {
  return (
    <div
      className="w-60 bg-white cursor-pointer group"
      onClick={() => onOpen(product)}
    >
      <div className="relative bg-gray-100 h-62.5 flex items-center justify-center overflow-hidden ">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Icon */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full shadow-md cursor-pointer transition"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
        >
          <Heart
            size={22}
            strokeWidth={1.7}
            color={isWishlisted ? "#ef4444" : "#000"}
            fill={isWishlisted ? "#ef4444" : "none"}
            style={{ transition: "all 0.3s ease" }}
          />
        </button>
      </div>

      <div className="pt-4 px-2">
        <h2 className="text-[13px] font-normal text-[#1F2937] leading-tight">
          {product?.title}
        </h2>

        <p className="text-[13px] font-medium mt-1">${product?.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
