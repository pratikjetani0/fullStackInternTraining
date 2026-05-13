import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import DashboardToolbar from "../components/DashboardToolbar";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import type { Task } from "../types";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import SummaryCard from "../components/SummaryCard";
import FilterControls from "../components/FilterControls";
import { filterTasks } from "../utils/filterTasks";
import { getTaskStats } from "../utils/taskStats";

const DashboardPage = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const handleTaskSubmit = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.some((item) => item.id === task.id);

      if (exists) {
        return prev.map((item) => (item.id === task.id ? task : item));
      }

      return [...prev, task];
    });

    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Delete this task?");

    if (!confirmed) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: Date.now(),
            }
          : task,
      ),
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const { total, completed, pending, overdue } = getTaskStats(tasks);

  const filteredTasks = filterTasks(tasks, {
    searchTerm,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <DashboardToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={() => setIsModalOpen(true)}
        />

        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TaskForm
            key={editingTask?.id || "new-task"}
            onSubmit={handleTaskSubmit}
            onClose={() => setIsModalOpen(false)}
            editingTask={editingTask}
          />
        </TaskModal>

        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard title="Total Tasks" count={total} />
          <SummaryCard title="Completed" count={completed} />
          <SummaryCard title="Pending" count={pending} />
          <SummaryCard title="Overdue" count={overdue} />
        </div>

        <FilterControls
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No tasks yet. Add one to get started.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
