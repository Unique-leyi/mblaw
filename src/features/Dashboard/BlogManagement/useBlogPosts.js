import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { getBlogPosts } from "../../../services/apiBlogPosts";
import { getStoredTokens } from "../../../util/helper";

export function useBlogPosts(params = {}) {
    const { accessToken } = getStoredTokens();

    // Decode token to get role FIRST - only admins should fetch blog posts
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

    // STRICT: Only fetch blog posts if token role is EXACTLY admin/super_admin
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["blogPosts", params],
        queryFn: () => getBlogPosts(params),
        enabled: !!accessToken && isAdminRole === true, // STRICT: must be exactly true
        retry: false,
    });

    return {
        blogPosts: data?.success ? (data.data?.blogPosts || []) : [],
        isLoading,
        error,
        refetch,
    };
}

