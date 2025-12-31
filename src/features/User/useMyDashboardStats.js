import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getMyDashboardStats } from "../../services/apiDashboard";
import { getStoredTokens } from "../../util/helper";

export function useMyDashboardStats() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only users should fetch their dashboard stats
    const tokenRole = useMemo(() => {
        if (!accessToken) return null;
        try {
            const decoded = jwtDecode(accessToken);
            return decoded.role || null;
        } catch (error) {
            return null;
        }
    }, [accessToken]);

    const isUserRole = tokenRole === "user";

    // STRICT: Only fetch my dashboard stats if token role is EXACTLY user
    const { isPending: isLoading, data } = useQuery({
        queryKey: ["my-dashboard-stats"],
        queryFn: getMyDashboardStats,
        enabled: !!accessToken && isUserRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        isLoading,
        stats: data?.success ? data?.data : null,
    };
}

