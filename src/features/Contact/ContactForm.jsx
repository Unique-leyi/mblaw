import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Icon,
  Badge,
  Divider,
  Stack,
  Image,
  Button,
  FormControl,
  Input,
  FormLabel,
  Select,
  Textarea,
  Checkbox,
  FormErrorMessage,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import CtaButton from "../../ui/CtaButton";
import MiniHeading from "../../ui/MiniHeading";
import { FaArrowRightLong, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSubmitContact } from "./useSubmitContact";


function ContactForm() {
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
        reset(); // Clear form after successful submission
        onOpen(); // Show thank you modal
      },
    });
  };




  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={["2rem", "2rem", "4rem"]}
      bgColor="brand.100"
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
              gap={["40px", "40px", "80px"]}
            >

                <HStack
                  w="full"
                  justify="space-between"
                  align="center"
                  gap="20px"
                  wrap={["wrap", "wrap", "nowrap"]}
                >
                    <MiniHeading
                        miniTitle="Contact us"
                        miniTitleColor="brand.400"
                        title="Get in touch with us. We're here to assist you."
                        titleColor="white"
                    />

                        <VStack
                            justify="center"
                            align="center"
                            gap="15px"
                            flexDirection={["row", "row", "column"]}
                        >
                            <Link to="/">
                                <IconButton
                                    icon={<Icon as={FaFacebookF}/>}
                                    bgColor="transparent"
                                    border="1px solid"
                                    borderColor="white"
                                    color="white"
                                    rounded="full"
                                    py="20px"
                                    px="10px"
                                />   
                            </Link>
        
                            <Link to="/">
                                <IconButton
                                    icon={<Icon as={FaInstagram}/>}
                                    bgColor="transparent"
                                    border="1px solid"
                                    borderColor="white"
                                    color="white"
                                    rounded="full"
                                    py="20px"
                                    px="10px"
                                />   
                            </Link>
        
                            <Link to="/">
                                <IconButton
                                    icon={<Icon as={BiLogoGmail}/>}
                                    bgColor="transparent"
                                    border="1px solid"
                                    borderColor="white"
                                    color="white"
                                    rounded="full"
                                    py="20px"
                                    px="10px"
                                />   
                            </Link>
        
                        </VStack>

                </HStack>


              <form
                method="post"
                onSubmit={handleSubmit(handleSendContact)}
                style={{ width: "100%" }}
              >
                <SimpleGrid 
                  w="full" 
                  columns={[1, 1, 12]}
                  gap="20px"
                >
                  {inputs.map((input, i) => (
                    <FormControl
                      key={i}
                      isInvalid={!!errors[input.name]}
                      id={input.name}
                      gridColumn={input.col === 12 ? ["span 1", "span 1", "span 12"] : ["span 1", "span 1", "span 4"]}
                    >
                      {input.element !== "checkbox" && (
                        <FormLabel
                          fontSize={[18, 18, 20]}
                          fontWeight={400}
                          color="white"
                          lineHeight="32px"
                          letterSpacing="0%"
                        >
                          {input.label}
                        </FormLabel>
                      )}

                      {input.element === "input" && (
                        <Input
                          w="full"
                          variant="flushed"
                          type={input.type}
                          placeholder={input.placeholder}
                          size="lg"
                          h="initial"
                          py="4px"
                          px="20px"
                          rounded="initial"
                          borderBottom="0.92px solid"
                          bg="transparent"
                          color="white"
                          fontSize={[18, 18, 20]}
                          fontWeight={300}
                          lineHeight="40px"
                          letterSpacing="0%"
                          isDisabled={isSubmitting || isLoading}
                          _placeholder={{
                            fontSize: 16,
                            fontWeight: 300,
                            color: "brand.400",
                            lineHeight: "40px",
                            letterSpacing: "0%",
                          }}
                          borderBottomColor="#F9FAFB80"
                          {...register(input.name, input.validation)}
                        />
                      )}


                      {input.element === "textarea" && (
                        <Textarea
                          w="full"
                          variant="flushed"
                          rows={4}
                          type={input.type}
                          placeholder={input.placeholder}
                          size="lg"
                          h="initial"
                          py="12px"
                          px="20px"
                          rounded="initial"
                          borderBottom="0.92px solid"
                          bg="transparent"
                          color="white"
                          fontSize={[18, 18, 20]}
                          fontWeight={300}
                          lineHeight="40px"
                          letterSpacing="0%"
                          isDisabled={isSubmitting || isLoading}
                          _placeholder={{
                            fontSize: [18, 18, 20],
                            fontWeight: 300,
                            color: "brand.400",
                            lineHeight: "40px",
                            letterSpacing: "0%",
                          }}
                          borderBottomColor="#F9FAFB80"
                          {...register(input.name, input.validation)}
                        />
                      )}

                      <FormErrorMessage>
                        {errors[input.name]?.message}
                      </FormErrorMessage>
                    </FormControl>
                  ))}
                </SimpleGrid>

                <VStack
                  w="full"
                  justify="start"
                  align="start"
                  mt="40px"
                >
                    <CtaButton
                        isFull={false}
                        isLink={false}
                        isDisabled={isSubmitting || isLoading}
                        isLoading={isSubmitting || isLoading}
                        btnText="Leave us a Message"
                        isReverse={true}
                        handleClick={handleSubmit(handleSendContact)}
                        rightIcon={FaArrowRightLong}
                    />

                </VStack>

              </form>


            </VStack>
        </ContainerLayout>

        {/* Thank You Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" zIndex={100000}>
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

export default ContactForm