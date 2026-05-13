import React, { useState } from "react";
import { CATEGORY, PRIORITY, type Task } from "../types";
import { DEFAULT_TASK_VALUES } from "../utils/constants";
import { generateTaskId } from "../utils/taskHelpers";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
  editingTask?: Task | null;
}
const TaskForm = ({ editingTask, onSubmit, onClose }: TaskFormProps) => {
  const [formData, setFormData] = useState(editingTask || DEFAULT_TASK_VALUES);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    const now = Date.now();

    const task: Task = editingTask
      ? {
          ...formData,
          id: editingTask.id,
          createdAt: editingTask.createdAt,
          updatedAt: editingTask.updatedAt,
        }
      : {
          ...formData,
          id: generateTaskId(),
          createdAt: now,
          updatedAt: now,
        };

    onSubmit(task);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      >
        <option value={PRIORITY.LOW}>Low</option>
        <option value={PRIORITY.MEDIUM}>Medium</option>
        <option value={PRIORITY.HIGH}>High</option>
      </select>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      >
        <option value={CATEGORY.WORK}>Work</option>
        <option value={CATEGORY.PERSONAL}>Personal</option>
        <option value={CATEGORY.OTHER}>Other</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />
        Completed
      </label>

      <button
        type="submit"
        className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
