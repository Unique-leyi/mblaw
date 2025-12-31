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
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMyAppointments } from "./useMyAppointments";
import { FiEye, FiSearch, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import Pagination from "../../ui/Pagination";

export default function MyAppointmentsList() {
  const navigate = useNavigate();
  const { appointments: allAppointments, isLoading, error } = useMyAppointments();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  if (error) {
    return (
      <VStack w="full" py="60px">
        <Text color="red.500" fontSize="16px">
          Error loading appointments. Please try again later.
        </Text>
      </VStack>
    );
  }

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
          My Appointments
        </Heading>
        <Text fontSize="16px" color="brand.200" fontWeight={400}>
          View and track all your scheduled appointments.
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
              placeholder="Search by practice area..."
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
                : "You don't have any appointments scheduled yet."}
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
                    _hover={{
                      bg: "brand.800",
                      transition: "background-color 0.2s",
                    }}
                    transition="background-color 0.2s"
                  >
                    <Td color="brand.200" py="16px" px="16px" fontSize="14px">
                      {appointment.practiceArea || "N/A"}
                    </Td>
                    <Td color="brand.200" py="16px" px="16px" fontSize="14px">
                      {formatDate(appointment.scheduledDate)}
                    </Td>
                    <Td color="brand.200" py="16px" px="16px" fontSize="14px">
                      {appointment.scheduledTime || "N/A"}
                    </Td>
                    <Td py="16px" px="16px">
                      <Badge colorScheme={getStatusColor(appointment.status)} fontSize="12px" px="8px" py="4px">
                        {appointment.status || "N/A"}
                      </Badge>
                    </Td>
                    <Td py="16px" px="16px" textAlign="center">
                      <Button
                        size="sm"
                        variant="ghost"
                        color="brand.100"
                        leftIcon={<Icon as={FiEye} />}
                        onClick={() => navigate(`/my-account/appointments/${appointment.id}`)}
                        _hover={{ bg: "brand.100", color: "white" }}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box mt="24px" w="full" display="flex" justifyContent="center">
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
    </VStack>
  );
}
