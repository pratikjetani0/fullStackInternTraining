import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import type { Task } from "../types";
import Layout from "../components/Layout";
import Header from "../components/Header";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterControls from "../components/FilterControls";
import { filterTasks } from "../utils/filterTasks";

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
      if (exists)
        return prev.map((item) => (item.id === task.id ? task : item));
      return [...prev, task];
    });
    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: Date.now() }
          : t,
      ),
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = filterTasks(tasks, {
    searchTerm,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
  });

  return (
    <Layout>
      <div className="p-6 space-y-4">
        {/* Row 1: Search + Add Task */}
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        />

        {/* Row 2: Four Filters */}
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

        {/* Row 3: Task cards */}
        {filteredTasks.length === 0 ? (
          <div className="border border-white/10 rounded-2xl py-24 text-center text-white/20 text-sm">
            No tasks yet. Add one to get started.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
      >
        <TaskForm
          key={editingTask?.id || "new-task"}
          onSubmit={handleTaskSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          editingTask={editingTask}
        />
      </TaskModal>
    </Layout>
  );
};

export default DashboardPage;
