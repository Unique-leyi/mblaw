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
import MiniHeading from "../../ui/MiniHeading";


function AboutSection() {
  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={["2rem", "2rem", "4rem"]}
      bgColor="brand.100"
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
              gap={["40px", "40px", "80px"]}
            >

                <VStack
                    w="full"
                    justify="space-between"
                    align="center"
                    gap="30px"
                >
                    <VStack
                      w="full"
                      justify="start"
                      align="start"
                      gap="10px"
                    >
                        <MiniHeading
                            miniTitle="About us"
                            title="Built on Integrity, Driven by Excellence"
                            content="At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation."
                            btnText="See More"
                            isReverse={true}
                            url="/about-us"
                        />



                </VStack>



                </VStack>


                <VStack
                    w="full"
                    justify="center"
                    align="center"
                >
                    <Image
                        w="full"
                        h="auto"
                        src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762768335/MbLaw/Frame_48095591_1_zuslsg.png"
                        alt="hero-image"
                        objectFit="contain"
                    />

                </VStack>



            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default AboutSection