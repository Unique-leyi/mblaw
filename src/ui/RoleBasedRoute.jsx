import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../features/Auth/useUser";

function RoleBasedRoute({ roles, children }) {
  const { role, isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(role)) {
    // Redirect based on user role
    if (role === "user") {
      return <Navigate to="/my-account" replace />;
    } else if (role === "super_admin" || role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleBasedRoute;


