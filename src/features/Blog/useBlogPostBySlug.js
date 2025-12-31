import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug as getBlogPostBySlugApi } from "../../services/apiBlogPosts";

export function useBlogPostBySlug(slug) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["blogPostBySlug", slug],
        queryFn: () => getBlogPostBySlugApi(slug),
        enabled: !!slug,
    });

    return {
        blogPost: data?.success ? data.data?.blogPost : null,
        isLoading,
        error,
    };
}

