import { useQuery } from "@tanstack/react-query";
import { getBlogPostById as getBlogPostByIdApi } from "../../../services/apiBlogPosts";

export function useBlogPostById(id) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["blogPost", id],
        queryFn: () => getBlogPostByIdApi(id),
        enabled: !!id,
    });

    return {
        blogPost: data?.success ? data.data?.blogPost : null,
        isLoading,
        error,
    };
}

