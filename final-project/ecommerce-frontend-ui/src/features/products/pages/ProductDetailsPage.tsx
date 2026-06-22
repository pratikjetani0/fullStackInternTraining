import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";

import Loader from "../../../components/ui/Loader";

import Price from "../../../components/ui/Price";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data: product, isLoading } = useProduct(id ?? "");

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="rounded-xl border bg-white p-10">Product not found</div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* IMAGE */}

      <div className="overflow-hidden rounded-2xl border bg-white">
        <img
          src={product.imageUrl || "https://placehold.co/1000x800?text=Product"}
          alt={product.name}
          className="h-[500px] w-full object-cover"
        />
      </div>

      {/* DETAILS */}

      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>

        <p className="mt-5 text-slate-600">{product.description}</p>

        <div className="mt-8">
          <Price amount={product.price} />
        </div>

        <div className="mt-4">
          <span
            className={`
              rounded-full
              px-3
              py-1
              text-sm
              ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out Of Stock"}
          </span>
        </div>

        <div className="mt-10">
          <button
            className="
              rounded-xl
              bg-black
              px-8
              py-4
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
