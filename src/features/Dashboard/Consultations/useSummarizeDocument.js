import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { summarizeDocument } from "../../../services/apiAI";

export function useSummarizeDocument() {
    const toast = useToast();

    const { mutate: summarize, isPending: isLoading } = useMutation({
        mutationKey: ['summarize-document'],
        mutationFn: summarizeDocument,
        onSuccess: (data) => {
            if (data?.success) {
                toast({
                    title: "Document summarized successfully",
                    description: "The AI has analyzed and summarized the document.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
        onError: (error) => {
            if (error?.data?.success === false) {
                const errorMessage = error?.data?.message || "Failed to summarize document";
                toast({
                    title: "Summarization Failed",
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
                    description: error?.data?.message || "Failed to summarize document. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        summarize,
        isLoading,
    };
}

