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
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import CtaButton from "../../ui/CtaButton";
import MiniHeading from "../../ui/MiniHeading";
import { useForm } from "react-hook-form";


function ContactSection() {


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
        label: "Subject / Iniquiry Type",
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
                                color="brand.500"
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
                                color="brand.500"
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
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                        btnText="Submit Form"
                        handleClick={handleSubmit(handleSendContact)}
                      />
                    </form>
                  </VStack>
                  
                </VStack>

              </SimpleGrid>


            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default ContactSection