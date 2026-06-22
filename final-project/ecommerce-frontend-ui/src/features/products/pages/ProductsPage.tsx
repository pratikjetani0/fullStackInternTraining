import ProductCard from '../components/ProductCard';

import { useProducts } from '../hooks/useProducts';

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts();

  if (isLoading) {
    return (
      <div className="p-10">
        Loading Products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}