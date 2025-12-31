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
import { FiAlertTriangle, FiX } from "react-icons/fi";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
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
            {/* Warning Icon */}
            <Box
              w="64px"
              h="64px"
              rounded="full"
              bg="red.50"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid"
              borderColor="red.200"
            >
              <Icon as={FiAlertTriangle} boxSize="32px" color="red.500" />
            </Box>

            {/* Title and Message */}
            <VStack gap="12px" align="center" textAlign="center">
              <Heading
                fontSize={["20px", "24px", "28px"]}
                fontWeight={700}
                color="brand.100"
                lineHeight="32px"
              >
                {title}
              </Heading>
              <Text
                fontSize={["14px", "16px", "18px"]}
                color="brand.200"
                fontWeight={400}
                lineHeight="24px"
                maxW="400px"
              >
                {message}
              </Text>
              {itemName && (
                <Box
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.200"
                  rounded="8px"
                  px="16px"
                  py="12px"
                  w="full"
                  maxW="400px"
                >
                  <Text
                    fontSize="14px"
                    color="red.700"
                    fontWeight={600}
                    textAlign="center"
                  >
                    {itemName}
                  </Text>
                </Box>
              )}
            </VStack>

            {/* Warning Text */}
            <Box
              w="full"
              bg="red.50"
              borderLeft="4px solid"
              borderColor="red.500"
              p="16px"
              rounded="8px"
            >
              <Text fontSize="13px" color="red.700" lineHeight="20px">
                <strong>Warning:</strong> This action cannot be undone. All associated data will be permanently deleted.
              </Text>
            </Box>

            {/* Action Buttons */}
            <HStack w="full" gap="12px" justify="flex-end">
              <Button
                variant="outline"
                color="brand.200"
                borderColor="#E5E7EB"
                _hover={{
                  bg: "brand.800",
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
                bg="red.500"
                color="white"
                _hover={{
                  bg: "red.600",
                }}
                _active={{
                  bg: "red.700",
                }}
                onClick={onConfirm}
                isLoading={isLoading}
                loadingText="Deleting..."
                isDisabled={isLoading}
                size="md"
                px="24px"
                leftIcon={<Icon as={FiX} />}
              >
                Delete
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmationModal;

