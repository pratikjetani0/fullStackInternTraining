interface SummaryCardProps {
  title: string;
  count: number;
}

const SummaryCard = ({ title, count }: SummaryCardProps) => {
  return (
    <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
      <p className="text-xs text-white/40 mb-2">{title}</p>
      <p className="text-4xl font-bold text-white">{count}</p>
    </div>
  );
};

export default SummaryCard;