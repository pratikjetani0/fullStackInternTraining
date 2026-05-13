import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const StatusPieChart = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-6">Task Status</h2>

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
