import { Outlet, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const AppLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-slate-50 text-slate-900"
          : "bg-slate-900 text-white"
      }`}
    >
      <header
        className={`${
          theme === "light" ? "bg-white" : "bg-slate-800"
        } border-b border-slate-200 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">TaskFlow</h1>

            <p className="text-sm text-slate-500">Productivity Tracker</p>
          </div>

          <nav className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-slate-600"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-slate-600"
              }
            >
              Analytics
            </NavLink>
          </nav>
          <button onClick={toggleTheme} className="px-4 py-2 rounded-lg border">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
