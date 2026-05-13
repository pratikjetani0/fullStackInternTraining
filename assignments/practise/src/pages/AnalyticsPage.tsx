import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import type { Task } from "../types";
import { getTaskStats } from "../utils/taskStats";
import SummaryCard from "../components/SummaryCard";
import Layout from "../components/Layout";

const PRIORITY_COLORS: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};
const CATEGORY_COLORS = ["#3b82f6", "#8b5cf6", "#14b8a6"];
const STATUS_COLORS = ["#22c55e", "#475569"];

const countBy = <T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T,
): { name: string; value: number }[] => {
  const map: Record<string, number> = {};
  arr.forEach((item) => {
    const k = String(item[key]);
    map[k] = (map[k] ?? 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
};

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    fontSize: 12,
    color: "#fff",
  },
};

const AnalyticsPage = () => {
  const [tasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);
  const { total, completed, pending, overdue } = getTaskStats(tasks);

  const priorityData = countBy(tasks, "priority");
  const categoryData = countBy(tasks, "category");
  const statusData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-4">
        {/* Summary section — 2×2 grid in a bordered container */}
        <div className="border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
            Summary
          </p>
          <div className="grid grid-cols-2 gap-4">
            <SummaryCard title="Total Tasks" count={total} />
            <SummaryCard title="Completed" count={completed} />
            <SummaryCard title="Pending" count={pending} />
            <SummaryCard title="Overdue" count={overdue} />
          </div>
        </div>

        {/* Charts section — large bordered container */}
        <div className="border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-6">
            Charts
          </p>

          {tasks.length === 0 ? (
            <div className="py-20 text-center text-white/20 text-sm">
              No task data yet. Add tasks on the Dashboard.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tasks by Priority */}
              <div className="bg-[#161616] border border-white/8 rounded-2xl p-5">
                <p className="text-xs text-white/40 mb-4">Tasks by Priority</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={priorityData} barSize={36}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {priorityData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={PRIORITY_COLORS[entry.name] ?? "#3b82f6"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Completion Status */}
              <div className="bg-[#161616] border border-white/8 rounded-2xl p-5">
                <p className="text-xs text-white/40 mb-4">Completion Status</p>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusData.map((_, i) => (
                        <Cell key={i} fill={STATUS_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(v) => (
                        <span
                          style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          {v}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Tasks by Category */}
              <div className="bg-[#161616] border border-white/8 rounded-2xl p-5">
                <p className="text-xs text-white/40 mb-4">Tasks by Category</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={categoryData} barSize={36}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {categoryData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Completion rate */}
              <div className="bg-[#161616] border border-white/8 rounded-2xl p-5 flex flex-col items-center justify-center gap-4">
                <p className="text-xs text-white/40">Completion Rate</p>
                <p className="text-6xl font-bold text-white">
                  {total > 0 ? Math.round((completed / total) * 100) : 0}
                  <span className="text-2xl text-white/30">%</span>
                </p>
                <p className="text-xs text-white/30">
                  {completed} of {total} tasks completed
                </p>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-white h-2 rounded-full transition-all"
                    style={{
                      width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
