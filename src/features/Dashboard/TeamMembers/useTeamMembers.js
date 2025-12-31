import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getAdmins } from "../../../services/apiAdmins";
import { getStoredTokens } from "../../../util/helper";

export function useTeamMembers() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only super_admin should fetch team members
    const tokenRole = useMemo(() => {
        if (!accessToken) return null;
        try {
            const decoded = jwtDecode(accessToken);
            return decoded.role || null;
        } catch (error) {
            return null;
        }
    }, [accessToken]);

    const isSuperAdmin = tokenRole === "super_admin";

    // STRICT: Only fetch team members if token role is EXACTLY super_admin
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["admins"],
        queryFn: getAdmins,
        enabled: !!accessToken && isSuperAdmin === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        teamMembers: data?.success ? (data.data?.admins || []) : [],
        isLoading,
        error,
        refetch,
    };
}

