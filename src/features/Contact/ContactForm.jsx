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
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import CtaButton from "../../ui/CtaButton";
import MiniHeading from "../../ui/MiniHeading";
import { FaArrowRightLong, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { useForm } from "react-hook-form";


function ContactForm() {


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
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
        required: "Phone Number is required",
        minLength: {
          value: 11,
          message: "Phone Number must be at least 11 characters",
        },
        validate: (value) => value.trim() !== "" || "Phone Number cannot be empty",
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
    console.log(data);
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
                          _placeholder={{
                            fontSize: [18, 18, 20],
                            fontWeight: 300,
                            color: "brand.500",
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
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                        btnText="Leave us a Message"
                        isReverse={true}
                        handleClick={handleSubmit(handleSendContact)}
                        rightIcon={FaArrowRightLong}
                    />

                </VStack>

              </form>


            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default ContactForm