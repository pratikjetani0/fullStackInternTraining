import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart2, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-white dark:bg-[#0f0f0f] border-r border-slate-200 dark:border-white/10 flex flex-col z-40 p-5 gap-6 transition-colors duration-300">

      {/* Logo box */}
      <div className="border border-slate-200 dark:border-white/20 rounded-xl flex items-center justify-center h-16 px-4">
        <span className="text-slate-900 dark:text-white font-bold text-lg tracking-wide transition-colors duration-300">
          TaskFlow
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-3 flex-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                : "text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-400 dark:text-white/70 dark:border-white/20 dark:hover:text-white dark:hover:border-white/40"
            }`
          }
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                : "text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-400 dark:text-white/70 dark:border-white/20 dark:hover:text-white dark:hover:border-white/40"
            }`
          }
        >
          <BarChart2 size={16} />
          Analysis
        </NavLink>
      </nav>

      {/* Theme toggle at the bottom */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 text-sm font-medium text-slate-600 dark:text-white/60 hover:text-slate-900 hover:border-slate-400 dark:hover:text-white dark:hover:border-white/40 transition-all duration-200 cursor-pointer"
      >
        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </aside>
  );
};

export default Sidebar;