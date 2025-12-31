import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  Button,
  Spinner,
  IconButton,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiZap, FiCalendar, FiClock } from "react-icons/fi";
import { useAppointmentById } from "./useAppointmentById";
import { useCreateAppointment } from "../../Appointments/useCreateAppointment";
import { useUpdateAppointment } from "./useUpdateAppointment";
import { useAppointments } from "./useAppointments";
import { useSuggestAppointmentTimes } from "./useSuggestAppointmentTimes";
import CtaButton from "../../../ui/CtaButton";

const practiceAreas = [
  "Immigration Law",
  "Real Estate Law",
  "Corporate Law",
  "Litigation and Dispute Resolution",
  "Family Law",
  "Criminal Law",
];

function AppointmentForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointment, isLoading: isLoadingAppointment } = isEdit ? useAppointmentById(id) : { appointment: null, isLoading: false };
  const { createAppointment, isLoading: isCreating } = useCreateAppointment();
  const { updateAppointment, isUpdating } = useUpdateAppointment();
  const { appointments: allAppointments } = useAppointments();
  const { suggest, isLoading: isSuggesting } = useSuggestAppointmentTimes();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [suggestions, setSuggestions] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      clientName: "",
      email: "",
      phone: "",
      practiceArea: "",
      scheduledDate: "",
      scheduledTime: "",
      notes: "",
    },
  });

  const preferredDate = watch("scheduledDate");
  const preferredTime = watch("scheduledTime");
  const practiceArea = watch("practiceArea");

  useEffect(() => {
    if (isEdit && appointment) {
      reset({
        clientName: appointment.clientName || "",
        email: appointment.email || "",
        phone: appointment.phone || "",
        practiceArea: appointment.practiceArea || "",
        scheduledDate: appointment.scheduledDate || "",
        scheduledTime: appointment.scheduledTime || "",
        notes: appointment.notes || "",
      });
    }
  }, [isEdit, appointment, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateAppointment(id, data);
    } else {
      createAppointment(data, {
        onSuccess: () => {
          navigate("/dashboard/appointments");
        },
      });
    }
  };

  const handleGetSuggestions = () => {
    // Format existing appointments for AI
    const existingAppointments = (allAppointments || [])
      .filter((apt) => apt.id !== (isEdit ? id : null))
      .map((apt) => ({
        scheduledDate: apt.scheduledDate,
        scheduledTime: apt.scheduledTime,
        practiceArea: apt.practiceArea,
      }));

    suggest(
      {
        existingAppointments,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        practiceArea: practiceArea || null,
        duration: 60,
      },
      {
        onSuccess: (response) => {
          if (response?.success && response?.data) {
            setSuggestions(response.data);
            onOpen();
          }
        },
      }
    );
  };

  const handleUseSuggestion = (date, time) => {
    setValue("scheduledDate", date);
    setValue("scheduledTime", time);
    setSuggestions(null);
    onClose();
  };

  if (isEdit && isLoadingAppointment) {
    return (
      <VStack py="40px">
        <Spinner size="lg" color="brand.100" />
      </VStack>
    );
  }

  return (
    <VStack w="full" align="start" spacing="16px">
      <HStack w="full" justify="space-between" align="center">
        <HStack gap="12px">
          <IconButton
            icon={<FiArrowLeft />}
            onClick={() => navigate("/dashboard/appointments")}
            aria-label="Go back"
          />
          <VStack align="start" spacing="4px">
            <Heading
              fontSize={["24px", "26px", "30px"]}
              fontWeight={700}
              color="brand.100"
            >
              {isEdit ? "Edit Appointment" : "Create Appointment"}
            </Heading>
            <Text fontSize="16px" color="brand.200">
              {isEdit
                ? "Update appointment details."
                : "Schedule a new appointment with a client."}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Box w="full" bg="white" rounded="16px" p="24px">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <VStack w="full" align="start" spacing="24px">
            <FormControl isInvalid={!!errors.clientName}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Client Name *
              </FormLabel>
              <Input
                {...register("clientName", {
                  required: "Client name is required",
                })}
                placeholder="Enter client name"
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
              <FormErrorMessage>
                {errors.clientName && errors.clientName.message}
              </FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={[1, 1, 2]} gap="20px" w="full">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                  Email *
                </FormLabel>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="client@example.com"
                  fontSize="14px"
                  color="brand.200"
                  _placeholder={{ color: "brand.200" }}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                  Phone *
                </FormLabel>
                <Input
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  type="tel"
                  placeholder="+1-647-642-2117"
                  fontSize="14px"
                  color="brand.200"
                  _placeholder={{ color: "brand.200" }}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={!!errors.practiceArea}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Practice Area *
              </FormLabel>
              <Select
                {...register("practiceArea", {
                  required: "Practice area is required",
                })}
                placeholder="Select practice area"
                fontSize="14px"
                color="brand.200"
              >
                {practiceAreas.map((area) => (
                  <option key={area} value={area} style={{ color: "#121416" }}>
                    {area}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.practiceArea && errors.practiceArea.message}
              </FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={[1, 1, 2]} gap="20px" w="full">
              <FormControl isInvalid={!!errors.scheduledDate}>
                <HStack justify="space-between" align="center" mb="8px">
                  <FormLabel fontSize="14px" fontWeight={500} color="brand.100" mb={0}>
                    Scheduled Date *
                  </FormLabel>
                  <Button
                    type="button"
                    size="xs"
                    leftIcon={<FiZap />}
                    colorScheme="purple"
                    variant="outline"
                    onClick={handleGetSuggestions}
                    isDisabled={isSuggesting}
                  >
                    AI Suggest
                  </Button>
                </HStack>
                <Input
                  {...register("scheduledDate", {
                    required: "Scheduled date is required",
                  })}
                  type="date"
                  fontSize="14px"
                  color="brand.200"
                />
                <FormErrorMessage>
                  {errors.scheduledDate && errors.scheduledDate.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.scheduledTime}>
                <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                  Scheduled Time *
                </FormLabel>
                <Input
                  {...register("scheduledTime", {
                    required: "Scheduled time is required",
                  })}
                  type="time"
                  fontSize="14px"
                  color="brand.200"
                />
                <FormErrorMessage>
                  {errors.scheduledTime && errors.scheduledTime.message}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Notes
              </FormLabel>
              <Textarea
                {...register("notes")}
                placeholder="Additional notes about the appointment (optional)"
                rows={4}
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
            </FormControl>

            <HStack w="full" justify="flex-end" gap="12px" pt="8px">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard/appointments")}
              >
                Cancel
              </Button>
              <CtaButton
                isFull={false}
                isLink={false}
                btnText={isEdit ? "Update Appointment" : "Create Appointment"}
                isDisabled={isSubmitting || isCreating || isUpdating}
                isLoading={isSubmitting || isCreating || isUpdating}
                handleClick={handleSubmit(onSubmit)}
              />
            </HStack>
          </VStack>
        </form>
      </Box>

      {/* AI Suggestions Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Appointment Time Suggestions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isSuggesting ? (
              <VStack py="40px">
                <Spinner size="lg" color="brand.100" />
                <Text fontSize="14px" color="brand.200">
                  Analyzing schedule and generating suggestions...
                </Text>
              </VStack>
            ) : suggestions ? (
              <VStack spacing="20px" align="stretch">
                {suggestions.suggestedTimes && suggestions.suggestedTimes.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Recommended Times
                    </Heading>
                    <VStack spacing="12px" align="stretch">
                      {suggestions.suggestedTimes.map((suggestion, idx) => (
                        <Box
                          key={idx}
                          p="16px"
                          border="1px solid"
                          borderColor="gray.200"
                          rounded="8px"
                          bg="green.50"
                        >
                          <HStack justify="space-between" align="start">
                            <VStack align="start" spacing="4px">
                              <HStack>
                                <Icon as={FiCalendar} color="brand.100" />
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                  {new Date(suggestion.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </Text>
                              </HStack>
                              <HStack>
                                <Icon as={FiClock} color="brand.100" />
                                <Text fontSize="14px" color="brand.200">
                                  {suggestion.time}
                                </Text>
                              </HStack>
                              <Text fontSize="12px" color="brand.200" mt="4px">
                                {suggestion.reason}
                              </Text>
                              {suggestion.confidence && (
                                <Badge
                                  colorScheme={
                                    suggestion.confidence === "high"
                                      ? "green"
                                      : suggestion.confidence === "medium"
                                      ? "yellow"
                                      : "gray"
                                  }
                                  fontSize="10px"
                                >
                                  {suggestion.confidence} confidence
                                </Badge>
                              )}
                            </VStack>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={() => handleUseSuggestion(suggestion.date, suggestion.time)}
                            >
                              Use
                            </Button>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}

                {suggestions.alternativeTimes && suggestions.alternativeTimes.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Alternative Times
                    </Heading>
                    <VStack spacing="12px" align="stretch">
                      {suggestions.alternativeTimes.map((alt, idx) => (
                        <Box
                          key={idx}
                          p="16px"
                          border="1px solid"
                          borderColor="gray.200"
                          rounded="8px"
                          bg="gray.50"
                        >
                          <HStack justify="space-between" align="start">
                            <VStack align="start" spacing="4px">
                              <HStack>
                                <Icon as={FiCalendar} color="brand.100" />
                                <Text fontSize="14px" fontWeight={600} color="brand.100">
                                  {new Date(alt.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </Text>
                              </HStack>
                              <HStack>
                                <Icon as={FiClock} color="brand.100" />
                                <Text fontSize="14px" color="brand.200">
                                  {alt.time}
                                </Text>
                              </HStack>
                              <Text fontSize="12px" color="brand.200" mt="4px">
                                {alt.reason}
                              </Text>
                            </VStack>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUseSuggestion(alt.date, alt.time)}
                            >
                              Use
                            </Button>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}

                {suggestions.recommendations && suggestions.recommendations.length > 0 && (
                  <Box p="16px" bg="blue.50" rounded="8px" border="1px solid" borderColor="blue.200">
                    <Heading fontSize="14px" fontWeight={600} color="brand.100" mb="8px">
                      Recommendations
                    </Heading>
                    <VStack align="start" spacing="4px">
                      {suggestions.recommendations.map((rec, idx) => (
                        <Text key={idx} fontSize="12px" color="brand.200">
                          • {rec}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default AppointmentForm;

