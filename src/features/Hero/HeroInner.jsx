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
import Navbar from "../../ui/layouts/Navbar";


function HeroInner({ title, content, image }) {
  return (
    <Stack
      w="full"
      justify="center"
      align="center"
      h={["full", "full", "548px"]}
      py={["5rem", "6rem", "8rem"]}
      bgImage={image}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      position="relative"
      _before={{
        content: '""',
        w: "full",
        h: "full",
        position: "absolute",
        inset: 0,
        bgColor: "#00000033",
        zIndex: 1
      }}
    >
        <Navbar isWhite={true}/>
        <ContainerLayout>
            <VStack
              w={["full", "full", "70%"]}
              mx={["initial", "initial", "auto"]}
              justify="center"
              align="center"
              py="20px"
              gap="20px"
              zIndex={2}
            >
                <Text
                    fontSize={["24px", "24px", "30px"]}
                    fontWeight={400}
                    lineHeight="24px"
                    color="white"
                    letterSpacing="0%"
                    textAlign="center"
                >
                    {title}
                </Text>

                <Heading
                    fontSize={["40px", "48px", "60px"]}
                    fontWeight={700}
                    lineHeight="100%"
                    color="white"
                    textAlign="center"
                    letterSpacing="0%"
                >
                    {content}
                </Heading>


            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default HeroInner