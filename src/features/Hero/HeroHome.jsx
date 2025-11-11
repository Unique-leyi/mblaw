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
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import CtaButton from "../../ui/CtaButton";


function HeroHome() {
  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={["5rem", "6rem", "8rem"]}
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
            >
                <SimpleGrid
                  w="full"
                  columns={[1, 1, 2]}
                  justifyContent="center"
                  alignItems="center"
                  gap="40px"
                >
                    <VStack
                     w="full"
                     justify="start"
                     align="start"
                     gap="30px"
                    >
                        <Text
                          fontSize={["16px", "16px", "20px"]}
                          fontWeight={300}
                          lineHeight="24px"
                          color="brand.200"
                          letterSpacing="0%"
                        >
                            Welcome to MB Law office
                        </Text>

                        <Heading
                          fontSize={["32px", "36px", "50px"]}
                          fontWeight={700}
                          lineHeight="100%"
                          color="brand.100"
                          letterSpacing="0%"
                        >
                            Delivering Trusted Legal Excellence Through Integrity, Expertise, and Innovation
                        </Heading>

                        <Text
                            fontSize={["16px", "16px", "20px"]}
                            fontWeight={300}
                            lineHeight="28px"
                            color="brand.200"
                            letterSpacing="0%"
                        >
                            MB Law stands as a forward-thinking firm dedicated to providing exceptional legal solutions built on trust, precision, and a commitment to client success.
                        </Text>

                        <VStack
                         w="full"
                         justify="start"
                         align="start"
                         mt="30px"
                        >
                            <CtaButton
                              isLink={true}
                              isOutline={false}
                              url="/book-consultation"
                              btnText="Book a Consultation"
                            />

                        </VStack>

                    </VStack>


                    <VStack
                     w="full"
                     justify="center"
                     align="center"
                     data-aos="slide-left"
                     data-aos-duration="1000"
                    >
                        <Image
                          w="full"
                          h="auto"
                          src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762767372/MbLaw/Frame_237643_ykadhu.png"
                          alt="hero-image"
                          objectFit="contain"
                        />

                    </VStack>

                </SimpleGrid>

            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default HeroHome