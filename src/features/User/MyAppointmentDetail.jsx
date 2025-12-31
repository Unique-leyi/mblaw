import React from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Badge,
    Button,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { useMyAppointmentById } from "./useMyAppointmentById";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function MyAppointmentDetail() {
    const { id } = useParams();
    const { appointment, isLoading } = useMyAppointmentById(id);
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        const colors = {
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

    if (!appointment) {
        return (
            <Box w="full" p="40px" bg="gray.50" rounded="12px" textAlign="center">
                <Text fontSize="16px" color="brand.200">
                    Appointment not found.
                </Text>
            </Box>
        );
    }

    return (
        <Box w="full">
            <VStack w="full" align="start" spacing="24px">
                <HStack w="full" justify="space-between" align="center">
                    <Heading fontSize="24px" fontWeight={700} color="brand.100">
                        Appointment Details
                    </Heading>
                    <Button
                        leftIcon={<FiArrowLeft />}
                        onClick={() => navigate("/my-account/appointments")}
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
                            <Badge colorScheme={getStatusColor(appointment.status)} fontSize="14px" px="12px" py="4px">
                                {appointment.status}
                            </Badge>
                        </HStack>

                        <HStack w="full" align="start" spacing="40px">
                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Client Name:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {appointment.clientName}
                                </Text>
                            </VStack>

                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Email:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {appointment.email}
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack w="full" align="start" spacing="40px">
                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Phone:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {appointment.phone}
                                </Text>
                            </VStack>

                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Practice Area:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {appointment.practiceArea}
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack w="full" align="start" spacing="40px">
                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Scheduled Date:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {new Date(appointment.scheduledDate).toLocaleDateString()}
                                </Text>
                            </VStack>

                            <VStack align="start" spacing="12px" flex="1">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Scheduled Time:
                                </Text>
                                <Text fontSize="14px" color="brand.200">
                                    {appointment.scheduledTime}
                                </Text>
                            </VStack>
                        </HStack>

                        {appointment.notes && (
                            <VStack align="start" spacing="12px" w="full">
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                    Notes:
                                </Text>
                                <Text fontSize="14px" color="brand.200" whiteSpace="pre-wrap">
                                    {appointment.notes}
                                </Text>
                            </VStack>
                        )}
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
}

