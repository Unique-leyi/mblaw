import React from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Badge,
    Button,
    useToast,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { useMyConsultationById } from "./useMyConsultationById";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function MyConsultationDetail() {
    const { id } = useParams();
    const { consultation, isLoading } = useMyConsultationById(id);
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        const colors = {
            pending: "yellow",
            scheduled: "blue",
            completed: "green",
            cancelled: "red",
        };
        return colors[status] || "gray";
    };

    if (isLoading) {
        return (
            <Center h="400px">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (!consultation) {
        return (
            <Box w="full" p="40px" bg="gray.50" rounded="12px" textAlign="center">
                <Text fontSize="16px" color="brand.200">
                    Consultation not found.
                </Text>
            </Box>
        );
    }

    return (
        <Box w="full">
            <VStack w="full" align="start" spacing="24px">
                <HStack w="full" justify="space-between" align="center">
                    <Heading fontSize="24px" fontWeight={700} color="brand.100">
                        Consultation Details
                    </Heading>
                    <Button
                        leftIcon={<FiArrowLeft />}
                        onClick={() => navigate("/my-account/consultations")}
                    >
                        Back
                    </Button>
                </HStack>

                <Box w="full" bg="white" rounded="16px" p="24px">
                    <VStack w="full" align="start" spacing="20px">
                        <HStack w="full" justify="space-between">
                            <Text fontSize="16px" fontWeight={600} color="brand.100">
                                Status:
                            </Text>
                            <Badge colorScheme={getStatusColor(consultation.status)} fontSize="14px" px="12px" py="4px">
                                {consultation.status}
                            </Badge>
                        </HStack>

                        <HStack w="full" align="start" spacing="40px">
                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Name:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {consultation.firstName} {consultation.lastName}
                                </Text>
                            </VStack>

                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Email:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {consultation.email}
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack w="full" align="start" spacing="40px">
                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Phone:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {consultation.phone}
                                </Text>
                            </VStack>

                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Category:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {consultation.category}
                                </Text>
                            </VStack>
                        </HStack>

                        <VStack align="start" spacing="12px" w="full">
                            <Text fontSize="14px" fontWeight={600} color="brand.100">
                                Practice Area:
                            </Text>
                            <Text fontSize="14px" color="brand.200">
                                {consultation.practiceArea}
                            </Text>
                        </VStack>

                        <HStack w="full" align="start" spacing="40px">
                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Preferred Date:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {new Date(consultation.preferredDate).toLocaleDateString()}
                                </Text>
                            </VStack>

                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Preferred Time:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {consultation.preferredTime}
                                </Text>
                            </VStack>
                        </HStack>

                        <VStack align="start" spacing="12px" w="full">
                            <Text fontSize="14px" fontWeight={600} color="brand.100">
                                Case Summary:
                            </Text>
                            <Text fontSize="14px" color="brand.200" whiteSpace="pre-wrap">
                                {consultation.caseSummary}
                            </Text>
                        </VStack>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
}

