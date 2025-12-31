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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "./useContacts";
import { useDeleteContact } from "./useDeleteContact";
import { FiEye, FiTrash2, FiSearch, FiMail, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";
import DeleteConfirmationModal from "../../../ui/DeleteConfirmationModal";

function ContactsList() {
  const navigate = useNavigate();
  const { contacts: allContacts, isLoading, refetch } = useContacts();
  const { deleteContact, isDeleting } = useDeleteContact();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, itemName: null });

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allContacts?.length || 0;
    const newContacts = allContacts?.filter((c) => c.status === "new").length || 0;
    const read = allContacts?.filter((c) => c.status === "read").length || 0;
    const replied = allContacts?.filter((c) => c.status === "replied").length || 0;
    const archived = allContacts?.filter((c) => c.status === "archived").length || 0;

    return { total, newContacts, read, replied, archived };
  }, [allContacts]);

  // Filter and search contacts
  const filteredContacts = useMemo(() => {
    let filtered = allContacts || [];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.fullName?.toLowerCase().includes(query) ||
          contact.email?.toLowerCase().includes(query) ||
          contact.phone?.toLowerCase().includes(query) ||
          contact.message?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allContacts, statusFilter, searchQuery]);

  // Paginate contacts
  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContacts.slice(startIndex, endIndex);
  }, [filteredContacts, currentPage]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const handleView = (id) => {
    navigate(`/dashboard/contacts/${id}`);
  };

  const handleDeleteClick = (id, contact) => {
    const itemName = contact.fullName || "Contact Submission";
    setDeleteModal({ isOpen: true, id, itemName });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.id) {
      await deleteContact(deleteModal.id);
      refetch();
      setDeleteModal({ isOpen: false, id: null, itemName: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, id: null, itemName: null });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "blue";
      case "read":
        return "yellow";
      case "replied":
        return "green";
      case "archived":
        return "gray";
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
          Contact Submissions
        </Heading>
        <Text fontSize="16px" color="brand.200" fontWeight={400}>
          View and manage all contact form submissions from the website.
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
                Total Submissions
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="brand.100" lineHeight="40px">
                {metrics.total}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, brand.100, brand.600)" p="12px" rounded="12px" color="white">
              <Icon as={FiMail} boxSize="24px" />
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
                New Messages
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#3B82F6" lineHeight="40px">
                {metrics.newContacts}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #3B82F6, #2563EB)" p="12px" rounded="12px" color="white">
              <Icon as={FiMessageSquare} boxSize="24px" />
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
                Replied
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#10B981" lineHeight="40px">
                {metrics.replied}
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
              placeholder="Search by name, email, phone, or message..."
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
            <option value="new" style={{ color: "#121416" }}>New</option>
            <option value="read" style={{ color: "#121416" }}>Read</option>
            <option value="replied" style={{ color: "#121416" }}>Replied</option>
            <option value="archived" style={{ color: "#121416" }}>Archived</option>
          </Select>
        </SimpleGrid>

        {/* Results count */}
        <Text fontSize="14px" color="brand.200" mt="16px">
          Showing {paginatedContacts.length} of {filteredContacts.length} contact submissions
        </Text>
      </Box>

      {/* Table Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB" overflowX="auto">
        {isLoading ? (
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading contact submissions...
            </Text>
          </VStack>
        ) : paginatedContacts.length === 0 ? (
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredContacts.length === 0 && allContacts?.length > 0
                ? "No contact submissions match your search criteria."
                : "No contact submissions yet."}
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
                    Message Preview
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
                    Submitted
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
                {paginatedContacts.map((contact) => (
                  <Tr
                    key={contact.id}
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
                      {contact.fullName || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {contact.email || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {contact.phone || "N/A"}
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px" maxW="300px">
                      <Text
                        noOfLines={2}
                        title={contact.message}
                      >
                        {contact.message || "N/A"}
                      </Text>
                    </Td>
                    <Td py="20px" px="16px" color="brand.200" fontSize="15px">
                      {formatDate(contact.createdAt)}
                    </Td>
                    <Td py="20px" px="16px">
                      <Badge
                        colorScheme={getStatusColor(contact.status)}
                        textTransform="capitalize"
                        fontSize="12px"
                        px="12px"
                        py="6px"
                        rounded="6px"
                        fontWeight={500}
                      >
                        {contact.status || "new"}
                      </Badge>
                    </Td>
                    <Td py="20px" px="16px">
                      <HStack gap="8px" justify="center">
                        <IconButton
                          icon={<FiEye />}
                          size="md"
                          variant="ghost"
                          onClick={() => handleView(contact.id)}
                          aria-label="View contact"
                          isDisabled={isDeleting}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          size="md"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeleteClick(contact.id, contact)}
                          isLoading={isDeleting}
                          isDisabled={isDeleting}
                          aria-label="Delete contact"
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
        title="Delete Contact Submission"
        message="Are you sure you want to delete this contact submission? This action cannot be undone."
        itemName={deleteModal.itemName ? `Contact from ${deleteModal.itemName}` : null}
        isLoading={isDeleting}
      />
    </VStack>
  );
}

export default ContactsList;

