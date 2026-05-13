// TYPE
export type TaskID = string;

// enum
export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress", 
  DONE = "done",
}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Task {
  id: TaskID;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  createdAt?: number;
  updatedAt?: number;
}