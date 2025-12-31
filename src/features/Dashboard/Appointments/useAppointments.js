import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getAppointments } from "../../../services/apiAppointments";
import { getStoredTokens } from "../../../util/helper";

export function useAppointments() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only admins should fetch all appointments
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

    // STRICT: Only fetch appointments if token role is EXACTLY admin/super_admin
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["appointments"],
        queryFn: getAppointments,
        enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        appointments: data?.success ? (data.data?.appointments || []) : [],
        isLoading,
        error,
        refetch,
    };
}

