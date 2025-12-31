import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getUsers } from "../../../services/apiUsers";
import { getStoredTokens } from "../../../util/helper";

export function useUsers() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only admins should fetch clients
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

    // STRICT: Only fetch clients if token role is EXACTLY admin/super_admin
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        users: data?.success ? (data.data?.users || []) : [],
        isLoading,
        error,
        refetch,
    };
}

