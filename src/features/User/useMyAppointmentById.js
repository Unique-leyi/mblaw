import { useQuery } from "@tanstack/react-query";
import { getMyAppointmentById } from "../../services/apiUser";

export function useMyAppointmentById(id) {
    const { data, isPending: isLoading, error } = useQuery({
        queryKey: ["myAppointment", id],
        queryFn: () => getMyAppointmentById(id),
        enabled: !!id,
    });

    return {
        appointment: data?.success ? (data.data?.appointment || null) : null,
        isLoading,
        error,
    };
}

