interface PriceProps {
  amount: number;
}

export default function Price({ amount }: PriceProps) {
  return <span className="font-bold text-3xl">₹{amount.toLocaleString()}</span>;
}
