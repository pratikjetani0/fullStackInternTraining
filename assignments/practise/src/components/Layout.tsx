import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#0f0f0f] transition-colors duration-300">
      <Sidebar />
      <main className="ml-56 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;