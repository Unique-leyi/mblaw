import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { verifyEmail } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useVerifyEmail() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: verifyEmailMutation, isPending: isVerifying } = useMutation({
        mutationKey: ['verify-email'],
        mutationFn: verifyEmail,
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries("user-profile");
                toast({
                    title: "Email Verified",
                    description: data?.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                navigate("/sign-in");
            }
        },
        onError: (error) => {
            if (error?.data?.success === false) {
                const errorMessage = error?.data.error || "Validation failed";
                const errorDetails = error?.data.errors?.map((err) => err.msg).join("; ") || "No additional details provided.";
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
                    description: error?.data?.error || "An unexpected error occurred. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return { 
        verifyEmailMutation, 
        isVerifying 
    };
}