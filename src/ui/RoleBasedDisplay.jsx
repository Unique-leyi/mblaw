import React from "react";
import { useUser } from "../features/Auth/useUser";

function RoleBasedDisplay({ roles, children }) {
  const { role: userRole, isAuthenticated } = useUser();

  if (!isAuthenticated) return null;

  const rolesArray = Array.isArray(userRole) ? userRole : [userRole];
  const hasAccess = roles.some((role) => rolesArray.includes(role));

  return hasAccess ? children : null;
}

export default RoleBasedDisplay;

