import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
