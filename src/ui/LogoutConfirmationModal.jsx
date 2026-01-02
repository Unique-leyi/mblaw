import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" zIndex={10000}>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        mx="20px"
        rounded="24px"
        overflow="hidden"
        boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)"
      >
        <ModalCloseButton
          color="brand.200"
          _hover={{ color: "brand.100", bg: "transparent" }}
          size="lg"
          top="20px"
          right="20px"
          isDisabled={isLoading}
        />
        <ModalBody p="0">
          <VStack
            w="full"
            align="center"
            justify="center"
            py="40px"
            px="32px"
            bg="white"
            gap="24px"
          >
            {/* Logout Icon */}
            <Box
              w="64px"
              h="64px"
              rounded="full"
              bg="orange.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid"
              borderColor="orange.200"
            >
              <Icon as={FiLogOut} boxSize="32px" color="orange.500" />
            </Box>

            {/* Title and Message */}
            <VStack gap="12px" align="center" textAlign="center">
              <Heading
                fontSize={["20px", "24px", "28px"]}
                fontWeight={700}
                color="brand.100"
                lineHeight="32px"
              >
                Confirm Logout
              </Heading>
              <Text
                fontSize={["14px", "16px", "18px"]}
                color="brand.200"
                fontWeight={400}
                lineHeight="24px"
                maxW="400px"
              >
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </Text>
            </VStack>

            {/* Action Buttons */}
            <HStack w="full" gap="12px" justify="flex-end">
              <Button
                variant="outline"
                color="brand.200"
                borderColor="#E5E7EB"
                _hover={{
                  bg: "gray.50",
                  borderColor: "brand.200",
                }}
                onClick={onClose}
                isDisabled={isLoading}
                size="md"
                px="24px"
              >
                Cancel
              </Button>
              <Button
                bg="orange.500"
                color="white"
                _hover={{
                  bg: "orange.600",
                }}
                _active={{
                  bg: "orange.700",
                }}
                onClick={onConfirm}
                isLoading={isLoading}
                loadingText="Logging out..."
                isDisabled={isLoading}
                size="md"
                px="24px"
                leftIcon={<Icon as={FiLogOut} />}
              >
                Logout
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LogoutConfirmationModal;

