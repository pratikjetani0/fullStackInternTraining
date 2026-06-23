import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: any;
}

export default function OrderCard({ order }: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Order ID</p>

          <p className="font-medium">{order.id.slice(0, 12)}...</p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">Amount</p>

          <p className="font-semibold">
            ₹{Number(order.totalAmount).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Created</p>

          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Items</p>

          <p>{order.items?.length ?? 0}</p>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to={`/orders/${order.id}`}
          className="
            rounded-lg
            bg-black
            px-4
            py-2
            text-white
          "
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
