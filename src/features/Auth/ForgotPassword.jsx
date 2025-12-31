import React from "react";
import {
  VStack,
  Text,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import AuthLayout from "../../ui/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import CtaButton from "../../ui/CtaButton";
import { Link } from "react-router-dom";
import { useForgotPassword } from "./useForgotPassword";

function ForgotPassword() {
  const { forgotPassword, isLoading: isSubmittingRequest } = useForgotPassword();

  const {
    handleSubmit,
    register,
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
  ];

  const handleForgotPassword = (data) => {
    forgotPassword({ email: data.email });
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      content="Enter your email address and we'll send you a verification code to reset your password."
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
            Forgot Password
          </Heading>

          <Text
            fontSize={["16px", "16px", "18px"]}
            fontWeight={300}
            color="brand.400"
            lineHeight="25px"
            letterSpacing="0%"
          >
            Enter your email to receive a verification code
          </Text>
        </VStack>

        <form
          method="post"
          onSubmit={handleSubmit(handleForgotPassword)}
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
                    color="brand.200"
                    fontSize={[18, 18, 20]}
                    fontWeight={300}
                    lineHeight="40px"
                    letterSpacing="0%"
                    isDisabled={isSubmitting || isSubmittingRequest}
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

                <FormErrorMessage>
                  {errors[input.name]?.message}
                </FormErrorMessage>
              </FormControl>
            ))}
          </VStack>

          <CtaButton
            isFull={true}
            isLink={false}
            isDisabled={isSubmitting || isSubmittingRequest}
            isLoading={isSubmitting || isSubmittingRequest}
            btnText="Send Verification Code"
            handleClick={handleSubmit(handleForgotPassword)}
          />
        </form>

        <VStack w="full" align="center" mt="20px" gap="10px">
          <Text fontSize="14px" color="brand.400">
            Remember your password?{" "}
            <Link
              to="/login"
              style={{
                color: isSubmitting || isSubmittingRequest ? "#999" : "#0B1D3A",
                fontWeight: 600,
                textDecoration: "underline",
                pointerEvents: isSubmitting || isSubmittingRequest ? "none" : "auto",
                cursor: isSubmitting || isSubmittingRequest ? "not-allowed" : "pointer",
              }}
            >
              Sign in
            </Link>
          </Text>
        </VStack>
      </VStack>
    </AuthLayout>
  );
}

export default ForgotPassword;

