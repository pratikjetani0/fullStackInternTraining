import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}: TaskCardProps) => {
  const priorityColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className=" bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-6 space-y-5">
      <div className="flex justify-between items-start">
        <h3
          className={`text-xl font-semibold text-slate-900 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && <p className="text-slate-600">{task.description}</p>}

      <div className="text-sm text-gray-500">
        <p>Category: {task.category}</p>
        <p>Due: {task.dueDate}</p>
      </div>

      <div className="flex items-center justify-between pt-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          Completed
        </label>

        <div className="flex gap-2">
          <button
            className="px-3 py-1  text-white rounded cursor-pointer bg-slate-900 hover:bg-slate-800"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
