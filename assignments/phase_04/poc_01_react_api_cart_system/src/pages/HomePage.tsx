import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { fetchProducts } from "../services/productService";
import type { Product } from "../types";
import ProductSkeleton from "../components/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

const HomePage = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: HomePageProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const clothingCategories = ["mens-shirts", "mens-shoes", "mens-watches"];

  const products =
    data?.products?.filter((product) => {
      return clothingCategories.includes(product.category);
    }) || [];

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="p-8 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={handleOpenProduct}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default HomePage;
