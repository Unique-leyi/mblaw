import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../services/apiAppointments";

export function useAppointments() {
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["appointments"],
        queryFn: getAppointments,
    });

    return {
        appointments: data?.success ? (data.data?.appointments || []) : [],
        isLoading,
        error,
        refetch,
    };
}


