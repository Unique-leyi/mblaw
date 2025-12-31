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
import { useUsers } from "./useUsers";
import { useUpdateUserStatus } from "./useUpdateUserStatus";
import { FiSearch, FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";

export default function UsersList() {
  const { users: allUsers, isLoading, refetch } = useUsers();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allUsers?.length || 0;
    const active = allUsers?.filter((u) => u.isActive).length || 0;
    const inactive = allUsers?.filter((u) => !u.isActive).length || 0;

    return { total, active, inactive };
  }, [allUsers]);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let filtered = allUsers || [];

    // Filter by status
    if (statusFilter === "active") {
      filtered = filtered.filter((user) => user.isActive);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((user) => !user.isActive);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.phone?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allUsers, statusFilter, searchQuery]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const handleToggleStatus = (userId, currentStatus) => {
    updateStatus({ id: userId, isActive: !currentStatus });
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
      <VStack w="full" align="start" gap="8px">
        <Heading
          fontSize={["28px", "32px", "36px"]}
          fontWeight={700}
          color="brand.100"
          lineHeight="40px"
        >
          All Users
        </Heading>
        <Text fontSize="16px" color="brand.200" fontWeight={400}>
          Manage and monitor all registered users on the platform.
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
                Total Users
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
                Active Users
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
                Inactive Users
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
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </Text>
      </Box>

      {/* Table Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB" overflowX="auto">
        {isLoading ? (
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading users...
            </Text>
          </VStack>
        ) : paginatedUsers.length === 0 ? (
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredUsers.length === 0 && allUsers?.length > 0
                ? "No users match your search criteria."
                : "No users found."}
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
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedUsers.map((user) => (
                  <Tr
                    key={user.id}
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
                      {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {user.email || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {user.phone || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {formatDate(user.lastLogin)}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={user.isActive ? "green" : "red"}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px">
                      <HStack gap="8px" justify="center">
                        <Button
                          size="md"
                          colorScheme={user.isActive ? "red" : "green"}
                          onClick={() => handleToggleStatus(user.id, user.isActive)}
                          isLoading={isUpdating}
                          isDisabled={isUpdating}
                          loadingText={user.isActive ? "Deactivating..." : "Activating..."}
                          fontSize="14px"
                          px="20px"
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
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
