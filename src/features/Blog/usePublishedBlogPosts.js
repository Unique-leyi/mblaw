import { useQuery } from "@tanstack/react-query";
import { getPublishedBlogPosts } from "../../services/apiBlogPosts";

export function usePublishedBlogPosts(params = {}) {
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["publishedBlogPosts", params],
        queryFn: () => getPublishedBlogPosts(params),
    });

    return {
        blogPosts: data?.success ? (data.data?.blogPosts || []) : [],
        isLoading,
        error,
        refetch,
    };
}

