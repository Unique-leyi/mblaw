import React from 'react'
import { useUser } from '../features/Auth/useUser';


function RoleBasedDisplay({ roles, children }) {

    const { role: userRole } = useUser(); 

    // Check if the user's role is included in the passed roles
   const rolesArray = Array.isArray(userRole) ? userRole : [userRole];
  const hasAccess = roles.some((role) => rolesArray.includes(role));
  
  return hasAccess ? children : null;
};

export default RoleBasedDisplay;


