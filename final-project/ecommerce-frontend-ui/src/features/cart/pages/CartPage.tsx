import { useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart";

import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";

import EmptyState from "../../../components/ui/EmptyState";

export default function CartPage() {
  const navigate = useNavigate();

  const { data } = useCart();

  const items = data?.items ?? [];

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <EmptyState
        title="Cart is empty"
        description="Add products to your cart."
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      <CartSummary total={total} onCheckout={() => navigate("/checkout")} />
    </div>
  );
}
