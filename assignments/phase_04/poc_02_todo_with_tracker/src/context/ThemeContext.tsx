import { createContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const saved = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "light";
  };

  const [theme, setTheme] = useState<Theme>(saved);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const getThemeClasses = (
  theme: "light" | "dark"
) => ({
  card:
    theme === "light"
      ? "bg-white border-slate-200 text-slate-900"
      : "bg-slate-800 border-slate-700 text-white",

  input:
    theme === "light"
      ? "bg-slate-50 border-slate-300 text-slate-900"
      : "bg-slate-700 border-slate-600 text-white",

  textMuted:
    theme === "light"
      ? "text-slate-500"
      : "text-white",
});