import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { updateProfile } from "../../../services/apiAuth";
import { updateUserProfile } from "../../../services/apiUserAuth";
import { useUser } from "../../Auth/useUser";

export function useUpdateProfile() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { role } = useUser();

    const { mutate: update, isPending: isLoading } = useMutation({
        mutationKey: ['update-profile'],
        mutationFn: (data) => {
            // Use appropriate API based on user role
            if (role === "user") {
                return updateUserProfile(data);
            }
            return updateProfile(data);
        },

        onSuccess: (data) => {
            if (data?.success) {
                // Invalidate profile queries
                queryClient.invalidateQueries({ queryKey: ["profile"] });
                queryClient.invalidateQueries({ queryKey: ["user"] });
                queryClient.invalidateQueries({ queryKey: ["user", "admin"] });
                queryClient.invalidateQueries({ queryKey: ["user", "client"] });
                toast({
                    title: "Profile Updated",
                    description: data?.message || "Your profile has been updated successfully.",
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
                    description: error?.data?.message || "Failed to update profile. Please try again.",
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

