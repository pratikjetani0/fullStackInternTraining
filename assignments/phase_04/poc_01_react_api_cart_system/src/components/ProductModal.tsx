import { useState } from "react";
import type { Product } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Toast } from "../utils/Toast";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const toast = new Toast();

const ProductModal = ({ product, onClose, onAddToCart }: ProductModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[900px] rounded-xl p-8 relative flex gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Left Side Images */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="relative bg-gray-100 rounded-xl h-[420px] flex items-center justify-center overflow-hidden">
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="max-h-full object-contain"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 bg-white p-2 rounded-full shadow-md"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 bg-white p-2 rounded-full shadow-md cursor-pointer"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Side Details */}
        <div className="w-1/2 flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            {product.category.name}
          </p>

          <h2 className="text-4xl font-semibold leading-tight mb-5">
            {product.title}
          </h2>

          <div className="text-gray-600 leading-8 mb-8">
            <span>
              {showFullDescription
                ? product.description
                : `${product.description.slice(0, 180)}... `}
            </span>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm underline cursor-pointer hover:text-black inline"
            >
              {showFullDescription ? "See less" : "See more"}
            </button>
          </div>

          <p className="text-4xl font-bold mb-8">${product.price}</p>

          <button
            onClick={() => {
              onAddToCart(product);
              toast.show(`${product.title} added to cart`, "success");
              onClose();
            }}
            className="bg-black text-white py-4 rounded-xl text-lg hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
