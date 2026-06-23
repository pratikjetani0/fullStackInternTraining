interface Props {
  status: string;
}

export default function OrderStatusBadge({ status }: Props) {
  const styles = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
    CANCELLED: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          styles[status as keyof typeof styles] ?? "bg-slate-100 text-slate-700"
        }
      `}
    >
      {status}
    </span>
  );
}
