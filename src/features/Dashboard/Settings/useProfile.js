import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../../../services/apiAuth";
import { getCurrentUserProfile } from "../../../services/apiUserAuth";
import { getStoredTokens } from "../../../util/helper";

export function useProfile() {
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
        queryKey: ["profile", "admin"],
        queryFn: getProfile,
        enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
        retry: false,
    });

    // STRICT: Only fetch user profile if token role is EXACTLY user
    const { isPending: isLoadingUser, data: userData } = useQuery({
        queryKey: ["profile", "user"],
        queryFn: getCurrentUserProfile,
        enabled: !!accessToken && isUserRole === true, // STRICT: must be exactly true
        retry: false,
    });

    const isLoading = isAdminRole ? isLoadingAdmin : isLoadingUser;
    const data = isAdminRole ? adminData : userData;

    return {
        profile: data?.success ? (data.data?.user || null) : null,
        isLoading,
        error: data?.success ? null : data,
        refetch: () => {
            if (isAdminRole) {
                return getProfile().catch(() => null);
            } else if (isUserRole) {
                return getCurrentUserProfile().catch(() => null);
            }
            return Promise.resolve(null);
        },
    };
}

