import React from "react";
import { Box, VStack, Spinner, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import TeamMemberForm from "../features/Dashboard/TeamMembers/TeamMemberForm";
import { useUpdateTeamMember } from "../features/Dashboard/TeamMembers/useUpdateTeamMember";
import { useQuery } from "@tanstack/react-query";
import { getAdminById } from "../services/apiAdmins";

export default function EditTeamMemberPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { update, isLoading: isUpdating } = useUpdateTeamMember();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["admin", id],
    queryFn: () => getAdminById(id),
  });

  const handleSubmit = (formData) => {
    update(
      { id, data: formData },
      {
        onSuccess: () => {
          navigate("/dashboard/team-members");
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
            Loading team member information...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!data?.success || !data?.data?.admin) {
    return (
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack py="60px">
          <Text color="brand.200" fontSize="16px">
            Team member not found
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
      <TeamMemberForm
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        initialData={data.data.admin}
        isEdit={true}
      />
    </Box>
  );
}

