import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { login as loginAdmin } from "../../services/apiAuth";
import { loginUser } from "../../services/apiUserAuth";
import { saveTokens } from "../../util/helper";

export function useUnifiedLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();

    const { mutate: login, isPending: isLoading } = useMutation({
        mutationKey: ['unified-login'],
        mutationFn: async ({ email, password }) => {
            // Try admin login first
            try {
                const adminResponse = await loginAdmin({ email, password });
                if (adminResponse?.success) {
                    return { ...adminResponse, userType: "admin" };
                }
                // If admin login didn't return success, try user login
            } catch (adminError) {
                // Admin login failed (401, 404, etc.), try user login
            }

            // Try user login (either admin login failed or didn't return success)
            try {
                const userResponse = await loginUser({ email, password });
                if (userResponse?.success) {
                    return { ...userResponse, userType: "user" };
                }
                // If user login didn't return success, throw error
                throw new Error("Login failed - invalid credentials");
            } catch (userError) {
                // If user login also failed, throw the error
                throw userError;
            }
        },
        onSuccess: (data) => {
            if (!data?.success || !data?.data) return;

            const { token, user } = data.data || {};

            if (!token || !user) return;

            saveTokens(token);

            // Set query data based on user type
            if (data.userType === "admin") {
                queryClient.setQueryData(["user", "admin"], { success: true, data: { user } });
            } else {
                queryClient.setQueryData(["user", "client"], { success: true, data: { user } });
            }

            toast({
                title: "Access Granted",
                description: data?.message || "You have successfully logged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            // Redirect based on userType (which login succeeded)
            if (data.userType === "admin") {
                // Admin or super_admin - redirect to dashboard
                navigate("/dashboard", { replace: true });
            } else {
                // Regular user - redirect to my-account
                navigate("/my-account", { replace: true });
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
                    description: error?.data?.message || "Invalid email or password. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        login,
        isLoading
    };
}

