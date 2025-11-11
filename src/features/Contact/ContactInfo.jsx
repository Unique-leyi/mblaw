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


function ContactInfo() {



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

                    </VStack>

                    <HStack
                      w="full"
                      justify="space-between"
                      align="center"
                      gap="20px"
                      wrap={["wrap", "wrap", "nowrap"]}
                      flexDirection={["column", "column", "row"]}
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
                                Number
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

                    </HStack>

                </SimpleGrid>



            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default ContactInfo