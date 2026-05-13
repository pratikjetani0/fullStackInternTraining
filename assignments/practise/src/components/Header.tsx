interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddTask: () => void;
}

const Header = ({ onAddTask, searchTerm, onSearchChange }: HeaderProps) => {
  return (
    /* Outer bordered container — matches wireframe top section */
    <div className="border border-white/10 rounded-2xl p-4 flex items-center gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 bg-transparent border border-white/15 rounded-xl px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition"
      />

      {/* Add Task */}
      <button
        onClick={onAddTask}
        className="border border-white/20 hover:border-white/50 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all hover:bg-white/5 cursor-pointer whitespace-nowrap"
      >
        + Add Task
      </button>
    </div>
  );
};

export default Header;