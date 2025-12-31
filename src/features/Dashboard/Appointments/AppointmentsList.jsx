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
import { useAppointments } from "./useAppointments";
import { useDeleteAppointment } from "./useDeleteAppointment";
import { FiEye, FiTrash2, FiEdit, FiSearch, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";
import CtaButton from "../../../ui/CtaButton";
import DeleteConfirmationModal from "../../../ui/DeleteConfirmationModal";

function AppointmentsList() {
  const navigate = useNavigate();
  const { appointments: allAppointments, isLoading, refetch } = useAppointments();
  const { deleteAppointment, isDeleting } = useDeleteAppointment();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, itemName: null });

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allAppointments?.length || 0;
    const scheduled = allAppointments?.filter((a) => a.status === "scheduled").length || 0;
    const completed = allAppointments?.filter((a) => a.status === "completed").length || 0;
    const cancelled = allAppointments?.filter((a) => a.status === "cancelled").length || 0;

    return { total, scheduled, completed, cancelled };
  }, [allAppointments]);

  // Filter and search appointments
  const filteredAppointments = useMemo(() => {
    let filtered = allAppointments || [];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appointment) =>
          appointment.clientName?.toLowerCase().includes(query) ||
          appointment.email?.toLowerCase().includes(query) ||
          appointment.phone?.toLowerCase().includes(query) ||
          appointment.practiceArea?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allAppointments, statusFilter, searchQuery]);

  // Paginate appointments
  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAppointments.slice(startIndex, endIndex);
  }, [filteredAppointments, currentPage]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const handleView = (id) => {
    navigate(`/dashboard/appointments/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/appointments/${id}/edit`);
  };

  const handleDeleteClick = (id, appointment) => {
    const itemName = appointment.clientName || `Appointment on ${formatDate(appointment.scheduledDate)}`;
    setDeleteModal({ isOpen: true, id, itemName });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.id) {
      await deleteAppointment(deleteModal.id);
      refetch();
      setDeleteModal({ isOpen: false, id: null, itemName: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, id: null, itemName: null });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
      <HStack w="full" justify="space-between" align="start">
        <VStack align="start" gap="8px" flex="1">
          <Heading
            fontSize={["28px", "32px", "36px"]}
            fontWeight={700}
            color="brand.100"
            lineHeight="40px"
          >
            Appointments
          </Heading>
          <Text fontSize="16px" color="brand.200" fontWeight={400}>
            View and manage scheduled appointments.
          </Text>
        </VStack>
        <CtaButton
          isFull={false}
          isLink={false}
          btnText="Create Appointment"
          handleClick={() => navigate("/dashboard/appointments/create")}
          leftIcon={FiEdit}
        />
      </HStack>

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
                Total Appointments
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="brand.100" lineHeight="40px">
                {metrics.total}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, brand.100, brand.600)" p="12px" rounded="12px" color="white">
              <Icon as={FiCalendar} boxSize="24px" />
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
                Scheduled Appointments
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#3B82F6" lineHeight="40px">
                {metrics.scheduled}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #3B82F6, #2563EB)" p="12px" rounded="12px" color="white">
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
                Completed Appointments
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
            <option value="scheduled" style={{ color: "#121416" }}>Scheduled</option>
            <option value="completed" style={{ color: "#121416" }}>Completed</option>
            <option value="cancelled" style={{ color: "#121416" }}>Cancelled</option>
          </Select>
        </SimpleGrid>

        {/* Results count */}
        <Text fontSize="14px" color="brand.200" mt="16px">
          Showing {paginatedAppointments.length} of {filteredAppointments.length} appointments
        </Text>
      </Box>

      {/* Table Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB" overflowX="auto">
        {isLoading ? (
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading appointments...
            </Text>
          </VStack>
        ) : paginatedAppointments.length === 0 ? (
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredAppointments.length === 0 && allAppointments?.length > 0
                ? "No appointments match your search criteria."
                : "No appointments yet."}
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
                    Scheduled Date
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
                    Scheduled Time
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
                {paginatedAppointments.map((appointment) => (
                  <Tr
                    key={appointment.id}
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
                      {appointment.clientName || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {appointment.email || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {appointment.phone || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {appointment.practiceArea || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {formatDate(appointment.scheduledDate)}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {appointment.scheduledTime || "N/A"}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={getStatusColor(appointment.status)}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        {appointment.status || "scheduled"}
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px">
                      <HStack gap="8px" justify="center">
                        <IconButton
                          icon={<FiEye />}
                          size="md"
                          variant="ghost"
                          onClick={() => handleView(appointment.id)}
                          aria-label="View appointment"
                          isDisabled={isDeleting}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        />
                        <IconButton
                          icon={<FiEdit />}
                          size="md"
                          variant="ghost"
                          onClick={() => handleEdit(appointment.id)}
                          aria-label="Edit appointment"
                          isDisabled={isDeleting}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          size="md"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeleteClick(appointment.id, appointment)}
                          isLoading={isDeleting}
                          isDisabled={isDeleting}
                          aria-label="Delete appointment"
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
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        itemName={deleteModal.itemName}
        isLoading={isDeleting}
      />
    </VStack>
  );
}

export default AppointmentsList;
