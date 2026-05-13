import type { Task } from "../types";
import { getOverdueCount } from "./taskHelpers";

export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

  const overdue = getOverdueCount(tasks);

  return {
    total,
    completed,
    pending,
    overdue,
  };
};
