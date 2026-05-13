import React from "react";
import type { CartItem } from "../types";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
}

const CartItemCard = ({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemCardProps) => {
  return (
    <div className="flex gap-6 border-b py-6 items-center">
      <img
        src={item.product.images[0]}
        className="w-28 h-28 object-contain bg-gray-100 rounded-lg"
      />

      <div className="flex-1">
        <h2 className="font-semibold">{item.product.title}</h2>
        <p className="text-gray-600 mt-2">${item.product.price}</p>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => onDecrease(item.product.id)}
            className="p-2 border rounded"
          >
            <Minus size={16} />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.product.id)}
            className="p-2 border rounded"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={() => onDelete(item.product.id)}
            className="ml-6 text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
