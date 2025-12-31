import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { updateAppointment as updateAppointmentApi } from "../../../services/apiAppointments";

export function useUpdateAppointment() {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { mutate: updateAppointment, isPending: isUpdating } = useMutation({
        mutationKey: ["updateAppointment"],
        mutationFn: ({ id, data }) => updateAppointmentApi(id, data),

        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["appointments"] });
                queryClient.invalidateQueries({ queryKey: ["appointment"] });
                toast({
                    title: "Appointment Updated",
                    description: "The appointment has been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        },

        onError: (error) => {
            toast({
                title: "Error",
                description: error?.data?.message || "Failed to update appointment. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        },
    });

    return {
        updateAppointment: (id, data) => updateAppointment({ id, data }),
        isUpdating,
    };
}

