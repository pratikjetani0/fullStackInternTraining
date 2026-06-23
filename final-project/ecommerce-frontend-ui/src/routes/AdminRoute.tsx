import React from "react";
import { useAuthStore } from "../features/auth/store/auth.store";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  console.log("ADMIN ROUTE USER =>", user);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
