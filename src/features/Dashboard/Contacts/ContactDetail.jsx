import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Badge,
  Button,
  Spinner,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { FiArrowLeft, FiTrash2, FiMail, FiPhone } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getContactById } from "../../../services/apiContact";
import { useDeleteContact } from "./useDeleteContact";
import { useUpdateContactStatus } from "./useUpdateContactStatus";
import DeleteConfirmationModal from "../../../ui/DeleteConfirmationModal";

function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteContact, isDeleting } = useDeleteContact();
  const { updateStatus, isLoading: isUpdating } = useUpdateContactStatus();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContactById(id),
    enabled: !!id,
  });

  const contact = data?.success ? data.data?.contact : null;

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteContact(id);
    navigate("/dashboard/contacts");
    setDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
  };

  const handleStatusChange = (newStatus) => {
    updateStatus({ id, status: newStatus });
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
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <VStack w="full" py="60px">
        <Spinner size="xl" color="brand.100" thickness="4px" />
        <Text color="brand.200" fontSize="16px" mt="20px">
          Loading contact details...
        </Text>
      </VStack>
    );
  }

  if (error || !contact) {
    return (
      <VStack w="full" py="60px">
        <Text color="red.500" fontSize="16px">
          {error?.data?.message || "Contact not found"}
        </Text>
        <Button onClick={() => navigate("/dashboard/contacts")} mt="20px">
          Back to Contacts
        </Button>
      </VStack>
    );
  }

  return (
    <VStack w="full" align="start" gap="30px">
      {/* Header */}
      <HStack w="full" justify="space-between" align="start">
        <HStack gap="16px" align="center">
          <IconButton
            icon={<FiArrowLeft />}
            onClick={() => navigate("/dashboard/contacts")}
            aria-label="Back"
            variant="ghost"
            color="brand.100"
            _hover={{ bg: "brand.100", color: "white" }}
          />
          <VStack align="start" gap="4px">
            <Heading
              fontSize={["28px", "32px", "36px"]}
              fontWeight={700}
              color="brand.100"
              lineHeight="40px"
            >
              Contact Submission
            </Heading>
            <Text fontSize="14px" color="brand.200" fontWeight={400}>
              Submitted on {formatDate(contact.createdAt)}
            </Text>
          </VStack>
        </HStack>
        <HStack gap="12px">
          <Badge
            colorScheme={getStatusColor(contact.status)}
            fontSize="14px"
            px="16px"
            py="8px"
            rounded="8px"
            textTransform="capitalize"
          >
            {contact.status}
          </Badge>
          <IconButton
            icon={<FiTrash2 />}
            onClick={handleDeleteClick}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            aria-label="Delete"
            colorScheme="red"
            variant="ghost"
            _hover={{ bg: "red.500", color: "white" }}
          />
        </HStack>
      </HStack>

      {/* Contact Information */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack align="start" gap="24px" w="full">
          <Heading fontSize="20px" fontWeight={600} color="brand.100">
            Contact Information
          </Heading>

          <HStack gap="24px" w="full" flexWrap="wrap">
            <VStack align="start" gap="8px" flex="1" minW="200px">
              <Text fontSize="14px" color="brand.200" fontWeight={500}>
                Full Name
              </Text>
              <Text fontSize="16px" color="brand.100" fontWeight={500}>
                {contact.fullName || "N/A"}
              </Text>
            </VStack>

            <VStack align="start" gap="8px" flex="1" minW="200px">
              <Text fontSize="14px" color="brand.200" fontWeight={500}>
                Email Address
              </Text>
              <HStack gap="8px">
                <FiMail size="16px" color="#0B1D3A" />
                <Text fontSize="16px" color="brand.100" fontWeight={500}>
                  {contact.email || "N/A"}
                </Text>
              </HStack>
            </VStack>

            {contact.phone && (
              <VStack align="start" gap="8px" flex="1" minW="200px">
                <Text fontSize="14px" color="brand.200" fontWeight={500}>
                  Phone Number
                </Text>
                <HStack gap="8px">
                  <FiPhone size="16px" color="#0B1D3A" />
                  <Text fontSize="16px" color="brand.100" fontWeight={500}>
                    {contact.phone}
                  </Text>
                </HStack>
              </VStack>
            )}
          </HStack>
        </VStack>
      </Box>

      {/* Message */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack align="start" gap="16px" w="full">
          <Heading fontSize="20px" fontWeight={600} color="brand.100">
            Message
          </Heading>
          <Text
            fontSize="16px"
            color="brand.200"
            lineHeight="1.8"
            whiteSpace="pre-wrap"
            w="full"
          >
            {contact.message || "No message provided"}
          </Text>
        </VStack>
      </Box>

      {/* Status Actions */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack align="start" gap="16px" w="full">
          <Heading fontSize="20px" fontWeight={600} color="brand.100">
            Update Status
          </Heading>
          <HStack gap="12px" flexWrap="wrap">
            <Button
              size="sm"
              colorScheme="blue"
              variant={contact.status === "new" ? "solid" : "outline"}
              onClick={() => handleStatusChange("new")}
              isDisabled={isUpdating || contact.status === "new"}
              isLoading={isUpdating}
            >
              Mark as New
            </Button>
            <Button
              size="sm"
              colorScheme="yellow"
              variant={contact.status === "read" ? "solid" : "outline"}
              onClick={() => handleStatusChange("read")}
              isDisabled={isUpdating || contact.status === "read"}
              isLoading={isUpdating}
            >
              Mark as Read
            </Button>
            <Button
              size="sm"
              colorScheme="green"
              variant={contact.status === "replied" ? "solid" : "outline"}
              onClick={() => handleStatusChange("replied")}
              isDisabled={isUpdating || contact.status === "replied"}
              isLoading={isUpdating}
            >
              Mark as Replied
            </Button>
            <Button
              size="sm"
              colorScheme="gray"
              variant={contact.status === "archived" ? "solid" : "outline"}
              onClick={() => handleStatusChange("archived")}
              isDisabled={isUpdating || contact.status === "archived"}
              isLoading={isUpdating}
            >
              Archive
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Contact Submission"
        message="Are you sure you want to delete this contact submission? This action cannot be undone."
        itemName={contact?.fullName ? `Contact from ${contact.fullName}` : null}
        isLoading={isDeleting}
      />
    </VStack>
  );
}

export default ContactDetail;

