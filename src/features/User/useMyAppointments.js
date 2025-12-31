import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getMyAppointments } from "../../services/apiUser";
import { getStoredTokens } from "../../util/helper";

export function useMyAppointments() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only users should fetch their appointments
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

    // STRICT: Only fetch my appointments if token role is EXACTLY user
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["myAppointments"],
        queryFn: getMyAppointments,
        enabled: !!accessToken && isUserRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        appointments: data?.success ? (data.data?.appointments || []) : [],
        isLoading,
        error,
        refetch,
    };
}

