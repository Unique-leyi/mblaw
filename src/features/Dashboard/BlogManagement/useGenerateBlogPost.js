import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { generateBlogPost } from "../../../services/apiAI";

export function useGenerateBlogPost() {
    const toast = useToast();

    const { mutate: generate, isPending: isLoading } = useMutation({
        mutationKey: ['generate-blog-post'],
        mutationFn: generateBlogPost,
        onSuccess: (data) => {
            if (data?.success) {
                toast({
                    title: "Blog post generated successfully",
                    description: "The AI has generated your blog post content.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
        onError: (error) => {
            if (error?.data?.success === false) {
                const errorMessage = error?.data?.message || "Failed to generate blog post";
                toast({
                    title: "Generation Failed",
                    description: errorMessage,
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
                    description: error?.data?.message || "Failed to generate blog post. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        generate,
        isLoading,
    };
}

