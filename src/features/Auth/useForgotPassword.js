import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { forgotPasswordAdmin, forgotPasswordUser } from "../../services/apiPasswordReset";

export function useForgotPassword() {
    const navigate = useNavigate();
    const toast = useToast();

    const { mutate: forgotPassword, isPending: isLoading } = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: async ({ email }) => {
            // Try admin first, then user (automatic detection)
            try {
                return await forgotPasswordAdmin(email);
            } catch (adminError) {
                // If admin fails, try user
                try {
                    return await forgotPasswordUser(email);
                } catch (userError) {
                    // Both failed, throw the admin error
                    throw adminError;
                }
            }
        },
        onSuccess: (data, variables) => {
            if (data?.success) {
                toast({
                    title: "Verification Code Sent",
                    description: "Please check your email for the verification code.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                navigate("/verify-otp", {
                    state: { email: variables.email }
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
                    description: error?.data?.message || "Failed to send verification code. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        forgotPassword,
        isLoading
    };
}
