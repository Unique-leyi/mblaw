import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { resetPasswordAdmin, resetPasswordUser } from "../../services/apiPasswordReset";

export function useResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const { email, code } = location.state || {};

    const { mutate: resetPassword, isPending: isLoading } = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: async ({ newPassword }) => {
            if (!email || !code) {
                throw new Error("Email and code are required");
            }

            // Try admin first, then user (automatic detection)
            try {
                return await resetPasswordAdmin(email, code, newPassword);
            } catch (adminError) {
                // If admin fails, try user
                try {
                    return await resetPasswordUser(email, code, newPassword);
                } catch (userError) {
                    // Both failed, throw the admin error
                    throw adminError;
                }
            }
        },
        onSuccess: (data) => {
            if (data?.success) {
                toast({
                    title: "Password Reset Successful",
                    description: "Your password has been reset successfully. Please login with your new password.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                navigate("/login", { replace: true });
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
                    description: error?.data?.message || "Failed to reset password. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        resetPassword,
        isLoading
    };
}

