import React from "react";
import { Box, VStack, Spinner, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import ClientForm from "../features/Dashboard/Users/ClientForm";
import { useUpdateClient } from "../features/Dashboard/Users/useUpdateClient";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/apiUsers";

export default function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { update, isLoading: isUpdating } = useUpdateClient();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  const handleSubmit = (formData) => {
    update(
      { id, data: formData },
      {
        onSuccess: () => {
          navigate("/dashboard/clients");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack py="60px">
          <Spinner size="xl" color="brand.100" thickness="4px" />
          <Text color="brand.200" fontSize="16px" mt="20px">
            Loading client information...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!data?.success || !data?.data?.user) {
    return (
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack py="60px">
          <Text color="brand.200" fontSize="16px">
            Client not found
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
      <ClientForm
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        initialData={data.data.user}
        isEdit={true}
      />
    </Box>
  );
}

