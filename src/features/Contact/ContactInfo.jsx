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
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { useForm } from "react-hook-form";


function ContactInfo() {
  const address = "8975 McLaughlin Rd S #10, Brampton, ON, Canada";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  // Using Google Maps embed without API key (works for basic embeds)
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

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
              gap={["40px", "40px", "80px"]}
            >
                <SimpleGrid
                  w="full"
                  columns={[1, 1, 2]}
                  gap="30px"
                >
                    <VStack
                      w="full"
                      justify="start"
                      align="start"
                    >
                        <MiniHeading
                          miniTitle="Contact Info"
                          title="We are always happy to assist you"
                          titleColor="brand.100"
                        />

                        <VStack
                          w="full"
                          justify="start"
                          align="start"
                          gap="30px"
                          mt="40px"
                        >
                            <VStack
                              w="full"
                              justify="start"
                              align="start"
                              gap="20px"
                            >
                                <Heading
                                  fontSize={["20px", "20px", "25px"]}
                                  fontWeight={700}
                                  color="brand.100"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    Email Address
                                </Heading>

                                <Box
                                  w="10%"
                                  h="2px"
                                  bgColor="brand.100"
                                  rounded="full"
                                />

                                <Text
                                  fontSize={["18px", "18px", "20px"]}
                                  fontWeight={600}
                                  color="brand.100"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    law.musa@gmail.com
                                </Text>

                                <Text
                                  fontSize={["16px", "16px", "18px"]}
                                  fontWeight={300}
                                  color="brand.400"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    Assistance hours: <br/>
                                    09:00 a.m. – 05:00 p.m.
                                </Text>
                            </VStack>

                            <VStack
                              w="full"
                              justify="start"
                              align="start"
                              gap="20px"
                            >
                                <Heading
                                  fontSize={["20px", "20px", "25px"]}
                                  fontWeight={700}
                                  color="brand.100"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    Phone Number
                                </Heading>

                                <Box
                                  w="10%"
                                  h="2px"
                                  bgColor="brand.100"
                                  rounded="full"
                                />

                                <Text
                                  fontSize={["18px", "18px", "20px"]}
                                  fontWeight={600}
                                  color="brand.100"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    +1-647-642-2117
                                </Text>

                                <Text
                                  fontSize={["16px", "16px", "18px"]}
                                  fontWeight={300}
                                  color="brand.400"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    Assistance hours: <br/>
                                    09:00 a.m. – 05:00 p.m.
                                </Text>
                            </VStack>

                            <VStack
                              w="full"
                              justify="start"
                              align="start"
                              gap="20px"
                            >
                                <Heading
                                  fontSize={["20px", "20px", "25px"]}
                                  fontWeight={700}
                                  color="brand.100"
                                  lineHeight="25px"
                                  letterSpacing="0%"
                                >
                                    Office Address
                                </Heading>

                                <Box
                                  w="10%"
                                  h="2px"
                                  bgColor="brand.100"
                                  rounded="full"
                                />

                                <HStack
                                  align="start"
                                  gap="12px"
                                  w="full"
                                >
                                    <Icon
                                      as={FaMapMarkerAlt}
                                      color="brand.100"
                                      boxSize="20px"
                                      mt="4px"
                                    />
                                    <Text
                                      fontSize={["16px", "16px", "18px"]}
                                      fontWeight={400}
                                      color="brand.200"
                                      lineHeight="28px"
                                      letterSpacing="0%"
                                    >
                                        {address}
                                    </Text>
                                </HStack>

                                <Button
                                  as="a"
                                  href={googleMapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  leftIcon={<Icon as={FaMapMarkerAlt} />}
                                  colorScheme="brand"
                                  variant="outline"
                                  borderColor="brand.100"
                                  color="brand.100"
                                  _hover={{
                                    bgColor: "brand.100",
                                    color: "white"
                                  }}
                                  size="md"
                                >
                                    Get Directions
                                </Button>
                            </VStack>
                        </VStack>
                    </VStack>

                    <VStack
                      w="full"
                      justify="start"
                      align="start"
                      gap="20px"
                    >
                        <Heading
                          fontSize={["20px", "20px", "25px"]}
                          fontWeight={700}
                          color="brand.100"
                          lineHeight="25px"
                          letterSpacing="0%"
                        >
                            Find Us
                        </Heading>

                        <Box
                          w="full"
                          h={["300px", "400px", "500px"]}
                          rounded="12px"
                          overflow="hidden"
                          border="2px solid"
                          borderColor="brand.200"
                          boxShadow="lg"
                        >
                            <iframe
                              src={googleMapsEmbedUrl}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="MB Law Office Location"
                            />
                        </Box>
                    </VStack>

                </SimpleGrid>

            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default ContactInfo