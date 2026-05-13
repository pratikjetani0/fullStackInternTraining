import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import type { Task } from "../types";

import SummaryCard from "../components/SummaryCard";

import { getTaskStats } from "../utils/taskStats";
import {
  getPriorityChartData,
  getStatusChartData,
} from "../utils/analyticsData";

import StatusPieChart from "../components/charts/StatusPieChart";
import PriorityBarChart from "../components/charts/PriorityBarChart";

const AnalyticsPage = () => {
  const [tasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);

  const stats = getTaskStats(tasks);

  const statusData = getStatusChartData(tasks);

  const priorityData = getPriorityChartData(tasks);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Total" count={stats.total} />
        <SummaryCard title="Completed" count={stats.completed} />
        <SummaryCard title="Pending" count={stats.pending} />
        <SummaryCard title="Overdue" count={stats.overdue} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatusPieChart data={statusData} />

        <PriorityBarChart data={priorityData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
