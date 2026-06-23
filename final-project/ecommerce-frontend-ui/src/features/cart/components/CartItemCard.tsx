import { useUpdateCartItem } from "../hooks/useUpdateCartItem";
import { useRemoveCartItem } from "../hooks/useRemoveCartItem";
import type { CartItem } from "../types/cart.types";

interface Props {
  item: CartItem;
}

export default function CartItemCard({ item }: Props) {
  const updateMutation = useUpdateCartItem();

  const removeMutation = useRemoveCartItem();

  return (
    <div
      className="
        flex
        gap-4
        rounded-xl
        border
        bg-white
        p-4
      "
    >
      <img
        src={item.product.imageUrl || "https://placehold.co/200"}
        alt={item.product.name}
        className="
          h-28
          w-28
          rounded-lg
          object-cover
        "
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>

        <p className="mt-2 text-xl font-bold">₹{item.product.price}</p>

        <div className="mt-4 flex gap-2">
          <button
            className="
              rounded
              border
              px-3
            "
            onClick={() =>
              updateMutation.mutate({
                productId: item.product.id,
                quantity: item.quantity - 1,
              })
            }
            disabled={item.quantity <= 1}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            className="
              rounded
              border
              px-3
            "
            onClick={() =>
              updateMutation.mutate({
                productId: item.product.id,
                quantity: item.quantity + 1,
              })
            }
          >
            +
          </button>
        </div>

        <button
          className="
            mt-4
            text-sm
            text-red-500
          "
          onClick={() => removeMutation.mutate(item.product.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
