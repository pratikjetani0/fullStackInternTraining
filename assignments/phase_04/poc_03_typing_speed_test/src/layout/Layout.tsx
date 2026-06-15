import { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isTestStarted, setIsTestStarted] = useState(false);

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          isTestStarted
            ? "blur-sm pointer-events-none select-none opacity-50"
            : ""
        }`}
      >
        <Header />
      </div>
      <main>
        <Outlet context={{ setIsTestStarted }} />
      </main>
    </>
  );
};

export default Layout;
