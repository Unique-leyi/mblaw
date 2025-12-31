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
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./useUsers";
import { useUpdateUserStatus } from "./useUpdateUserStatus";
import { FiSearch, FiUsers, FiCheckCircle, FiXCircle, FiEdit, FiPlus } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";
import CtaButton from "../../../ui/CtaButton";

export default function ClientsList() {
  const navigate = useNavigate();
  const { users: allClients, isLoading, refetch } = useUsers();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allClients?.length || 0;
    const active = allClients?.filter((u) => u.isActive).length || 0;
    const inactive = allClients?.filter((u) => !u.isActive).length || 0;

    return { total, active, inactive };
  }, [allClients]);

  // Filter and search clients
  const filteredClients = useMemo(() => {
    let filtered = allClients || [];

    // Filter by status
    if (statusFilter === "active") {
      filtered = filtered.filter((client) => client.isActive);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((client) => !client.isActive);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (client) =>
          `${client.firstName} ${client.lastName}`.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.phone?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allClients, statusFilter, searchQuery]);

  // Paginate clients
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredClients.slice(startIndex, endIndex);
  }, [filteredClients, currentPage]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const handleEdit = (id) => {
    navigate(`/dashboard/clients/${id}/edit`);
  };

  const handleToggleStatus = (clientId, currentStatus) => {
    updateStatus({ id: clientId, isActive: !currentStatus });
    refetch();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
            Clients
          </Heading>
          <Text fontSize="16px" color="brand.200" fontWeight={400}>
            Manage and monitor all registered clients on the platform.
          </Text>
        </VStack>
        <CtaButton
          isFull={false}
          isLink={false}
          btnText="Create Client"
          handleClick={() => navigate("/dashboard/clients/create")}
          leftIcon={FiPlus}
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
                Total Clients
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="brand.100" lineHeight="40px">
                {metrics.total}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, brand.100, brand.600)" p="12px" rounded="12px" color="white">
              <Icon as={FiUsers} boxSize="24px" />
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
                Active Clients
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#10B981" lineHeight="40px">
                {metrics.active}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #10B981, #059669)" p="12px" rounded="12px" color="white">
              <Icon as={FiCheckCircle} boxSize="24px" />
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
                Inactive Clients
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#EF4444" lineHeight="40px">
                {metrics.inactive}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #EF4444, #DC2626)" p="12px" rounded="12px" color="white">
              <Icon as={FiXCircle} boxSize="24px" />
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
              placeholder="Search by name, email, or phone..."
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
            <option value="active" style={{ color: "#121416" }}>Active</option>
            <option value="inactive" style={{ color: "#121416" }}>Inactive</option>
          </Select>
        </SimpleGrid>

        {/* Results count */}
        <Text fontSize="14px" color="brand.200" mt="16px">
          Showing {paginatedClients.length} of {filteredClients.length} clients
        </Text>
      </Box>

      {/* Table Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB" overflowX="auto">
        {isLoading ? (
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading clients...
            </Text>
          </VStack>
        ) : paginatedClients.length === 0 ? (
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredClients.length === 0 && allClients?.length > 0
                ? "No clients match your search criteria."
                : "No clients found."}
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
                    Name
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
                    Last Login
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
                {paginatedClients.map((client) => (
                  <Tr
                    key={client.id}
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
                      {`${client.firstName || ""} ${client.lastName || ""}`.trim() || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {client.email || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {client.phone || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {formatDate(client.lastLogin)}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={client.isActive ? "green" : "red"}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        {client.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px">
                      <HStack gap="8px" justify="center">
                        <IconButton
                          icon={<FiEdit />}
                          size="md"
                          variant="ghost"
                          onClick={() => handleEdit(client.id)}
                          aria-label="Edit client"
                          isDisabled={isUpdating}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        />
                        <Button
                          size="md"
                          colorScheme={client.isActive ? "red" : "green"}
                          onClick={() => handleToggleStatus(client.id, client.isActive)}
                          isLoading={isUpdating}
                          isDisabled={isUpdating}
                          loadingText={client.isActive ? "Deactivating..." : "Activating..."}
                          fontSize="14px"
                          px="20px"
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {client.isActive ? "Deactivate" : "Activate"}
                        </Button>
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
    </VStack>
  );
}

