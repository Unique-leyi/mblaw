import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getMyConsultations } from "../../services/apiUser";
import { getStoredTokens } from "../../util/helper";

export function useMyConsultations() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only users should fetch their consultations
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

    // STRICT: Only fetch my consultations if token role is EXACTLY user
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["myConsultations"],
        queryFn: getMyConsultations,
        enabled: !!accessToken && isUserRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        consultations: data?.success ? (data.data?.consultations || []) : [],
        isLoading,
        error,
        refetch,
    };
}

