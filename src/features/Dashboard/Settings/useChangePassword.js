import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { changePassword } from "../../../services/apiAuth";
import { changeUserPassword } from "../../../services/apiUserAuth";
import { useUser } from "../../Auth/useUser";

export function useChangePassword() {
    const toast = useToast();
    const { role } = useUser();

    const { mutate: change, isPending: isLoading } = useMutation({
        mutationKey: ['change-password'],
        mutationFn: (data) => {
            // Use appropriate API based on user role
            if (role === "user") {
                return changeUserPassword(data);
            }
            return changePassword(data);
        },

        onSuccess: (data) => {
            if (data?.success) {
                toast({
                    title: "Password Changed",
                    description: data?.message || "Your password has been changed successfully.",
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
                    description: error?.data?.message || "Failed to change password. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        change,
        isLoading
    };
}

