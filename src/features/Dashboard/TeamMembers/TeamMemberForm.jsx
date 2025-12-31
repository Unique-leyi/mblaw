import React from "react";
import {
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Switch,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import CtaButton from "../../../ui/CtaButton";

function TeamMemberForm({ onSubmit, isLoading, initialData, isEdit = false }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      email: "",
      role: "admin",
      isActive: true,
    },
  });

  const isActive = watch("isActive");
  const role = watch("role");

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack w="full" align="start" gap="24px">
        <VStack align="start" gap="8px" w="full">
          <Heading
            fontSize={["24px", "28px", "32px"]}
            fontWeight={700}
            color="brand.100"
            lineHeight="40px"
          >
            {isEdit ? "Edit Team Member" : "Create New Team Member"}
          </Heading>
          <Text fontSize="16px" color="brand.200" fontWeight={400}>
            {isEdit
              ? "Update team member information below."
              : "Fill in the team member's information. A temporary password will be automatically generated and sent to their email."}
          </Text>
        </VStack>

        <VStack w="full" gap="20px">
          {/* First Name */}
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel
              fontSize="16px"
              fontFamily="openSans"
              fontWeight={400}
              color="brand.200"
              lineHeight="40px"
            >
              First Name *
            </FormLabel>
            <Input
              w="full"
              type="text"
              placeholder="Enter first name"
              size="lg"
              h="initial"
              py="10px"
              px="15px"
              rounded="10px"
              border="1px solid"
              bg="transparent"
              color="brand.200"
              fontSize={[18, 18, 20]}
              fontWeight={300}
              lineHeight="40px"
              letterSpacing="0%"
              isDisabled={isSubmitting || isLoading}
              _placeholder={{
                fontSize: 16,
                fontWeight: 300,
                color: "brand.200",
                lineHeight: "40px",
                letterSpacing: "0%",
              }}
              borderColor="#0000001A"
              {...register("firstName", {
                required: "First name is required",
                validate: (value) => value.trim() !== "" || "First name cannot be empty",
              })}
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          {/* Last Name */}
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel
              fontSize="16px"
              fontFamily="openSans"
              fontWeight={400}
              color="brand.200"
              lineHeight="40px"
            >
              Last Name *
            </FormLabel>
            <Input
              w="full"
              type="text"
              placeholder="Enter last name"
              size="lg"
              h="initial"
              py="10px"
              px="15px"
              rounded="10px"
              border="1px solid"
              bg="transparent"
              color="brand.200"
              fontSize={[18, 18, 20]}
              fontWeight={300}
              lineHeight="40px"
              letterSpacing="0%"
              isDisabled={isSubmitting || isLoading}
              _placeholder={{
                fontSize: 16,
                fontWeight: 300,
                color: "brand.200",
                lineHeight: "40px",
                letterSpacing: "0%",
              }}
              borderColor="#0000001A"
              {...register("lastName", {
                required: "Last name is required",
                validate: (value) => value.trim() !== "" || "Last name cannot be empty",
              })}
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>

          {/* Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel
              fontSize="16px"
              fontFamily="openSans"
              fontWeight={400}
              color="brand.200"
              lineHeight="40px"
            >
              Email Address *
            </FormLabel>
            <Input
              w="full"
              type="email"
              placeholder="Enter email address"
              size="lg"
              h="initial"
              py="10px"
              px="15px"
              rounded="10px"
              border="1px solid"
              bg="transparent"
              color="brand.200"
              fontSize={[18, 18, 20]}
              fontWeight={300}
              lineHeight="40px"
              letterSpacing="0%"
              isDisabled={isSubmitting || isLoading}
              _placeholder={{
                fontSize: 16,
                fontWeight: 300,
                color: "brand.200",
                lineHeight: "40px",
                letterSpacing: "0%",
              }}
              borderColor="#0000001A"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
                validate: (value) => value.trim() !== "" || "Email cannot be empty",
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* Role */}
          <FormControl isInvalid={!!errors.role}>
            <FormLabel
              fontSize="16px"
              fontFamily="openSans"
              fontWeight={400}
              color="brand.200"
              lineHeight="40px"
            >
              Role *
            </FormLabel>
            <Select
              w="full"
              size="lg"
              h="initial"
              py="10px"
              px="15px"
              rounded="10px"
              border="1px solid"
              bg="transparent"
              color="brand.200"
              fontSize={[18, 18, 20]}
              fontWeight={300}
              lineHeight="40px"
              letterSpacing="0%"
              isDisabled={isSubmitting || isLoading}
              borderColor="#0000001A"
              {...register("role", {
                required: "Role is required",
              })}
            >
              <option value="admin" style={{ color: "#121416" }}>Admin</option>
              <option value="super_admin" style={{ color: "#121416" }}>Super Admin</option>
            </Select>
            <FormHelperText fontSize="13px" color="brand.400" mt="4px">
              {role === "super_admin" ? "Super Admin has full access to all features" : "Admin can manage consultations, appointments, blogs, and clients"}
            </FormHelperText>
            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
          </FormControl>

          {/* Active Status */}
          <FormControl>
            <HStack justify="space-between" align="center" w="full">
              <VStack align="start" gap="4px" flex="1">
                <FormLabel
                  fontSize="16px"
                  fontFamily="openSans"
                  fontWeight={400}
                  color="brand.200"
                  lineHeight="40px"
                  mb="0"
                >
                  Account Status
                </FormLabel>
                <FormHelperText fontSize="13px" color="brand.400" m="0">
                  {isActive ? "Team member can log in and access the dashboard" : "Team member account is inactive"}
                </FormHelperText>
              </VStack>
              <Switch
                colorScheme="green"
                size="lg"
                isChecked={isActive}
                isDisabled={isSubmitting || isLoading}
                {...register("isActive")}
              />
            </HStack>
          </FormControl>
        </VStack>

        <HStack w="full" justify="flex-end" gap="16px" pt="8px">
          <CtaButton
            isFull={false}
            isLink={false}
            btnText={isEdit ? "Update Team Member" : "Create Team Member"}
            handleClick={handleSubmit(onSubmit)}
            isDisabled={isSubmitting || isLoading}
            isLoading={isSubmitting || isLoading}
          />
        </HStack>
      </VStack>
    </form>
  );
}

export default TeamMemberForm;

