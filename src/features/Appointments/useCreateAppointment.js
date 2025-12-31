import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { createAppointment } from "../../services/apiAppointments";

export function useCreateAppointment() {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: createAppointmentMutate, isPending: isLoading } = useMutation({
        mutationKey: ["create-appointment"],
        mutationFn: createAppointment,
        onSuccess: () => {
            toast({
                title: "Appointment created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
        onError: (error) => {
            const description =
                error?.data?.message ||
                "An unexpected error occurred. Please try again.";

            toast({
                title: "Could not create appointment",
                description,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        },
    });

    return { createAppointment: createAppointmentMutate, isLoading };
}


