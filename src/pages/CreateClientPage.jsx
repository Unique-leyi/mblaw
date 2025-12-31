import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import ClientForm from "../features/Dashboard/Users/ClientForm";
import { useCreateClient } from "../features/Dashboard/Users/useCreateClient";
import { useNavigate } from "react-router-dom";

export default function CreateClientPage() {
  const navigate = useNavigate();
  const { create, isLoading } = useCreateClient();

  const handleSubmit = (data) => {
    create(data, {
      onSuccess: () => {
        navigate("/dashboard/clients");
      },
    });
  };

  return (
    <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
      <ClientForm onSubmit={handleSubmit} isLoading={isLoading} isEdit={false} />
    </Box>
  );
}

