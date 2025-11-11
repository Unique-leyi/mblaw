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
import MiniHeading from '../../ui/MiniHeading'


function AboutUs() {
  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      pt={["6rem", "6rem", "8rem"]}
      pb={["2rem", "2rem", "4rem"]}
    >
      <ContainerLayout>
        <VStack
          w="full"
          justify="start"
          align="start"
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
              gap="40px"
            >

              <MiniHeading
                miniTitle="About Us"
                title="Built on Integrity, Driven by Excellence"
                titleColor="brand.100"
              />

              <Text
                  fontSize={["16px", "16px", "20px"]}
                  fontWeight={300}
                  lineHeight="28px"
                  color="brand.200"
                  letterSpacing="0%"
              >
                  At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs. At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.
              </Text>

              

            </VStack>


            <VStack
             w="full"
             justify="center"
             align="center"
             data-aos="slide-left"
             data-aos-duration="500"
            >

              <Image
                w="full"
                h="full"
                src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762854292/MbLaw/Frame_237643_dtbrtq.png"
                alt="about-img"
                objectFit="cover"
              />

            </VStack>

          </SimpleGrid>

        </VStack>
      </ContainerLayout>
    </Stack>
  )
}

export default AboutUs

