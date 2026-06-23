interface Props {
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ total, onCheckout }: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
      "
    >
      <h2
        className="
          mb-4
          text-xl
          font-bold
        "
      >
        Order Summary
      </h2>

      <div className="mb-4 flex justify-between">
        <span>Total</span>

        <span>₹{total.toLocaleString()}</span>
      </div>

      <button
        onClick={onCheckout}
        className="
          w-full
          rounded-xl
          bg-black
          py-3
          text-white
        "
      >
        Checkout
      </button>
    </div>
  );
}
