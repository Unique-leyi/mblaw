import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "../../services/apiAuth";
import { getCurrentUserProfile } from "../../services/apiUserAuth";
import { getStoredTokens } from "../../util/helper";

export function useUser() {
  const { accessToken } = getStoredTokens();

  // Decode token to get role FIRST - this determines which API to call
  const tokenRole = useMemo(() => {
    if (!accessToken) return null;
    try {
      const decoded = jwtDecode(accessToken);
      return decoded.role || null;
    } catch (error) {
      return null;
    }
  }, [accessToken]);

  const isAdminRole = tokenRole === "super_admin" || tokenRole === "admin";
  const isUserRole = tokenRole === "user";

  // STRICT: Only fetch admin profile if token role is EXACTLY admin/super_admin
  const { isPending: isLoadingAdmin, data: adminData } = useQuery({
    queryKey: ["user", "admin"],
    queryFn: getCurrentUser,
    enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
    retry: false,
  });

  // STRICT: Only fetch user profile if token role is EXACTLY user
  const { isPending: isLoadingUser, data: userData } = useQuery({
    queryKey: ["user", "client"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken && isUserRole === true, // STRICT: must be exactly true
    retry: false,
  });

  // NO FALLBACK QUERIES - if we can't determine role, don't make any API calls

  // Only consider loading states for queries that are actually enabled
  const isLoading = useMemo(() => {
    if (!accessToken) return false;

    // If we have user data, we're not loading
    const adminUser = adminData?.success ? (adminData.data?.user || null) : null;
    const clientUser = userData?.success ? (userData.data?.user || null) : null;
    if (adminUser || clientUser) return false;

    // Only check loading for the query that matches the token role
    if (isAdminRole) return isLoadingAdmin;
    if (isUserRole) return isLoadingUser;

    // If no role determined, we're not loading (no queries enabled)
    return false;
  }, [accessToken, isAdminRole, isUserRole, isLoadingAdmin, isLoadingUser, adminData, userData]);

  // Get user data based on role
  const adminUser = adminData?.success ? (adminData.data?.user || null) : null;
  const clientUser = userData?.success ? (userData.data?.user || null) : null;

  const user = adminUser || clientUser;

  // Determine role - prefer user data, fallback to token role
  const role = useMemo(() => {
    if (user?.role) return user.role;
    if (tokenRole) return tokenRole;
    return null;
  }, [user?.role, tokenRole]);

  // Authentication based on role
  const isAuthenticated = useMemo(() => {
    if (role) return role === "super_admin" || role === "admin" || role === "user";
    if (tokenRole) return tokenRole === "super_admin" || tokenRole === "admin" || tokenRole === "user";
    return false;
  }, [role, tokenRole]);

  return {
    isLoading,
    user,
    role,
    isAuthenticated,
    isAdmin: role === "super_admin" || role === "admin",
    isClient: role === "user",
  };
}