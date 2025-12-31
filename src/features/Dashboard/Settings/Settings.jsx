import React, { useState } from "react";
import {
  VStack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Spinner,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useProfile } from "./useProfile";
import { useUpdateProfile } from "./useUpdateProfile";
import { useChangePassword } from "./useChangePassword";
import { useUser } from "../../Auth/useUser";
import CtaButton from "../../../ui/CtaButton";

export default function Settings() {
  const { role } = useUser();
  const { profile, isLoading: isLoadingProfile, refetch } = useProfile();
  const { update, isLoading: isUpdatingProfile } = useUpdateProfile();
  const { change, isLoading: isChangingPassword } = useChangePassword();

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form
  const {
    handleSubmit: handleProfileSubmit,
    register: registerProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
  } = useForm({
    defaultValues: profile || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Password form
  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm();

  // Update form when profile loads
  React.useEffect(() => {
    if (profile) {
      resetProfile({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile, resetProfile]);

  const handleUpdateProfile = (data) => {
    update(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleChangePassword = (data) => {
    change(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          resetPassword();
        },
      }
    );
  };

  if (isLoadingProfile) {
    return (
      <VStack w="full" py="60px">
        <Spinner size="xl" color="brand.100" thickness="4px" />
        <Text color="brand.200" fontSize="16px" mt="20px">
          Loading profile...
        </Text>
      </VStack>
    );
  }

  return (
    <VStack w="full" align="start" gap="30px">
      {/* Header */}
      <VStack align="start" gap="8px" w="full">
        <Heading
          fontSize={["28px", "32px", "36px"]}
          fontWeight={700}
          color="brand.100"
          lineHeight="40px"
        >
          Settings
        </Heading>
        <Text fontSize="16px" color="brand.200" fontWeight={400}>
          Manage your account information and security settings.
        </Text>
      </VStack>

      {/* Tabs Section */}
      <Box w="full" bg="white" rounded="16px" border="1px solid" borderColor="#E5E7EB" overflow="hidden">
        <Tabs colorScheme="blue" variant="enclosed">
          <TabList
            px="24px"
            pt="24px"
            borderBottom="1px solid"
            borderColor="#E5E7EB"
            gap="8px"
          >
            <Tab
              fontSize="16px"
              fontWeight={600}
              color="brand.200"
              _selected={{
                color: "brand.100",
                borderColor: "brand.100",
                borderBottom: "2px solid",
                mb: "-1px",
              }}
              _hover={{
                color: "brand.100",
              }}
              px="24px"
              py="16px"
            >
              Profile Information
            </Tab>
            <Tab
              fontSize="16px"
              fontWeight={600}
              color="brand.200"
              _selected={{
                color: "brand.100",
                borderColor: "brand.100",
                borderBottom: "2px solid",
                mb: "-1px",
              }}
              _hover={{
                color: "brand.100",
              }}
              px="24px"
              py="16px"
            >
              Change Password
            </Tab>
          </TabList>

          <TabPanels>
            {/* Profile Information Tab */}
            <TabPanel px="24px" py="24px">
              <VStack align="start" gap="24px" w="full">
                <VStack align="start" gap="8px" w="full">
                  <Heading
                    fontSize={["20px", "22px", "24px"]}
                    fontWeight={600}
                    color="brand.100"
                    lineHeight="30px"
                  >
                    Profile Information
                  </Heading>
                  <Text fontSize="14px" color="brand.200" fontWeight={400}>
                    Update your personal information and contact details.
                  </Text>
                </VStack>

                <form
                  onSubmit={handleProfileSubmit(handleUpdateProfile)}
                  style={{ width: "100%" }}
                >
                  <VStack w="full" gap="20px">
                    {/* First Name */}
                    <FormControl isInvalid={!!profileErrors.firstName}>
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
                        isDisabled={isSubmittingProfile || isUpdatingProfile}
                        _placeholder={{
                          fontSize: 16,
                          fontWeight: 300,
                          color: "brand.200",
                          lineHeight: "40px",
                          letterSpacing: "0%",
                        }}
                        borderColor="#0000001A"
                        {...registerProfile("firstName", {
                          required: "First name is required",
                          validate: (value) => value.trim() !== "" || "First name cannot be empty",
                        })}
                      />
                      <FormErrorMessage>{profileErrors.firstName?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Last Name */}
                    <FormControl isInvalid={!!profileErrors.lastName}>
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
                        isDisabled={isSubmittingProfile || isUpdatingProfile}
                        _placeholder={{
                          fontSize: 16,
                          fontWeight: 300,
                          color: "brand.200",
                          lineHeight: "40px",
                          letterSpacing: "0%",
                        }}
                        borderColor="#0000001A"
                        {...registerProfile("lastName", {
                          required: "Last name is required",
                          validate: (value) => value.trim() !== "" || "Last name cannot be empty",
                        })}
                      />
                      <FormErrorMessage>{profileErrors.lastName?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Email */}
                    <FormControl isInvalid={!!profileErrors.email}>
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
                        isDisabled={isSubmittingProfile || isUpdatingProfile}
                        _placeholder={{
                          fontSize: 16,
                          fontWeight: 300,
                          color: "brand.200",
                          lineHeight: "40px",
                          letterSpacing: "0%",
                        }}
                        borderColor="#0000001A"
                        {...registerProfile("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email address",
                          },
                          validate: (value) => value.trim() !== "" || "Email cannot be empty",
                        })}
                      />
                      <FormErrorMessage>{profileErrors.email?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Phone (only for regular users) */}
                    {role === "user" && (
                      <FormControl isInvalid={!!profileErrors.phone}>
                        <FormLabel
                          fontSize="16px"
                          fontFamily="openSans"
                          fontWeight={400}
                          color="brand.200"
                          lineHeight="40px"
                        >
                          Phone Number (Optional)
                        </FormLabel>
                        <Input
                          w="full"
                          type="tel"
                          placeholder="Enter phone number"
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
                          isDisabled={isSubmittingProfile || isUpdatingProfile}
                          _placeholder={{
                            fontSize: 16,
                            fontWeight: 300,
                            color: "brand.200",
                            lineHeight: "40px",
                            letterSpacing: "0%",
                          }}
                          borderColor="#0000001A"
                          {...registerProfile("phone", {
                            validate: (value) => {
                              if (!value || value.trim() === "") return true; // Optional field
                              if (value.trim().length < 10) return "Phone number must be at least 10 digits";
                              return true;
                            },
                          })}
                        />
                        <FormErrorMessage>{profileErrors.phone?.message}</FormErrorMessage>
                      </FormControl>
                    )}

                  <HStack w="full" justify="flex-end" gap="16px" pt="8px">
                    <CtaButton
                      isFull={false}
                      isLink={false}
                      btnText="Update Profile"
                      handleClick={handleProfileSubmit(handleUpdateProfile)}
                      isDisabled={isSubmittingProfile || isUpdatingProfile}
                      isLoading={isSubmittingProfile || isUpdatingProfile}
                    />
                  </HStack>
                </VStack>
              </form>
            </VStack>
            </TabPanel>

            {/* Change Password Tab */}
            <TabPanel px="24px" py="24px">
              <VStack align="start" gap="24px" w="full">
                <VStack align="start" gap="8px" w="full">
                  <Heading
                    fontSize={["20px", "22px", "24px"]}
                    fontWeight={600}
                    color="brand.100"
                    lineHeight="30px"
                  >
                    Change Password
                  </Heading>
                  <Text fontSize="14px" color="brand.200" fontWeight={400}>
                    Update your password to keep your account secure.
                  </Text>
                </VStack>

                <form
                  onSubmit={handlePasswordSubmit(handleChangePassword)}
                  style={{ width: "100%" }}
                >
                  <VStack w="full" gap="20px">
                    {/* Current Password */}
                    <FormControl isInvalid={!!passwordErrors.currentPassword}>
                      <FormLabel
                        fontSize="16px"
                        fontFamily="openSans"
                        fontWeight={400}
                        color="brand.200"
                        lineHeight="40px"
                      >
                        Current Password *
                      </FormLabel>
                      <InputGroup>
                        <Input
                          w="full"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          size="lg"
                          h="initial"
                          py="10px"
                          px="15px"
                          pr="50px"
                          rounded="10px"
                          border="1px solid"
                          bg="transparent"
                          color="brand.200"
                          fontSize={[18, 18, 20]}
                          fontWeight={300}
                          lineHeight="40px"
                          letterSpacing="0%"
                          isDisabled={isSubmittingPassword || isChangingPassword}
                          _placeholder={{
                            fontSize: 16,
                            fontWeight: 300,
                            color: "brand.200",
                            lineHeight: "40px",
                            letterSpacing: "0%",
                          }}
                          borderColor="#0000001A"
                          {...registerPassword("currentPassword", {
                            required: "Current password is required",
                            validate: (value) => value.trim() !== "" || "Password cannot be empty",
                          })}
                        />
                        <InputRightElement h="full" pr="10px">
                          <IconButton
                            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                            icon={<Icon as={showCurrentPassword ? FiEyeOff : FiEye} />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            color="brand.200"
                            _hover={{ bg: "transparent" }}
                            isDisabled={isSubmittingPassword || isChangingPassword}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{passwordErrors.currentPassword?.message}</FormErrorMessage>
                    </FormControl>

                    {/* New Password */}
                    <FormControl isInvalid={!!passwordErrors.newPassword}>
                      <FormLabel
                        fontSize="16px"
                        fontFamily="openSans"
                        fontWeight={400}
                        color="brand.200"
                        lineHeight="40px"
                      >
                        New Password *
                      </FormLabel>
                      <InputGroup>
                        <Input
                          w="full"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          size="lg"
                          h="initial"
                          py="10px"
                          px="15px"
                          pr="50px"
                          rounded="10px"
                          border="1px solid"
                          bg="transparent"
                          color="brand.200"
                          fontSize={[18, 18, 20]}
                          fontWeight={300}
                          lineHeight="40px"
                          letterSpacing="0%"
                          isDisabled={isSubmittingPassword || isChangingPassword}
                          _placeholder={{
                            fontSize: 16,
                            fontWeight: 300,
                            color: "brand.200",
                            lineHeight: "40px",
                            letterSpacing: "0%",
                          }}
                          borderColor="#0000001A"
                          {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                            validate: (value) => value.trim() !== "" || "Password cannot be empty",
                          })}
                        />
                        <InputRightElement h="full" pr="10px">
                          <IconButton
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                            icon={<Icon as={showNewPassword ? FiEyeOff : FiEye} />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            color="brand.200"
                            _hover={{ bg: "transparent" }}
                            isDisabled={isSubmittingPassword || isChangingPassword}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{passwordErrors.newPassword?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Confirm Password */}
                    <FormControl isInvalid={!!passwordErrors.confirmPassword}>
                      <FormLabel
                        fontSize="16px"
                        fontFamily="openSans"
                        fontWeight={400}
                        color="brand.200"
                        lineHeight="40px"
                      >
                        Confirm New Password *
                      </FormLabel>
                      <InputGroup>
                        <Input
                          w="full"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          size="lg"
                          h="initial"
                          py="10px"
                          px="15px"
                          pr="50px"
                          rounded="10px"
                          border="1px solid"
                          bg="transparent"
                          color="brand.200"
                          fontSize={[18, 18, 20]}
                          fontWeight={300}
                          lineHeight="40px"
                          letterSpacing="0%"
                          isDisabled={isSubmittingPassword || isChangingPassword}
                          _placeholder={{
                            fontSize: 16,
                            fontWeight: 300,
                            color: "brand.200",
                            lineHeight: "40px",
                            letterSpacing: "0%",
                          }}
                          borderColor="#0000001A"
                          {...registerPassword("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) => {
                              const newPassword = watchPassword("newPassword");
                              if (!value) return "Please confirm your password";
                              if (value.trim() === "") return "Password cannot be empty";
                              if (value !== newPassword) return "Passwords do not match";
                              return true;
                            },
                          })}
                        />
                        <InputRightElement h="full" pr="10px">
                          <IconButton
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            icon={<Icon as={showConfirmPassword ? FiEyeOff : FiEye} />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            color="brand.200"
                            _hover={{ bg: "transparent" }}
                            isDisabled={isSubmittingPassword || isChangingPassword}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{passwordErrors.confirmPassword?.message}</FormErrorMessage>
                    </FormControl>

                  <HStack w="full" justify="flex-end" gap="16px" pt="8px">
                    <CtaButton
                      isFull={false}
                      isLink={false}
                      btnText="Change Password"
                      handleClick={handlePasswordSubmit(handleChangePassword)}
                      isDisabled={isSubmittingPassword || isChangingPassword}
                      isLoading={isSubmittingPassword || isChangingPassword}
                    />
                  </HStack>
                </VStack>
              </form>
            </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
}

