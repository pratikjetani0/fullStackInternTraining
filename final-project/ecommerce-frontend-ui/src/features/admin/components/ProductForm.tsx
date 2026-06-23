import { useState } from "react";

import type { ProductFormData } from "../types/product-form.type";

interface Props {
  initialValues?: ProductFormData;

  onSubmit: (values: ProductFormData) => void;

  isLoading?: boolean;
}

export default function ProductForm({
  initialValues,
  onSubmit,
  isLoading,
}: Props) {
  const [form, setForm] = useState<ProductFormData>(
    initialValues ?? {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      imageUrl: "",
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full rounded border p-3"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full rounded border p-3"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full rounded border p-3"
      />

      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full rounded border p-3"
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full rounded border p-3"
      />

      {form.imageUrl && (
        <img
          src={form.imageUrl}
          alt="Preview"
          className="
            h-40
            w-full
            rounded-lg
            object-cover
          "
        />
      )}

      <button
        disabled={isLoading}
        className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
        "
      >
        {isLoading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
