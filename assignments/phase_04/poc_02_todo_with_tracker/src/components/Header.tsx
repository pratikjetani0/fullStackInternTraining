import React from "react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddTask: () => void;
}

const Header = ({ onAddTask, searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <header className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-5 mb-8 flex items-center justify-between gap-6">
      {/* LOGO  */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">TaskFlow</h1>

        <p className="text-sm text-slate-500">Smart productivity tracker</p>
      </div>

      {/* SERACH BAR */}
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ADD TASK BUTTON  */}
      <button
        className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-medium transition cursor-pointer"
        onClick={onAddTask}
      >
        + Add Task
      </button>
    </header>
  );
};

export default Header;
