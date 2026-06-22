import { useState } from "react";

import { useProducts } from "../hooks/useProducts";

import Loader from "../../../components/ui/Loader";

import EmptyState from "../../../components/ui/EmptyState";

import ProductGrid from "../components/ProductGrid";

import SearchInput from "../../../components/ui/SearchInput";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const { data: products, isLoading } = useProducts();

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

      <div className="mb-8">
        <SearchInput value={search} onChange={setSearch} />
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
