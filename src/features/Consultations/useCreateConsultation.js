import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { createConsultationPublic } from "../../services/apiConsultations";

export function useCreateConsultation() {
    const toast = useToast();

    const { mutate: createConsultation, isPending: isLoading } = useMutation({
        mutationKey: ["create-consultation"],
        mutationFn: createConsultationPublic,
        onSuccess: () => {
            toast({
                title: "Consultation booked",
                description:
                    "Your consultation request has been received. We will contact you shortly.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        },
        onError: (error) => {
            const description =
                error?.data?.message ||
                "An unexpected error occurred. Please try again.";

            toast({
                title: "Could not book consultation",
                description,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        },
    });

    return { createConsultation, isLoading };
}


