import React from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  SimpleGrid,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppointmentById } from "./useAppointmentById";

function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointment, isLoading } = useAppointmentById(id);

  if (isLoading) {
    return (
      <VStack py="40px">
        <Spinner size="lg" color="brand.100" />
      </VStack>
    );
  }

  if (!appointment) {
    return (
      <VStack py="40px">
        <Text>Appointment not found</Text>
        <Button onClick={() => navigate("/dashboard/appointments")}>
          Back to Appointments
        </Button>
      </VStack>
    );
  }

  return (
    <VStack w="full" align="start" spacing="24px">
      <HStack w="full" justify="space-between" align="center">
        <VStack align="start" spacing="4px">
          <Heading
            fontSize={["24px", "26px", "30px"]}
            fontWeight={700}
            color="brand.100"
          >
            Appointment Details
          </Heading>
          <Text fontSize="16px" color="brand.200">
            View appointment information and details.
          </Text>
        </VStack>
        <HStack gap="12px">
          <Button 
            onClick={() => navigate(`/dashboard/appointments/${id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard/appointments")}
          >
            Back to List
          </Button>
        </HStack>
      </HStack>

      <Box w="full" bg="white" rounded="16px" p="24px">
        <VStack align="start" spacing="24px">
          {/* Status Section */}
          <HStack w="full" justify="space-between" align="center">
            <Text fontSize="18px" fontWeight={600} color="brand.100">
              Status
            </Text>
            <Badge
              fontSize="14px"
              px="12px"
              py="4px"
              colorScheme={
                appointment.status === "scheduled"
                  ? "blue"
                  : appointment.status === "completed"
                  ? "green"
                  : appointment.status === "cancelled"
                  ? "red"
                  : "gray"
              }
              textTransform="capitalize"
            >
              {appointment.status || "scheduled"}
            </Badge>
          </HStack>

          <Divider />

          {/* Client Information */}
          <VStack align="start" spacing="16px" w="full">
            <Heading fontSize="20px" fontWeight={600} color="brand.100">
              Client Information
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap="16px" w="full">
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Client Name
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {appointment.clientName}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Email Address
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {appointment.email}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Phone Number
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {appointment.phone}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Practice Area
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {appointment.practiceArea}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Appointment Details */}
          <VStack align="start" spacing="16px" w="full">
            <Heading fontSize="20px" fontWeight={600} color="brand.100">
              Appointment Details
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap="16px" w="full">
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Scheduled Date
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {appointment.scheduledDate}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Scheduled Time
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {appointment.scheduledTime}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          {appointment.notes && (
            <>
              <Divider />
              <VStack align="start" spacing="16px" w="full">
                <Heading fontSize="20px" fontWeight={600} color="brand.100">
                  Notes
                </Heading>
                <Box w="full">
                  <Text fontSize="16px" color="brand.100" whiteSpace="pre-wrap">
                    {appointment.notes}
                  </Text>
                </Box>
              </VStack>
            </>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}

export default AppointmentDetail;

