import { useParams } from "react-router-dom";

import { useOrder } from "../hooks/useOrder";

import OrderStatusBadge from "../components/OrderStatusBadge";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useOrder(id!);

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!data) {
    return <div>Order not found</div>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Order Details</h1>

        <p className="text-slate-500">Track your purchase.</p>
      </div>

      {/* Order Info */}

      <div
        className="
          mb-8
          rounded-xl
          border
          bg-white
          p-6
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500">Order ID</p>

            <p className="font-medium">{data.id}</p>
          </div>

          <OrderStatusBadge status={data.status} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-slate-500">Total Amount</p>

            <p className="font-semibold">
              ₹{Number(data.totalAmount).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Order Date</p>

            <p>{new Date(data.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-slate-500">Payment Status</p>

            <p>{data.payment?.status}</p>
          </div>
        </div>
      </div>

      {/* Products */}

      <div
        className="
          rounded-xl
          border
          bg-white
          p-6
        "
      >
        <h2 className="mb-6 text-xl font-bold">Products</h2>

        <div className="space-y-4">
          {data.items.map((item: any) => (
            <div
              key={item.id}
              className="
                  flex
                  gap-4
                  border-b
                  pb-4
                "
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="
                    h-24
                    w-24
                    rounded-lg
                    object-cover
                  "
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>

                <p className="text-slate-500">Qty: {item.quantity}</p>

                <p className="font-medium">
                  ₹{Number(item.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}

      <div
        className="
          mt-8
          rounded-xl
          border
          bg-white
          p-6
        "
      >
        <h2 className="mb-4 text-xl font-bold">Payment Details</h2>

        <p>Transaction: {data.payment?.transactionId}</p>

        <p>Status: {data.payment?.status}</p>
      </div>
    </div>
  );
}
