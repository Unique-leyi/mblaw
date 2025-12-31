import { useQuery } from "@tanstack/react-query";
import { getConsultationById as getConsultationByIdApi } from "../../../services/apiConsultations";

export function useConsultationById(id) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["consultation", id],
        queryFn: () => getConsultationByIdApi(id),
        enabled: !!id,
    });

    return {
        consultation: data?.success ? data.data?.consultation : null,
        isLoading,
        error,
    };
}

