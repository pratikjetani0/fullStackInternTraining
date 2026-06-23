import { useProducts } from "../hooks/useProducts";

import Loader from "../../../components/ui/Loader";

import EmptyState from "../../../components/ui/EmptyState";

import ProductGrid from "../components/ProductGrid";
import { useSearchStore } from "../../../app/store/search.store";

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const search = useSearchStore((state) => state.search);

  if (isLoading) {
    return <Loader />;
  }

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Discover Products</h1>

        <p className="mt-2 text-slate-500">Explore our collection.</p>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No Products Found"
          description="Try another search."
        />
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
