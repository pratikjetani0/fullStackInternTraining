import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const StatusPieChart = ({ data }: Props) => {
  return (
    <div className="bg-[#161616] border border-white/8 rounded-2xl p-5 flex flex-col items-center justify-center gap-4">
      <h2 className="text-xs text-white/40">Task Status</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
          />

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
