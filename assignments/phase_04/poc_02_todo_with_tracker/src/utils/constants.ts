import { CATEGORY, PRIORITY } from "../types";

export const LOCAL_STORAGE_KEY = "tasks_poc";

export const DEFAULT_TASK_VALUES = {
  title: "",
  description: "",
  priority: PRIORITY.MEDIUM,
  category: CATEGORY.OTHER,
  dueDate: "",
  completed: false,
};
