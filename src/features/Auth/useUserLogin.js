import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { loginUser } from "../../services/apiUserAuth";
import { saveTokens } from "../../util/helper";

export function useUserLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (!data?.success || !data?.data) return;

            const { token, user, role } = data.data || {};

            if (!token || !user) return;

            saveTokens(token);
            queryClient.setQueryData(["user", "client"], { success: true, data: { user } });

            toast({
                title: "Access Granted",
                description: "You have successfully logged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            // Redirect to user dashboard
            navigate("/my-account", { replace: true });
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
}

