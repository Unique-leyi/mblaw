import React, { useState } from "react";
import {
  VStack,
  Text,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthLayout from "../../ui/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import CtaButton from "../../ui/CtaButton";
import { Link } from "react-router-dom";
import { useUnifiedLogin } from "./useUnifiedLogin";



function Login() {
    const { login, isLoading: isLoggingIn } = useUnifiedLogin();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);

 
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
     login(data);
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
                        input.type === "password" ? (
                            <InputGroup>
                                <Input
                                    w="full"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={input.placeholder}
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
                                    isDisabled={isSubmitting || isLoggingIn}
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
                                <InputRightElement h="full" pr="10px">
                                    <IconButton
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        icon={<Icon as={showPassword ? FiEyeOff : FiEye} />}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        color="brand.200"
                                        _hover={{ bg: "transparent" }}
                                        isDisabled={isSubmitting || isLoggingIn}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        ) : (
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
                                color="brand.200"
                                fontSize={[18, 18, 20]}
                                fontWeight={300}
                                lineHeight="40px"
                                letterSpacing="0%"
                                isDisabled={isSubmitting || isLoggingIn}
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
                        )
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
                    isDisabled={isSubmitting || isLoggingIn}
                    isLoading={isSubmitting || isLoggingIn}
                    btnText="Sign in"
                    handleClick={handleSubmit(handleLogin)}
                />
            </form>

            <VStack w="full" align="center" mt="20px" gap="10px">
                <Text fontSize="14px" color="brand.400">
                    <Link
                        to="/forgot-password"
                        style={{
                            color: isSubmitting || isLoggingIn ? "#999" : "#0B1D3A",
                            fontWeight: 600,
                            textDecoration: "underline",
                            pointerEvents: isSubmitting || isLoggingIn ? "none" : "auto",
                            cursor: isSubmitting || isLoggingIn ? "not-allowed" : "pointer",
                        }}
                    >
                        Forgot Password?
                    </Link>
                </Text>
                <Text fontSize="14px" color="brand.400">
                    Don't have an account?{" "}
                    <Link
                        to="/create-account"
                        style={{
                            color: isSubmitting || isLoggingIn ? "#999" : "#0B1D3A",
                            fontWeight: 600,
                            textDecoration: "underline",
                            pointerEvents: isSubmitting || isLoggingIn ? "none" : "auto",
                            cursor: isSubmitting || isLoggingIn ? "not-allowed" : "pointer",
                        }}
                    >
                        Register
                    </Link>
                </Text>
            </VStack>
        </VStack>

    </AuthLayout>
  )
}

export default Login