import { useQuery } from "@tanstack/react-query";
import { getMyConsultationById } from "../../services/apiUser";

export function useMyConsultationById(id) {
    const { data, isPending: isLoading, error } = useQuery({
        queryKey: ["myConsultation", id],
        queryFn: () => getMyConsultationById(id),
        enabled: !!id,
    });

    return {
        consultation: data?.success ? (data.data?.consultation || null) : null,
        isLoading,
        error,
    };
}

