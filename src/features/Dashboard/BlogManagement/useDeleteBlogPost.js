import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { deleteBlogPost as deleteBlogPostApi } from "../../../services/apiBlogPosts";

export function useDeleteBlogPost() {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: deleteBlogPost, isPending: isDeleting } = useMutation({
        mutationKey: ["deleteBlogPost"],
        mutationFn: (id) => deleteBlogPostApi(id),

        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
                toast({
                    title: "Blog Post Deleted",
                    description: "The blog post has been successfully deleted.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },

        onError: (error) => {
            if (error?.data?.success === false) {
                const errorMessage = error?.data?.message || "Validation failed";
                const errorDetails = error?.data?.errors?.map((err) => err.msg).join("; ") || "No additional details provided.";
                toast({
                    title: errorMessage,
                    description: errorDetails,
                    status: "error",
                    duration: 7000,
                    isClosable: true,
                    position: "top-right",
                });
            } else if (error?.status === "OFFLINE") {
                toast({
                    title: "No Internet Connection",
                    description: error.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            } else if (error instanceof TypeError && error.message === "Failed to fetch") {
                toast({
                    title: "Network Error",
                    description: "Unable to connect to the server. Please check your internet connection.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            } else {
                toast({
                    title: "Error Occurred",
                    description: error?.data?.message || "Failed to delete blog post. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        deleteBlogPost,
        isDeleting,
    };
}

