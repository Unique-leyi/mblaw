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
import { useTeamMembers } from "./useTeamMembers";
import { useUpdateAdminStatus } from "./useUpdateAdminStatus";
import { FiSearch, FiUsers, FiCheckCircle, FiXCircle, FiEdit, FiPlus, FiShield } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";
import CtaButton from "../../../ui/CtaButton";

export default function TeamMembersList() {
  const navigate = useNavigate();
  const { teamMembers: allTeamMembers, isLoading, refetch } = useTeamMembers();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateAdminStatus();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allTeamMembers?.length || 0;
    const active = allTeamMembers?.filter((tm) => tm.isActive).length || 0;
    const inactive = allTeamMembers?.filter((tm) => !tm.isActive).length || 0;
    const superAdmins = allTeamMembers?.filter((tm) => tm.role === "super_admin").length || 0;
    const admins = allTeamMembers?.filter((tm) => tm.role === "admin").length || 0;

    return { total, active, inactive, superAdmins, admins };
  }, [allTeamMembers]);

  // Filter and search team members
  const filteredTeamMembers = useMemo(() => {
    let filtered = allTeamMembers || [];

    // Filter by status
    if (statusFilter === "active") {
      filtered = filtered.filter((tm) => tm.isActive);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((tm) => !tm.isActive);
    }

    // Filter by role
    if (roleFilter === "super_admin") {
      filtered = filtered.filter((tm) => tm.role === "super_admin");
    } else if (roleFilter === "admin") {
      filtered = filtered.filter((tm) => tm.role === "admin");
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tm) =>
          `${tm.firstName} ${tm.lastName}`.toLowerCase().includes(query) ||
          tm.email?.toLowerCase().includes(query) ||
          tm.role?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allTeamMembers, statusFilter, roleFilter, searchQuery]);

  // Paginate team members
  const paginatedTeamMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTeamMembers.slice(startIndex, endIndex);
  }, [filteredTeamMembers, currentPage]);

  const totalPages = Math.ceil(filteredTeamMembers.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, roleFilter, searchQuery]);

  const handleEdit = (id) => {
    navigate(`/dashboard/team-members/${id}/edit`);
  };

  const handleToggleStatus = (memberId, currentStatus) => {
    updateStatus({ id: memberId, isActive: !currentStatus });
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
            Team Members
          </Heading>
          <Text fontSize="16px" color="brand.200" fontWeight={400}>
            Manage and monitor all team members (admins) on the platform.
          </Text>
        </VStack>
        <CtaButton
          isFull={false}
          isLink={false}
          btnText="Create Team Member"
          handleClick={() => navigate("/dashboard/team-members/create")}
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
                Total Team Members
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
                Active Members
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
                Inactive Members
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
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="16px" w="full">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="brand.200" />
            </InputLeftElement>
            <Input
              placeholder="Search by name, email, or role..."
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

          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
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
            <option value="all" style={{ color: "#121416" }}>All Roles</option>
            <option value="super_admin" style={{ color: "#121416" }}>Super Admin</option>
            <option value="admin" style={{ color: "#121416" }}>Admin</option>
          </Select>
        </SimpleGrid>

        {/* Results count */}
        <Text fontSize="14px" color="brand.200" mt="16px">
          Showing {paginatedTeamMembers.length} of {filteredTeamMembers.length} team members
        </Text>
      </Box>

      {/* Table Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB" overflowX="auto">
        {isLoading ? (
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading team members...
            </Text>
          </VStack>
        ) : paginatedTeamMembers.length === 0 ? (
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredTeamMembers.length === 0 && allTeamMembers?.length > 0
                ? "No team members match your search criteria."
                : "No team members found."}
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
                    Role
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
                {paginatedTeamMembers.map((member) => (
                  <Tr
                    key={member.id}
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
                      {`${member.firstName || ""} ${member.lastName || ""}`.trim() || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {member.email || "N/A"}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={member.role === "super_admin" ? "purple" : "blue"}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        <HStack gap="6px" justify="center">
                          <Icon as={FiShield} boxSize="12px" />
                          <Text>
                            {member.role === "super_admin" ? "Super Admin" : "Admin"}
                          </Text>
                        </HStack>
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {formatDate(member.lastLogin)}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={member.isActive ? "green" : "red"}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px">
                      <HStack gap="8px" justify="center">
                        <IconButton
                          icon={<FiEdit />}
                          size="md"
                          variant="ghost"
                          onClick={() => handleEdit(member.id)}
                          aria-label="Edit team member"
                          isDisabled={isUpdating}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        />
                        <Button
                          size="md"
                          colorScheme={member.isActive ? "red" : "green"}
                          onClick={() => handleToggleStatus(member.id, member.isActive)}
                          isLoading={isUpdating}
                          isDisabled={isUpdating}
                          loadingText={member.isActive ? "Deactivating..." : "Activating..."}
                          fontSize="14px"
                          px="20px"
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {member.isActive ? "Deactivate" : "Activate"}
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

