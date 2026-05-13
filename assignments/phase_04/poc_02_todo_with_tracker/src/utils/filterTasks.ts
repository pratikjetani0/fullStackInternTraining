import type { Task } from "../types";

interface FilterOptions {
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  categoryFilter: string;
  sortBy: string;
}

export const filterTasks = (tasks: Task[], filters: FilterOptions) => {
  let filtered = [...tasks];

  const { searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy } = filters;

  // SEARCH
  if (searchTerm) {
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  // STATUS
  if (statusFilter === "completed") {
    filtered = filtered.filter((task) => task.completed);
  }

  if (statusFilter === "pending") {
    filtered = filtered.filter((task) => !task.completed);
  }

  // PRIORITY
  if (priorityFilter !== "all") {
    filtered = filtered.filter((task) => task.priority === priorityFilter);
  }

  // CATEGORY
  if (categoryFilter !== "all") {
    filtered = filtered.filter((task) => task.category === categoryFilter);
  }

  // SORT
  if (sortBy === "dueDate") {
    filtered.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
  }
  if (sortBy === "priority") {
    const order = {
      high: 3,
      medium: 2,
      low: 1,
    };

    filtered.sort((a, b) => order[b.priority] - order[a.priority]);
  }

  return filtered;
};
