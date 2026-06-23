import { Link } from "react-router-dom";

import { useAdminProducts } from "../hooks/useAdminProducts";

export default function AdminProductsPage() {
  const { data, isLoading } = useAdminProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Product Management</h1>

        <Link
          to="/admin/products/create"
          className="
            rounded-xl
            bg-black
            px-4
            py-2
            text-white
          "
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((product: any) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      className="h-12 w-12 rounded object-cover"
                    />

                    <span>{product.name}</span>
                  </div>
                </td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">Edit Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
