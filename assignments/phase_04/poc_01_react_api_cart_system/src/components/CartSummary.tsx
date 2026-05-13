interface CartSummaryProps {
  total: number;
}

const CartSummary = ({ total }: CartSummaryProps) => {
  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-sm ">
      <h2 className="text-2xl font-semibold mb-6">
        Order Summary
      </h2>

      <div className="flex justify-between mb-4">
        <span>Total</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>

      <button className="w-full bg-black text-white py-4 rounded-xl mt-6">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;