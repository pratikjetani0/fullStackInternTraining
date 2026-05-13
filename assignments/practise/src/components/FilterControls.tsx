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

const selectClass =
  "flex-1 bg-transparent border border-white/15 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-white/40 focus:text-white transition cursor-pointer appearance-none";

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
  return (
    /* Outer bordered container — matches wireframe second row */
    <div className="border border-white/10 rounded-2xl p-4 flex items-center gap-4">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={selectClass}
      >
        <option value="all" className="bg-zinc-900">
          All Status
        </option>
        <option value="completed" className="bg-zinc-900">
          Completed
        </option>
        <option value="pending" className="bg-zinc-900">
          Pending
        </option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className={selectClass}
      >
        <option value="all" className="bg-zinc-900">
          All Priority
        </option>
        <option value="low" className="bg-zinc-900">
          Low
        </option>
        <option value="medium" className="bg-zinc-900">
          Medium
        </option>
        <option value="high" className="bg-zinc-900">
          High
        </option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className={selectClass}
      >
        <option value="all" className="bg-zinc-900">
          All Category
        </option>
        <option value="work" className="bg-zinc-900">
          Work
        </option>
        <option value="personal" className="bg-zinc-900">
          Personal
        </option>
        <option value="other" className="bg-zinc-900">
          Other
        </option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={selectClass}
      >
        <option value="default" className="bg-zinc-900">
          Sort By
        </option>
        <option value="dueDate" className="bg-zinc-900">
          Due Date
        </option>
        <option value="priority" className="bg-zinc-900">
          Priority
        </option>
      </select>
    </div>
  );
};

export default FilterControls;
