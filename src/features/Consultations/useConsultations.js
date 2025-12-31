import { useQuery } from "@tanstack/react-query";
import { getConsultations } from "../../services/apiConsultations";

export function useConsultations() {
    const { data, isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["consultations"],
        queryFn: getConsultations,
    });

    return {
        consultations: data?.success ? (data.data?.consultations || []) : [],
        isLoading,
        error,
        refetch,
    };
}


