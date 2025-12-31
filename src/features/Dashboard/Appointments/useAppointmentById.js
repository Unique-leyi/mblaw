import { useQuery } from "@tanstack/react-query";
import { getAppointmentById as getAppointmentByIdApi } from "../../../services/apiAppointments";

export function useAppointmentById(id) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["appointment", id],
        queryFn: () => getAppointmentByIdApi(id),
        enabled: !!id,
    });

    return {
        appointment: data?.success ? data.data?.appointment : null,
        isLoading,
        error,
    };
}

