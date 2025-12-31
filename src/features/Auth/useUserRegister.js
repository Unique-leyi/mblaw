import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { registerUser } from "../../services/apiUserAuth";

export function useUserRegister() {
    const navigate = useNavigate();
    const toast = useToast();

    const { mutate: register, isPending: isLoading } = useMutation({
        mutationKey: ['user-register'],
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (!data?.success) return;

            toast({
                title: "Account Created",
                description: data?.message || "Your account has been created successfully. Please sign in to continue.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            // Redirect to login page
            navigate("/login", { replace: true });
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
                    description: error?.data?.message || "An unexpected error occurred. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        register,
        isLoading
    };
}

