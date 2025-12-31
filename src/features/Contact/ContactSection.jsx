import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Text,
  HStack,
  useBreakpointValue,
  SimpleGrid,
  Icon,
  Heading,
  Stack,
  FormControl,
  Input,
  FormLabel,
  Select,
  Textarea,
  Checkbox,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import CtaButton from "../../ui/CtaButton";
import MiniHeading from "../../ui/MiniHeading";
import { useForm } from "react-hook-form";
import { useSubmitContact } from "./useSubmitContact";


function ContactSection() {
  const { submit, isLoading } = useSubmitContact();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
      reset,
  } = useForm();
  
    const inputs = [
      {
        type: "text",
        element: "input",
        name: "fullname",
        label: "Full Name",
        placeholder: "Enter your full name",
        validation: {
          required: "Full name is required",
          validate: (value) => value.trim() !== "" || "Name cannot be empty",
        },
      },
      {
        type: "email",
        element: "input",
        name: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        validation: {
          required: "Email is required",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Invalid email address",
          },
          validate: (value) => value.trim() !== "" || "Email cannot be empty",
        },
      },
      {
        type: "text",
        element: "input",
        label: "Phone Number (Optional)",
        name: "phone",
        placeholder: "Enter your phone number",
        validation: {
          validate: (value) => {
            if (!value || value.trim() === "") return true; // Optional field
            if (value.trim().length < 10) return "Phone number must be at least 10 digits";
            return true;
          },
        },
      },
      {
        type: "text",
        element: "textarea",
        label: "Message",
        col: 12,
        name: "message",
        placeholder: "Enter your message or question here",
        validation: {
          required: "Message is required",
          validate: (value) => value.trim() !== "" || "Message cannot be empty",
        },
      },
    ];
  
    const handleSendContact = (data) => {
      submit(data, {
        onSuccess: () => {
          reset();
          onOpen();
        },
      });
    };


  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={["2rem", "2rem", "4rem"]}
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
              gap="40px"
            >

              <MiniHeading
                miniTitle="Contact us"
                title="Get in Touch"
                titleColor="brand.100"
              />

              <SimpleGrid
                w="full"
                columns={[1, 1, 2]}
                gap="20px"
              >
                <VStack
                  w="full"
                  justify="start"
                  align="start"
                >
                    <Image
                      w="full"
                      h="full"
                      minH={["full", "full", "674px"]}
                      src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762880056/MbLaw/3b906a59b98d7f2a3096f2faeebb6d5ac8198c3a_nfdmzg.jpg"
                      alt="faq-img"
                      objectFit="cover"
                      rounded="20px"
                    />

                </VStack>

                <VStack
                  w="full"
                  justify="start"
                  align="start"
                >
                  <VStack
                    w="full"
                    justify="start"
                    align="start"
                    py={["20px", "20px", "27px"]}
                    px={["10px", "10px", "16px"]}
                    bgColor="brand.800"
                    rounded="10px"
                  >
                    <form
                      method="post"
                      onSubmit={handleSubmit(handleSendContact)}
                      style={{ width: "100%" }}
                    >
                      <VStack 
                        w="full" 
                        justify="center" 
                        align="center" 
                        gap="10px" 
                        mb={["20px", "20px", "20px"]}
                      >
                        {inputs.map((input, i) => (
                          <FormControl
                            key={i}
                            isInvalid={!!errors[input.name]}
                            id={input.name}
                          >
                            {input.element !== "checkbox" && (
                              <FormLabel
                                fontSize={[18, 18, 20]}
                                fontWeight={500}
                                color="brand.200"
                                lineHeight="40px"
                                letterSpacing="0%"
                                textTransform="uppercase"
                              >
                                {input.label}
                              </FormLabel>
                            )}

                            {input.element === "input" && (
                              <Input
                                w="full"
                                type={input.type}
                                placeholder={input.placeholder}
                                size="lg"
                                h="initial"
                                py="4px"
                                px="20px"
                                rounded="10px"
                                border="2px solid"
                                bg="transparent"
                                color="brand.200"
                                fontSize={[18, 18, 20]}
                                fontWeight={300}
                                lineHeight="40px"
                                letterSpacing="0%"
                                _placeholder={{
                                  fontSize: 16,
                                  fontWeight: 300,
                                  color: "brand.200",
                                  lineHeight: "40px",
                                  letterSpacing: "0%",
                                }}
                                borderColor="#0000001A"
                                {...register(input.name, input.validation)}
                              />
                            )}

                            {input.element === "textarea" && (
                              <Textarea
                                w="full"
                                rows={4}
                                type={input.type}
                                placeholder={input.placeholder}
                                size="lg"
                                h="initial"
                                py="12px"
                                px="20px"
                                rounded="20px"
                                border="2px solid"
                                bg="transparent"
                                color="brand.200"
                                fontSize={[18, 18, 20]}
                                fontWeight={300}
                                lineHeight="40px"
                                letterSpacing="0%"
                                _placeholder={{
                                  fontSize: [18, 18, 20],
                                  fontWeight: 300,
                                  color: "brand.200",
                                  lineHeight: "40px",
                                  letterSpacing: "0%",
                                }}
                                borderColor="#0000001A"
                                {...register(input.name, input.validation)}
                              />
                            )}


                            <FormErrorMessage>
                              {errors[input.name]?.message}
                            </FormErrorMessage>
                          </FormControl>
                        ))}
                      </VStack>

                      <CtaButton
                        isFull={true}
                        isLink={false}
                        isDisabled={isSubmitting || isLoading}
                        isLoading={isSubmitting || isLoading}
                        btnText="Submit Form"
                        handleClick={handleSubmit(handleSendContact)}
                      />
                    </form>
                  </VStack>
                  
                </VStack>

              </SimpleGrid>


            </VStack>
        </ContainerLayout>

        {/* Thank You Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" zIndex={10000}>
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
            />
            <ModalBody p="0">
              <VStack
                w="full"
                align="center"
                justify="center"
                py="60px"
                px="40px"
                bg="white"
                gap="24px"
              >
                {/* Success Icon */}
                <Box
                  w="80px"
                  h="80px"
                  rounded="full"
                  bgGradient="linear(to-br, #10B981, #059669)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 8px 24px rgba(16, 185, 129, 0.3)"
                  animation="pulse 2s infinite"
                >
                  <Icon as={FiCheckCircle} boxSize="40px" color="white" />
                </Box>

                {/* Thank You Message */}
                <VStack gap="12px" align="center" textAlign="center">
                  <Heading
                    fontSize={["24px", "28px", "32px"]}
                    fontWeight={700}
                    color="brand.100"
                    lineHeight="40px"
                  >
                    Thank You!
                  </Heading>
                  <Text
                    fontSize={["16px", "18px", "20px"]}
                    color="brand.200"
                    fontWeight={400}
                    lineHeight="28px"
                    maxW="400px"
                  >
                    We've received your message and appreciate you taking the time to reach out to us.
                  </Text>
                </VStack>

                {/* Additional Info */}
                <VStack
                  gap="16px"
                  align="start"
                  w="full"
                  bg="brand.800"
                  p="24px"
                  rounded="16px"
                  border="1px solid"
                  borderColor="#E5E7EB"
                >
                  <Text
                    fontSize="14px"
                    color="brand.200"
                    fontWeight={500}
                    lineHeight="20px"
                  >
                    What happens next?
                  </Text>
                  <VStack align="start" gap="12px" w="full">
                    <HStack align="start" gap="12px">
                      <Box
                        w="6px"
                        h="6px"
                        rounded="full"
                        bg="brand.100"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text fontSize="14px" color="brand.200" lineHeight="22px">
                        Our team will review your inquiry within 24-48 hours
                      </Text>
                    </HStack>
                    <HStack align="start" gap="12px">
                      <Box
                        w="6px"
                        h="6px"
                        rounded="full"
                        bg="brand.100"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text fontSize="14px" color="brand.200" lineHeight="22px">
                        You'll receive a confirmation email shortly
                      </Text>
                    </HStack>
                    <HStack align="start" gap="12px">
                      <Box
                        w="6px"
                        h="6px"
                        rounded="full"
                        bg="brand.100"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text fontSize="14px" color="brand.200" lineHeight="22px">
                        We'll respond to your inquiry via email or phone
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>

                {/* Close Button */}
                <CtaButton
                  isFull={true}
                  isLink={false}
                  btnText="Close"
                  handleClick={onClose}
                  isReverse={false}
                />
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Stack>
  )
}

export default ContactSection