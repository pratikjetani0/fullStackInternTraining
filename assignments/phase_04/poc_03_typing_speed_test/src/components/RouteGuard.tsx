import type React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

const RouteGuard = ({ children, requireAuth }: RouteGuardProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Private route
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Public route (login/signup)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
