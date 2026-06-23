import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";

import { useCreateProduct } from "../hooks/useCreateProduct";

import type { ProductFormData } from "../types/product-form.type";

export default function CreateProductPage() {
  const navigate = useNavigate();

  const mutation = useCreateProduct();

  const handleSubmit = (values: ProductFormData) => {
    mutation.mutate(values, {
      onSuccess: () => {
        navigate("/admin/products");
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Create Product</h1>

        <p className="text-slate-500">Add a new product.</p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <ProductForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
      </div>
    </div>
  );
}
