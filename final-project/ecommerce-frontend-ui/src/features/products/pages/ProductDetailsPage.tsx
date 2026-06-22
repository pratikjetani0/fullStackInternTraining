import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data: product, isLoading } = useProduct(id ?? "");

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-4xl font-bold">{product.name}</h1>

      <p className="mt-4 text-gray-600">{product.description}</p>

      <div className="mt-6">
        <p className="text-2xl font-bold">₹{product.price}</p>

        <p className="mt-2">Stock: {product.stock}</p>
      </div>
    </div>
  );
}
