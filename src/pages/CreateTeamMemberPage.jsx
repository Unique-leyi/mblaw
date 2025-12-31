import React from "react";
import { Box } from "@chakra-ui/react";
import TeamMemberForm from "../features/Dashboard/TeamMembers/TeamMemberForm";
import { useCreateTeamMember } from "../features/Dashboard/TeamMembers/useCreateTeamMember";
import { useNavigate } from "react-router-dom";

export default function CreateTeamMemberPage() {
  const navigate = useNavigate();
  const { create, isLoading } = useCreateTeamMember();

  const handleSubmit = (data) => {
    create(data, {
      onSuccess: () => {
        navigate("/dashboard/team-members");
      },
    });
  };

  return (
    <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
      <TeamMemberForm onSubmit={handleSubmit} isLoading={isLoading} isEdit={false} />
    </Box>
  );
}

