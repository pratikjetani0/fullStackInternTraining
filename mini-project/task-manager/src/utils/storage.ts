import type { Task } from "../types";

const KEY = "tasks";

//save tasks
export function saveTasks(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

// load tasks
export function loadTasks(): Task[] {
  const data = localStorage.getItem(KEY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}