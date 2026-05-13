// TYPE
export type TaskID = string;

// OBJECTS + TYPES
export const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

export const CATEGORY = {
  WORK: "work",
  PERSONAL: "personal",
  OTHER: "other",
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

// INTERFACE
export interface Task {
  id: TaskID;
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}
