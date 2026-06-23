import { useNavigate } from "react-router-dom";

import { useSimulatePayment } from "../../payments/hooks/useSimulatePayment";
import { useCreateOrder } from "../../orders/hooks/useCreateOrder";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const createOrderMutation = useCreateOrder();

  const paymentMutation = useSimulatePayment();

  const handleCheckout = async () => {
    try {
      const order = await createOrderMutation.mutateAsync();

      await paymentMutation.mutateAsync(order.id);

      navigate("/orders");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-xl border bg-white p-8">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

        <p className="mb-8 text-slate-500">Confirm your purchase.</p>

        <button
          onClick={handleCheckout}
          className="
            w-full
            rounded-xl
            bg-black
            py-4
            text-white
          "
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
