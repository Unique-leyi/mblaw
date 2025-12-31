import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { updateClient } from "../../../services/apiUsers";

export function useUpdateClient() {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: update, isPending: isLoading } = useMutation({
        mutationKey: ['update-client'],
        mutationFn: ({ id, data }) => updateClient(id, data),

        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["users"] });
                queryClient.invalidateQueries({ queryKey: ["user"] });
                toast({
                    title: "Client Updated",
                    description: data?.message || "Client has been updated successfully.",
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
                    description: error?.data?.message || "Failed to update client. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        update,
        isLoading
    };
}

