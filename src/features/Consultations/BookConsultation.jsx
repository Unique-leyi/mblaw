import React from "react";
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import CtaButton from "../../ui/CtaButton";
import MiniHeading from "../../ui/MiniHeading";
import { useCreateConsultation } from "./useCreateConsultation";

function BookConsultation() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { createConsultation, isLoading } = useCreateConsultation();

  const handleBookConsultation = (data) => {
    createConsultation(data);
  };

  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={["2rem", "2rem", "4rem"]}
      bgColor="brand.700"
    >
      <ContainerLayout>
        <VStack
          w="full"
          justify="center"
          align="center"
          py="20px"
          gap={["40px", "40px", "80px"]}
        >
          <Box
            w="full"
            maxW="900px"
            bg="white"
            rounded="24px"
            px={["20px", "24px", "40px"]}
            py={["24px", "32px", "40px"]}
            boxShadow="0px 20px 60px rgba(15, 23, 42, 0.08)"
          >
            {/* Header */}
            <Box mb={["24px", "28px", "40px"]}>
              <MiniHeading
                title="Schedule Your Consultation"
                titleColor="brand.100"
                content="Schedule a personalized consultation with our experienced attorneys and receive clear, practical guidance tailored to your unique legal needs."
                contentColor="brand.200"
                isCenter={true}
              />
            </Box>

            <form
              method="post"
              onSubmit={handleSubmit(handleBookConsultation)}
              style={{ width: "100%" }}
            >
              <VStack w="full" align="start" spacing={["24px", "28px", "32px"]}>
                {/* Personal Information */}
                <VStack w="full" align="start" spacing="16px">
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    color="brand.200"
                  >
                    Personal Information
                  </Text>

                  <SimpleGrid
                    w="full"
                    columns={[1, 1, 2]}
                    gap="20px"
                  >
                    <FormControl isInvalid={!!errors.firstName}>
                      <FormLabel
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        First Name
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="John"
                        size="lg"
                        py="10px"
                        px="15px"
                        rounded="10px"
                        border="1px solid"
                        borderColor="#0000001A"
                        fontSize="16px"
                        fontWeight={300}
                        color="brand.200"
                        _placeholder={{
                          color: "brand.200",
                        }}
                        {...register("firstName", {
                          required: "First name is required",
                          validate: (value) =>
                            value.trim() !== "" || "First name cannot be empty",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.firstName?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.lastName}>
                      <FormLabel
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        Last Name
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Doe"
                        size="lg"
                        py="10px"
                        px="15px"
                        rounded="10px"
                        border="1px solid"
                        borderColor="#0000001A"
                        fontSize="16px"
                        fontWeight={300}
                        color="brand.200"
                        _placeholder={{
                          color: "brand.200",
                        }}
                        {...register("lastName", {
                          required: "Last name is required",
                          validate: (value) =>
                            value.trim() !== "" || "Last name cannot be empty",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.lastName?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        Email Address
                      </FormLabel>
                      <Input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        size="lg"
                        py="10px"
                        px="15px"
                        rounded="10px"
                        border="1px solid"
                        borderColor="#0000001A"
                        fontSize="16px"
                        fontWeight={300}
                        color="brand.200"
                        _placeholder={{
                          color: "brand.200",
                        }}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.phone}>
                      <FormLabel
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        Phone Number
                      </FormLabel>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        size="lg"
                        py="10px"
                        px="15px"
                        rounded="10px"
                        border="1px solid"
                        borderColor="#0000001A"
                        fontSize="16px"
                        fontWeight={300}
                        color="brand.200"
                        _placeholder={{
                          color: "brand.200",
                        }}
                        {...register("phone", {
                          required: "Phone number is required",
                          minLength: {
                            value: 8,
                            message:
                              "Phone number must be at least 8 characters",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.phone?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                </VStack>

                {/* Category */}
                <VStack w="full" align="start" spacing="16px">
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    color="brand.200"
                  >
                    Category
                  </Text>

                  <FormControl w="full" isInvalid={!!errors.category}>
                    <Select
                      placeholder="Appointment"
                      size="lg"
                      py="10px"
                      px="15px"
                      rounded="10px"
                      border="1px solid"
                      borderColor="#0000001A"
                      fontSize="16px"
                      fontWeight={300}
                      color="brand.200"
                      _placeholder={{
                        color: "brand.200",
                      }}
                      {...register("category", {
                        required: "Please select a category",
                      })}
                    >
                      <option value="appointment">Appointment</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="case-review">Case Review</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.category?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>

                {/* Practice Area */}
                <VStack w="full" align="start" spacing="16px">
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    color="brand.200"
                  >
                    Practice Area
                  </Text>

                  <FormControl w="full" isInvalid={!!errors.practiceArea}>
                    <FormLabel
                      fontSize="14px"
                      fontWeight={400}
                      color="brand.200"
                    >
                      Area Of Legal Concern
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="e.g. Family Law, Property, Corporate"
                      size="lg"
                      py="10px"
                      px="15px"
                      rounded="10px"
                      border="1px solid"
                      borderColor="#0000001A"
                      fontSize="16px"
                      fontWeight={300}
                      color="brand.200"
                      _placeholder={{
                        color: "brand.200",
                      }}
                      {...register("practiceArea", {
                        required: "Please enter your area of legal concern",
                        validate: (value) =>
                          value.trim() !== "" ||
                          "Area of legal concern cannot be empty",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.practiceArea?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>

                {/* Appointment Details */}
                <VStack w="full" align="start" spacing="16px">
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    color="brand.200"
                  >
                    Appointment Details
                  </Text>

                  <SimpleGrid
                    w="full"
                    columns={[1, 1, 2]}
                    gap="20px"
                  >
                    <FormControl isInvalid={!!errors.preferredDate}>
                      <FormLabel
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        Preferred Date
                      </FormLabel>
                      <Input
                        type="date"
                        size="lg"
                        py="10px"
                        px="15px"
                        rounded="10px"
                        border="1px solid"
                        borderColor="#0000001A"
                        fontSize="16px"
                        fontWeight={300}
                        color="brand.200"
                        {...register("preferredDate", {
                          required: "Preferred date is required",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.preferredDate?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.preferredTime}>
                      <FormLabel
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        Preferred Time
                      </FormLabel>
                      <Input
                        type="time"
                        size="lg"
                        py="10px"
                        px="15px"
                        rounded="10px"
                        border="1px solid"
                        borderColor="#0000001A"
                        fontSize="16px"
                        fontWeight={300}
                        color="brand.200"
                        {...register("preferredTime", {
                          required: "Preferred time is required",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.preferredTime?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                </VStack>

                {/* Case Summary */}
                <VStack w="full" align="start" spacing="16px">
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    color="brand.200"
                  >
                    Case Summary
                  </Text>

                  <FormControl w="full" isInvalid={!!errors.caseSummary}>
                    <FormLabel
                      fontSize="14px"
                      fontWeight={400}
                      color="brand.200"
                    >
                      Brief Description Of Your Case / Question
                    </FormLabel>
                    <Textarea
                      rows={5}
                      placeholder="Describe your case or question here"
                      size="lg"
                      py="12px"
                      px="15px"
                      rounded="10px"
                      border="1px solid"
                      borderColor="#0000001A"
                      fontSize="16px"
                      fontWeight={300}
                      color="brand.200"
                      _placeholder={{
                        color: "brand.200",
                      }}
                      {...register("caseSummary", {
                        required: "Please provide a brief description",
                        validate: (value) =>
                          value.trim() !== "" ||
                          "Case description cannot be empty",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.caseSummary?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>

                {/* Consent & Submit */}
                <VStack w="full" align="start" spacing="20px">
                  <FormControl isInvalid={!!errors.consent}>
                    <Checkbox
                      colorScheme="blue"
                      iconColor="white"
                      {...register("consent", {
                        required:
                          "You must agree to the privacy policy to proceed",
                      })}
                    >
                      <Text
                        fontSize="14px"
                        fontWeight={400}
                        color="brand.200"
                      >
                        I understand this is an initial consultation and agree
                        to MB Law&apos;s privacy policy.
                      </Text>
                    </Checkbox>
                    <FormErrorMessage>
                      {errors.consent?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <CtaButton
                    isFull={true}
                    isLink={false}
                    btnText="Book Consultation"
                    isDisabled={isSubmitting || isLoading}
                    isLoading={isSubmitting || isLoading}
                    handleClick={handleSubmit(handleBookConsultation)}
                  />
                </VStack>
              </VStack>
            </form>
          </Box>
        </VStack>
      </ContainerLayout>
    </Stack>
  );
}

export default BookConsultation;