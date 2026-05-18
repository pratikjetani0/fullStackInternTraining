import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const [showName, setShowName] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-[var(--nav-a)]"
      : "text-[var(--nav)] hover:text-[var(--nav-h)] transition-colors";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-8 py-5">
      <NavLink to="/">
        <h1 className="text-3xl font-bold text-[var(--accent)]">TypeRush</h1>
      </NavLink>

      <nav className="flex items-center gap-6 font-medium">
        <NavLink to="/history" className={navClass}>
          History
        </NavLink>

        <NavLink to="/leaderboard" className={navClass}>
          Leaderboard
        </NavLink>

        {!currentUser ? (
          <NavLink
            to="/login"
            className="bg-[var(--btn)] text-[var(--btn-text)] px-4 py-2 rounded-lg hover:bg-[var(--btn-h)] transition-colors"
          >
            Login
          </NavLink>
        ) : (
          <div className="flex items-center gap-4 relative">
            <div
              className="relative"
              onMouseEnter={() => setShowName(true)}
              onMouseLeave={() => setShowName(false)}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--btn-text)] font-bold cursor-pointer">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>

              {showName && (
                <div className="absolute top-12 right-0 bg-[var(--card)] border border-[var(--border)] px-4 py-2 rounded-lg text-[var(--text)] whitespace-nowrap shadow-lg">
                  {currentUser.username}
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-[var(--error)] px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
