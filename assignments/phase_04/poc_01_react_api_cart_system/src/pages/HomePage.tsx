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
  // const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState(true);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  

  const products = data.filter((product) => {
    return (
      product.category.name.toLowerCase() === "clothes" &&
      product.title.length > 6 &&
      product.images?.[0] &&
      !product.images[0].includes("placehold.co")
    );
  });

  // useEffect(() => {
  //   async function loadProducts() {
  //     setLoading(true);

  //     const data = await fetchProducts();

  //     const clothesProducts = data.filter((product) => {
  //       return (
  //         product.category.name.toLowerCase() === "clothes" &&
  //         product.title.length > 6 &&
  //         product.images?.[0] &&
  //         !product.images[0].includes("placehold.co")
  //       );
  //     });

  //     setProducts(clothesProducts);
  //     setLoading(false);
  //   }

  //   loadProducts();
  // }, []);

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
