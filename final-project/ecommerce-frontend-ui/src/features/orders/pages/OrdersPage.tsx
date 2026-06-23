import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api/order.api";

export default function OrdersPage() {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      <div className="space-y-4">
        {data?.map((order: any) => (
          <div
            key={order.id}
            className="
              rounded-xl
              border
              bg-white
              p-4
            "
          >
            <p>Order: {order.id}</p>

            <p>Status: {order.status}</p>

            <p>₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
