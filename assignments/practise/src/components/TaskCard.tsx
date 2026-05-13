import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColor: Record<string, string> = {
  low: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  medium: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  high: "bg-red-500/15 text-red-400 border border-red-500/20",
};

const TaskCard = ({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}: TaskCardProps) => {
  return (
    <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 space-y-4 hover:border-white/20 transition-all">
      {/* Title + priority badge */}
      <div className="flex justify-between items-start gap-3">
        <h3
          className={`text-base font-semibold leading-snug ${
            task.completed ? "line-through text-white/30" : "text-white"
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shrink-0 ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-white/40 text-sm leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta */}
      <div className="text-xs text-white/30 space-y-0.5">
        <p>
          Category:{" "}
          <span className="text-white/50 capitalize">{task.category}</span>
        </p>
        <p>
          Due: <span className="text-white/50">{task.dueDate || "—"}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-white/8">
        <label className="flex items-center gap-2 text-xs text-white/40 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="accent-white"
          />
          Completed
        </label>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-xs border border-white/20 text-white/70 rounded-lg hover:border-white/40 hover:text-white transition cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1.5 text-xs border border-red-500/30 text-red-400 rounded-lg hover:border-red-500/60 hover:bg-red-500/10 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
