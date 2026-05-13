import React from "react";
import type { CartItem } from "../types";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";

interface CartPageProps {
  cart: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
}

const CartPage = ({
  cart,
  onIncrease,
  onDecrease,
  onDelete,
}: CartPageProps) => {

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {/* Left */}
          <div className="col-span-2">
            {cart.map((item) => (
              <CartItemCard
                key={item.product.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Right */}
          <CartSummary total={totalQuantity} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
