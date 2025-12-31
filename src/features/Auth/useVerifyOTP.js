import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { verifyOTPAdmin, verifyOTPUser } from "../../services/apiPasswordReset";

export function useVerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const email = location.state?.email || "";

    const { mutate: verifyOTP, isPending: isLoading } = useMutation({
        mutationKey: ['verify-otp'],
        mutationFn: async ({ code }) => {
            if (!email) {
                throw new Error("Email is required");
            }

            // Try admin first, then user (automatic detection)
            try {
                return await verifyOTPAdmin(email, code);
            } catch (adminError) {
                // If admin fails, try user
                try {
                    return await verifyOTPUser(email, code);
                } catch (userError) {
                    // Both failed, throw the admin error
                    throw adminError;
                }
            }
        },
        onSuccess: (data, variables) => {
            if (data?.success) {
                toast({
                    title: "Code Verified",
                    description: "Verification code verified successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                navigate("/reset-password", {
                    state: { email, code: variables.code }
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
                    description: error?.data?.message || "Invalid or expired verification code.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        verifyOTP,
        isLoading
    };
}

