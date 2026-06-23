import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api/order.api";

import OrderCard from "../components/OrderCard";

import EmptyState from "../../../components/ui/EmptyState";

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return <div className="p-10">Loading orders...</div>;
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="No Orders Found"
        description="Place your first order."
      />
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          My Orders
        </h1>

        <p className="text-slate-500">Track your purchases.</p>
      </div>

      <div className="space-y-4">
        {data.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
