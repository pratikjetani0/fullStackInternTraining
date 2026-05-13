import { getThemeClasses } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";

interface FilterControlsProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const FilterControls = ({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
}: FilterControlsProps) => {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {/* status */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={` ${styles.input} w-full bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none`}
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {/* priority */}
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="all">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* categoty  */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="all">All Category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>

      {/* Sort  */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="default">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default FilterControls;
