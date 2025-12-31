import React, { useState, useMemo } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useConsultations } from "./useConsultations";
import { useDeleteConsultation } from "./useDeleteConsultation";
import { FiEye, FiTrash2, FiSearch, FiFileText, FiClock, FiCheckCircle } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";
import DeleteConfirmationModal from "../../../ui/DeleteConfirmationModal";

function ConsultationsList() {
  const navigate = useNavigate();
  const { consultations: allConsultations, isLoading, refetch } = useConsultations();
  const { deleteConsultation, isDeleting } = useDeleteConsultation();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, itemName: null });

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allConsultations?.length || 0;
    const pending = allConsultations?.filter((c) => c.status === "pending").length || 0;
    const completed = allConsultations?.filter((c) => c.status === "completed").length || 0;
    const scheduled = allConsultations?.filter((c) => c.status === "scheduled").length || 0;
    const cancelled = allConsultations?.filter((c) => c.status === "cancelled").length || 0;

    return { total, pending, completed, scheduled, cancelled };
  }, [allConsultations]);

  // Filter and search consultations
  const filteredConsultations = useMemo(() => {
    let filtered = allConsultations || [];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((consultation) => consultation.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (consultation) =>
          `${consultation.firstName} ${consultation.lastName}`.toLowerCase().includes(query) ||
          consultation.email?.toLowerCase().includes(query) ||
          consultation.phone?.toLowerCase().includes(query) ||
          consultation.practiceArea?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allConsultations, statusFilter, searchQuery]);

  // Paginate consultations
  const paginatedConsultations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredConsultations.slice(startIndex, endIndex);
  }, [filteredConsultations, currentPage]);

  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const handleView = (id) => {
    navigate(`/dashboard/consultations/${id}`);
  };

  const handleDeleteClick = (id, consultation) => {
    const itemName = `${consultation.firstName || ""} ${consultation.lastName || ""}`.trim() || "Consultation";
    setDeleteModal({ isOpen: true, id, itemName });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.id) {
      await deleteConsultation(deleteModal.id);
      refetch();
      setDeleteModal({ isOpen: false, id: null, itemName: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, id: null, itemName: null });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "yellow";
      case "scheduled":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <VStack w="full" align="start" gap="30px">
      {/* Header */}
      <VStack w="full" align="start" gap="8px">
        <Heading
          fontSize={["28px", "32px", "36px"]}
          fontWeight={700}
          color="brand.100"
          lineHeight="40px"
        >
          Consultations
        </Heading>
        <Text fontSize="16px" color="brand.200" fontWeight={400}>
          Review and manage all consultation requests submitted from the website.
        </Text>
      </VStack>

      {/* Metrics Cards - 3 Columns */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" w="full">
        <Box
          bg="white"
          rounded="16px"
          p="24px"
          border="1px solid"
          borderColor="#E5E7EB"
          _hover={{
            boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start" mb="16px">
            <VStack align="start" gap="4px" flex="1">
              <Text fontSize="14px" color="brand.200" fontWeight={400} lineHeight="20px">
                Total Consultations
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="brand.100" lineHeight="40px">
                {metrics.total}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, brand.100, brand.600)" p="12px" rounded="12px" color="white">
              <Icon as={FiFileText} boxSize="24px" />
            </Box>
          </HStack>
        </Box>

        <Box
          bg="white"
          rounded="16px"
          p="24px"
          border="1px solid"
          borderColor="#E5E7EB"
          _hover={{
            boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start" mb="16px">
            <VStack align="start" gap="4px" flex="1">
              <Text fontSize="14px" color="brand.200" fontWeight={400} lineHeight="20px">
                Pending Consultations
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#F59E0B" lineHeight="40px">
                {metrics.pending}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #F59E0B, #D97706)" p="12px" rounded="12px" color="white">
              <Icon as={FiClock} boxSize="24px" />
            </Box>
          </HStack>
        </Box>

        <Box
          bg="white"
          rounded="16px"
          p="24px"
          border="1px solid"
          borderColor="#E5E7EB"
          _hover={{
            boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start" mb="16px">
            <VStack align="start" gap="4px" flex="1">
              <Text fontSize="14px" color="brand.200" fontWeight={400} lineHeight="20px">
                Completed Consultations
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#10B981" lineHeight="40px">
                {metrics.completed}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #10B981, #059669)" p="12px" rounded="12px" color="white">
              <Icon as={FiCheckCircle} boxSize="24px" />
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Search and Filter Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="16px" w="full">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="brand.200" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, email, phone, or practice area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
              border="1px solid"
              borderColor="#E5E7EB"
              color="brand.200"
              fontSize="16px"
              _placeholder={{
                color: "brand.200",
                fontSize: "14px",
              }}
              _focus={{
                borderColor: "brand.100",
                boxShadow: "0 0 0 1px brand.100",
              }}
            />
          </InputGroup>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            bg="white"
            border="1px solid"
            borderColor="#E5E7EB"
            color="brand.200"
            fontSize="16px"
            _focus={{
              borderColor: "brand.100",
              boxShadow: "0 0 0 1px brand.100",
            }}
          >
            <option value="all" style={{ color: "#121416" }}>All Statuses</option>
            <option value="pending" style={{ color: "#121416" }}>Pending</option>
            <option value="scheduled" style={{ color: "#121416" }}>Scheduled</option>
            <option value="completed" style={{ color: "#121416" }}>Completed</option>
            <option value="cancelled" style={{ color: "#121416" }}>Cancelled</option>
          </Select>
        </SimpleGrid>

        {/* Results count */}
        <Text fontSize="14px" color="brand.200" mt="16px">
          Showing {paginatedConsultations.length} of {filteredConsultations.length} consultations
        </Text>
      </Box>

      {/* Table Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB" overflowX="auto">
        {isLoading ? (
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading consultations...
            </Text>
          </VStack>
        ) : paginatedConsultations.length === 0 ? (
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredConsultations.length === 0 && allConsultations?.length > 0
                ? "No consultations match your search criteria."
                : "No consultations yet."}
            </Text>
          </VStack>
        ) : (
          <>
            <Table variant="simple" size="md">
              <Thead>
                <Tr bg="brand.800">
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    whiteSpace="nowrap"
                  >
                    Client Name
                  </Th>
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    whiteSpace="nowrap"
                  >
                    Email
                  </Th>
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    whiteSpace="nowrap"
                  >
                    Phone
                  </Th>
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    whiteSpace="nowrap"
                  >
                    Practice Area
                  </Th>
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    whiteSpace="nowrap"
                  >
                    Preferred Date
                  </Th>
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    whiteSpace="nowrap"
                  >
                    Status
                  </Th>
                  <Th
                    color="brand.100"
                    fontWeight={600}
                    fontSize="14px"
                    py="16px"
                    px="16px"
                    borderBottom="2px solid"
                    borderColor="#E5E7EB"
                    textAlign="center"
                    whiteSpace="nowrap"
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedConsultations.map((consultation) => (
                  <Tr
                    key={consultation.id}
                    _hover={{ bg: "brand.800" }}
                    transition="background 0.2s"
                    borderBottom="1px solid"
                    borderColor="#E5E7EB"
                  >
                    <Td
                      py="20px"
                      px="16px"
                      color="brand.100"
                      fontWeight={500}
                      fontSize="15px"
                    >
                      {`${consultation.firstName || ""} ${consultation.lastName || ""}`.trim() || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {consultation.email || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {consultation.phone || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {consultation.practiceArea || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {formatDate(consultation.preferredDate)}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={getStatusColor(consultation.status)}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        {consultation.status || "pending"}
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px">
                      <HStack gap="8px" justify="center">
                        <IconButton
                          icon={<FiEye />}
                          size="md"
                          variant="ghost"
                          onClick={() => handleView(consultation.id)}
                          aria-label="View consultation"
                          isDisabled={isDeleting}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          size="md"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeleteClick(consultation.id, consultation)}
                          isDisabled={isDeleting}
                          aria-label="Delete consultation"
                          _hover={{ bg: "red.500", color: "white" }}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box mt="24px" w="full">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Consultation"
        message="Are you sure you want to delete this consultation? This action cannot be undone."
        itemName={deleteModal.itemName ? `Consultation from ${deleteModal.itemName}` : null}
        isLoading={isDeleting}
      />
    </VStack>
  );
}

export default ConsultationsList;
