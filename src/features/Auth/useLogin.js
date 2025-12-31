
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { login as loginApi } from "../../services/apiAuth";
import { saveTokens } from "../../util/helper";

export function useLogin() {

    const navigate = useNavigate();
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: login, isPending: isLoading } = useMutation({
        mutationKey: ['login'],
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (data) => {
            if (!data?.success || !data?.data) return;

            const { token, user, role } = data.data || {};

            if (!token || !user) return;

            saveTokens(token);
            queryClient.setQueryData(["user"], { success: true, user });

            toast({
                title: "Access Granted",
                description: "You have successfully logged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            if (role === "super_admin" || role === "admin" || user.role === "super_admin" || user.role === "admin") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        },

        onError: (error) => {
            if (error?.status === "OFFLINE") {
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
        login,
        isLoading
    };
}