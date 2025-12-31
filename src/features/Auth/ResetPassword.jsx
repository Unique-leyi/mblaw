import React, { useEffect, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useResetPassword } from "./useResetPassword";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword, isLoading: isResetting } = useResetPassword();
  const { email, code } = location.state || {};
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if no email or code
  useEffect(() => {
    if (!email || !code) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, code, navigate]);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const inputs = [
    {
      type: "password",
      element: "input",
      label: "New Password",
      name: "password",
      placeholder: "**********",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        validate: (value) => value.trim() !== "" || "Password cannot be empty",
      },
    },
    {
      type: "password",
      element: "input",
      label: "Confirm Password",
      name: "confirm_password",
      placeholder: "**********",
      validation: {
        required: "Please confirm your password",
        validate: (value) => {
          const currentPassword = watch("password");
          if (!value) return "Please confirm your password";
          if (value.trim() === "") return "Password cannot be empty";
          if (value !== currentPassword) return "Passwords do not match";
          return true;
        },
      },
    },
  ];

  const handleResetPassword = (data) => {
    resetPassword({ newPassword: data.password });
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      content="Create a new secure password for your MB Law account."
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
            Reset Password
          </Heading>

          <Text
            fontSize={["16px", "16px", "18px"]}
            fontWeight={300}
            color="brand.400"
            lineHeight="25px"
            letterSpacing="0%"
          >
            Enter your new password below
          </Text>
        </VStack>

        <form
          method="post"
          onSubmit={handleSubmit(handleResetPassword)}
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
                        type={input.name === "password" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")}
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
                        isDisabled={isSubmitting || isResetting}
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
                          aria-label={input.name === "password" ? (showPassword ? "Hide password" : "Show password") : (showConfirmPassword ? "Hide password" : "Show password")}
                          icon={<Icon as={input.name === "password" ? (showPassword ? FiEyeOff : FiEye) : (showConfirmPassword ? FiEyeOff : FiEye)} />}
                          variant="ghost"
                          size="sm"
                          onClick={() => input.name === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                          color="brand.200"
                          _hover={{ bg: "transparent" }}
                          isDisabled={isSubmitting || isResetting}
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
                      isDisabled={isSubmitting || isResetting}
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
            isDisabled={isSubmitting || isResetting}
            isLoading={isSubmitting || isResetting}
            btnText="Reset Password"
            handleClick={handleSubmit(handleResetPassword)}
          />
        </form>

        <VStack w="full" align="center" mt="20px" gap="10px">
          <Text fontSize="14px" color="brand.400">
            Remember your password?{" "}
            <Link
              to="/login"
              style={{
                color: isSubmitting || isResetting ? "#999" : "#0B1D3A",
                fontWeight: 600,
                textDecoration: "underline",
                pointerEvents: isSubmitting || isResetting ? "none" : "auto",
                cursor: isSubmitting || isResetting ? "not-allowed" : "pointer",
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

export default ResetPassword;

