import React, { useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { FiZap, FiCheckCircle, FiCalendar, FiAlertTriangle, FiTarget } from "react-icons/fi";
import { useConsultationById } from "./useConsultationById";
import { useUpdateConsultationStatus } from "./useUpdateConsultationStatus";
import { useSummarizeDocument } from "./useSummarizeDocument";

function ConsultationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { consultation, isLoading } = useConsultationById(id);
  const { updateStatus, isUpdating } = useUpdateConsultationStatus();
  const { summarize, isLoading: isSummarizing } = useSummarizeDocument();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [summary, setSummary] = useState(null);

  const handleStatusUpdate = async (newStatus) => {
    await updateStatus(id, newStatus);
  };

  const handleSummarize = () => {
    if (!consultation?.caseSummary) return;
    
    summarize(
      {
        documentText: consultation.caseSummary,
        documentType: "consultation",
      },
      {
        onSuccess: (response) => {
          if (response?.success && response?.data) {
            setSummary(response.data);
            onOpen();
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <VStack py="40px">
        <Spinner size="lg" color="brand.100" />
      </VStack>
    );
  }

  if (!consultation) {
    return (
      <VStack py="40px">
        <Text>Consultation not found</Text>
        <Button onClick={() => navigate("/dashboard/consultations")}>
          Back to Consultations
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
            Consultation Details
          </Heading>
          <Text fontSize="16px" color="brand.200">
            View and manage consultation request details.
          </Text>
        </VStack>
        <Button onClick={() => navigate("/dashboard/consultations")}>
          Back to List
        </Button>
      </HStack>

      <Box w="full" bg="white" rounded="16px" p="24px">
        <VStack align="start" spacing="24px">
          {/* Status Section */}
          <HStack w="full" justify="space-between" align="center">
            <Text fontSize="18px" fontWeight={600} color="brand.100">
              Status
            </Text>
            <HStack gap="12px">
              <Badge
                fontSize="14px"
                px="12px"
                py="4px"
                colorScheme={
                  consultation.status === "pending"
                    ? "yellow"
                    : consultation.status === "approved"
                    ? "green"
                    : "red"
                }
                textTransform="capitalize"
              >
                {consultation.status || "pending"}
              </Badge>
              {consultation.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleStatusUpdate("approved")}
                    isLoading={isUpdating}
                    isDisabled={isUpdating}
                    loadingText="Approving..."
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleStatusUpdate("rejected")}
                    isLoading={isUpdating}
                    isDisabled={isUpdating}
                    loadingText="Rejecting..."
                  >
                    Reject
                  </Button>
                </>
              )}
            </HStack>
          </HStack>

          <Divider />

          {/* Personal Information */}
          <VStack align="start" spacing="16px" w="full">
            <Heading fontSize="20px" fontWeight={600} color="brand.100">
              Personal Information
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap="16px" w="full">
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  First Name
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.firstName}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Last Name
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.lastName}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Email Address
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.email}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Phone Number
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.phone}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Consultation Details */}
          <VStack align="start" spacing="16px" w="full">
            <Heading fontSize="20px" fontWeight={600} color="brand.100">
              Consultation Details
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap="16px" w="full">
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Category
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100" textTransform="capitalize">
                  {consultation.category}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Practice Area
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.practiceArea}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Preferred Date
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.preferredDate}
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px" color="brand.200" mb="4px">
                  Preferred Time
                </Text>
                <Text fontSize="16px" fontWeight={500} color="brand.100">
                  {consultation.preferredTime}
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          <Divider />

          {/* Case Summary */}
          <VStack align="start" spacing="16px" w="full">
            <HStack w="full" justify="space-between" align="center">
              <Heading fontSize="20px" fontWeight={600} color="brand.100">
                Case Summary
              </Heading>
              <Button
                size="sm"
                leftIcon={<FiZap />}
                colorScheme="purple"
                variant="outline"
                onClick={handleSummarize}
                isLoading={isSummarizing}
                isDisabled={isSummarizing || !consultation?.caseSummary}
              >
                AI Summarize
              </Button>
            </HStack>
            <Box w="full">
              <Text fontSize="16px" color="brand.100" whiteSpace="pre-wrap">
                {consultation.caseSummary}
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>

      {/* AI Summary Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Document Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {summary && (
              <VStack spacing="20px" align="stretch">
                <Alert
                  status={summary.urgency === "high" ? "error" : summary.urgency === "medium" ? "warning" : "info"}
                  borderRadius="8px"
                >
                  <AlertIcon />
                  <Text fontSize="14px" fontWeight={600}>
                    Urgency: {summary.urgency?.toUpperCase() || "MEDIUM"}
                  </Text>
                </Alert>

                <Box>
                  <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                    Summary
                  </Heading>
                  <Text fontSize="14px" color="brand.200" lineHeight="1.6">
                    {summary.summary}
                  </Text>
                </Box>

                {summary.keyPoints && summary.keyPoints.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Key Points
                    </Heading>
                    <List spacing="8px">
                      {summary.keyPoints.map((point, idx) => (
                        <ListItem key={idx}>
                          <ListIcon as={FiCheckCircle} color="brand.100" />
                          <Text as="span" fontSize="14px" color="brand.200">
                            {point}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {summary.importantDates && summary.importantDates.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Important Dates
                    </Heading>
                    <List spacing="8px">
                      {summary.importantDates.map((date, idx) => (
                        <ListItem key={idx}>
                          <ListIcon as={FiCalendar} color="brand.100" />
                          <Text as="span" fontSize="14px" color="brand.200">
                            {date}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {summary.legalIssues && summary.legalIssues.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Legal Issues
                    </Heading>
                    <List spacing="8px">
                      {summary.legalIssues.map((issue, idx) => (
                        <ListItem key={idx}>
                          <ListIcon as={FiAlertTriangle} color="orange.500" />
                          <Text as="span" fontSize="14px" color="brand.200">
                            {issue}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {summary.actionItems && summary.actionItems.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Action Items
                    </Heading>
                    <List spacing="8px">
                      {summary.actionItems.map((action, idx) => (
                        <ListItem key={idx}>
                          <ListIcon as={FiTarget} color="brand.100" />
                          <Text as="span" fontSize="14px" color="brand.200">
                            {action}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {summary.recommendations && summary.recommendations.length > 0 && (
                  <Box>
                    <Heading fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
                      Recommendations
                    </Heading>
                    <List spacing="8px">
                      {summary.recommendations.map((rec, idx) => (
                        <ListItem key={idx}>
                          <ListIcon as={FiCheckCircle} color="green.500" />
                          <Text as="span" fontSize="14px" color="brand.200">
                            {rec}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default ConsultationDetail;

