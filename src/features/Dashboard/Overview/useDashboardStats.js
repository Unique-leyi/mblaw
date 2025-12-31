import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getDashboardStats } from "../../../services/apiDashboard";
import { getStoredTokens } from "../../../util/helper";

export function useDashboardStats() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only admins should fetch dashboard stats
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

    // STRICT: Only fetch dashboard stats if token role is EXACTLY admin/super_admin
    const { isPending: isLoading, data } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: getDashboardStats,
        enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        isLoading,
        stats: data?.success ? data?.data : null,
    };
}

