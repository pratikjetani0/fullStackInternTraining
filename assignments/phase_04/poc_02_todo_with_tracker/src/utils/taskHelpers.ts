import type { Task } from "../types";

export const generateTaskId = (): string => {
  return crypto.randomUUID();
};

export const getOverdueCount = (tasks: Task[]): number => {
  const today = new Date();

  return tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) < today,
  ).length;
};
