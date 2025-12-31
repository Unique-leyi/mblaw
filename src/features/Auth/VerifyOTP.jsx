import React, { useState, useEffect } from "react";
import {
  VStack,
  Text,
  Heading,
  FormControl,
  FormErrorMessage,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import AuthLayout from "../../ui/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import CtaButton from "../../ui/CtaButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useVerifyOTP } from "./useVerifyOTP";

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP, isLoading: isVerifying } = useVerifyOTP();
  const [otp, setOtp] = useState("");
  const email = location.state?.email || "";

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleVerifyOTP = () => {
    if (otp.length !== 4) {
      return;
    }
    verifyOTP({ code: otp });
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      content="Enter the 4-digit verification code sent to your email address."
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
            Verify OTP
          </Heading>

          <Text
            fontSize={["16px", "16px", "18px"]}
            fontWeight={300}
            color="brand.400"
            lineHeight="25px"
            letterSpacing="0%"
          >
            Enter the 4-digit code sent to your email
          </Text>
        </VStack>

        <form
          method="post"
          onSubmit={handleSubmit(handleVerifyOTP)}
          style={{ width: "100%" }}
        >
          <VStack
            w="full"
            justify="center"
            align="center"
            gap="20px"
            mb={["20px", "20px", "20px"]}
          >
            <FormControl isInvalid={otp.length !== 4 && otp.length > 0}>
              <HStack
                w="full"
                justify="center"
                align="center"
                gap="10px"
                spacing={0}
              >
                <PinInput
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  type="number"
                  size="lg"
                  mask
                  isDisabled={isSubmitting || isVerifying}
                >
                  <PinInputField
                    w="60px"
                    h="60px"
                    fontSize="24px"
                    fontWeight={600}
                    rounded="10px"
                    border="1px solid"
                    borderColor="#0000001A"
                    bg="transparent"
                    color="brand.200"
                    _focus={{
                      borderColor: "brand.100",
                      borderWidth: "2px",
                    }}
                  />
                  <PinInputField
                    w="60px"
                    h="60px"
                    fontSize="24px"
                    fontWeight={600}
                    rounded="10px"
                    border="1px solid"
                    borderColor="#0000001A"
                    bg="transparent"
                    color="brand.200"
                    _focus={{
                      borderColor: "brand.100",
                      borderWidth: "2px",
                    }}
                  />
                  <PinInputField
                    w="60px"
                    h="60px"
                    fontSize="24px"
                    fontWeight={600}
                    rounded="10px"
                    border="1px solid"
                    borderColor="#0000001A"
                    bg="transparent"
                    color="brand.200"
                    _focus={{
                      borderColor: "brand.100",
                      borderWidth: "2px",
                    }}
                  />
                  <PinInputField
                    w="60px"
                    h="60px"
                    fontSize="24px"
                    fontWeight={600}
                    rounded="10px"
                    border="1px solid"
                    borderColor="#0000001A"
                    bg="transparent"
                    color="brand.200"
                    _focus={{
                      borderColor: "brand.100",
                      borderWidth: "2px",
                    }}
                  />
                </PinInput>
              </HStack>
              {otp.length > 0 && otp.length !== 4 && (
                <FormErrorMessage textAlign="center" w="full">
                  Please enter all 4 digits
                </FormErrorMessage>
              )}
            </FormControl>
          </VStack>

          <CtaButton
            isFull={true}
            isLink={false}
            isDisabled={isSubmitting || isVerifying || otp.length !== 4}
            isLoading={isSubmitting || isVerifying}
            btnText="Verify Code"
            handleClick={handleSubmit(handleVerifyOTP)}
          />
        </form>

        <VStack w="full" align="center" mt="20px" gap="10px">
          <Text fontSize="14px" color="brand.400">
            Didn't receive the code?{" "}
            <Link
              to="/forgot-password"
              style={{
                color: isSubmitting || isVerifying ? "#999" : "#0B1D3A",
                fontWeight: 600,
                textDecoration: "underline",
                pointerEvents: isSubmitting || isVerifying ? "none" : "auto",
                cursor: isSubmitting || isVerifying ? "not-allowed" : "pointer",
              }}
            >
              Resend
            </Link>
          </Text>
        </VStack>
      </VStack>
    </AuthLayout>
  );
}

export default VerifyOTP;

