import { getThemeClasses } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";

interface DashboardToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddTask: () => void;
}

const DashboardToolbar = ({
  searchTerm,
  onSearchChange,
  onAddTask,
}: DashboardToolbarProps) => {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);
  return (
    <div
      className={`rounded-2xl border shadow-sm p-6 mb-8 flex items-center justify-between gap-6 ${styles.card}`}
    >
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`flex-1 px-5 py-3 rounded-xl border outline-none ${styles.input}`}
      />

      <button
        onClick={onAddTask}
        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl transition"
      >
        + Add Task
      </button>
    </div>
  );
};

export default DashboardToolbar;
