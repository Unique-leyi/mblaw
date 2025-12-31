import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getContacts } from "../../../services/apiContact";
import { getStoredTokens } from "../../../util/helper";

export function useContacts() {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only super_admin should fetch contacts
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

    // STRICT: Only fetch contacts if token role is EXACTLY super_admin
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
        enabled: !!accessToken && isSuperAdmin === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        contacts: data?.success ? (data.data?.contacts || []) : [],
        isLoading,
        error,
        refetch,
    };
}

