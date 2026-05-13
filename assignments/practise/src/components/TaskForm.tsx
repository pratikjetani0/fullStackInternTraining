import React, { useState } from "react";
import { CATEGORY, PRIORITY, type Task } from "../types";
import { DEFAULT_TASK_VALUES } from "../utils/constants";
import { generateTaskId } from "../utils/taskHelpers";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
  editingTask?: Task | null;
}

const inputClass =
  "w-full bg-transparent border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition";

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

  const handleSubmit = (e: React.FormEvent) => {
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
          updatedAt: now,
        }
      : { ...formData, id: generateTaskId(), createdAt: now, updatedAt: now };
    onSubmit(task);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold text-white mb-1">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        className={inputClass}
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className={inputClass}
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value={PRIORITY.LOW} className="bg-zinc-900">
            Low
          </option>
          <option value={PRIORITY.MEDIUM} className="bg-zinc-900">
            Medium
          </option>
          <option value={PRIORITY.HIGH} className="bg-zinc-900">
            High
          </option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value={CATEGORY.WORK} className="bg-zinc-900">
            Work
          </option>
          <option value={CATEGORY.PERSONAL} className="bg-zinc-900">
            Personal
          </option>
          <option value={CATEGORY.OTHER} className="bg-zinc-900">
            Other
          </option>
        </select>
      </div>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className={`${inputClass} [color-scheme:dark]`}
      />

      <label className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="accent-white"
        />
        Mark as completed
      </label>

      <button
        type="submit"
        className="w-full bg-white text-black text-sm font-semibold py-3 rounded-xl hover:bg-white/90 transition cursor-pointer"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
