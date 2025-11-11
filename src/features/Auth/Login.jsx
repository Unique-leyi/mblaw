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
import AuthLayout from "../../ui/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import CtaButton from "../../ui/CtaButton";



function Login() {

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

 
   const inputs = [
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
          type: "password",
          element: "input",
          label: "Password",
          name: "password",
          placeholder: "**********",
          validation: {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            validate: value => value.trim() !== '' || 'Password cannot be empty'
          },
      },


   ];
 
   const handleLogin = (data) => {
     console.log(data);
   };



  return (
    <AuthLayout
      title="Access Your MB Law Client Portal"
      content="Sign in to continue your legal journey securely, review your case updates, and manage your appointments with confidence."
    >
        <VStack
            w="full"
            justify="start"
            align="start"
            py={["20px", "20px", "35px"]}
            px={["20px", "20px", "46px"]}
            bgColor="white"
            rounded="20px"
        >

            <VStack
                w="full"
                justify="start"
                align="start"
                gap="6px"
                mb="20px"
            >
                <Heading
                    fontSize={["24px", "24px", "30px"]}
                    fontWeight={700}
                    color="brand.100"
                    lineHeight="25px"
                    letterSpacing="0%"
                >
                    Login
                </Heading>

                <Text
                    fontSize={["16px", "16px", "18px"]}
                    fontWeight={300}
                    color="brand.400"
                    lineHeight="25px"
                    letterSpacing="0%"
                >
                    Sign in to continue getting the best legal services
                </Text>

            </VStack>

            <form
                method="post"
                onSubmit={handleSubmit(handleLogin)}
                style={{ width: "100%" }}
            >
                <VStack 
                    w="full" 
                    justify="center" 
                    align="center" 
                    gap="20px" 
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
                            fontSize="16px"
                            fontFamily="openSans"
                            fontWeight={400}
                            color="brand.200"
                            lineHeight="40px"
                            letterSpacing="0%"
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
                            py="10px"
                            px="15px"
                            rounded="10px"
                            border="1px solid"
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
                            py="20px"
                            px="15px"
                            rounded="20px"
                            border="1px solid"
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
                    btnText="Sign in"
                    handleClick={handleSubmit(handleLogin)}
                />
            </form>
        </VStack>

    </AuthLayout>
  )
}

export default Login