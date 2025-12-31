import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { suggestAppointmentTimes } from "../../../services/apiAI";

export function useSuggestAppointmentTimes() {
    const toast = useToast();

    const { mutate: suggest, isPending: isLoading } = useMutation({
        mutationKey: ['suggest-appointment-times'],
        mutationFn: suggestAppointmentTimes,
        onSuccess: (data) => {
            if (data?.success) {
                toast({
                    title: "Appointment times suggested",
                    description: "The AI has suggested optimal appointment times.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
        onError: (error) => {
            if (error?.data?.success === false) {
                const errorMessage = error?.data?.message || "Failed to suggest appointment times";
                toast({
                    title: "Suggestion Failed",
                    description: errorMessage,
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
                    description: error?.data?.message || "Failed to suggest appointment times. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },
    });

    return {
        suggest,
        isLoading,
    };
}

