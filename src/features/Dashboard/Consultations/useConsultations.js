import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getConsultations } from "../../../services/apiConsultations";
import { getStoredTokens } from "../../../util/helper";

export function useConsultations() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only admins should fetch all consultations
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

    // STRICT: Only fetch consultations if token role is EXACTLY admin/super_admin
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["consultations"],
        queryFn: getConsultations,
        enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        consultations: data?.success ? (data.data?.consultations || []) : [],
        isLoading,
        error,
        refetch,
    };
}

