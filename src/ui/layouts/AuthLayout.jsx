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
import MiniHeading from "../MiniHeading";
import Navbar from "./Navbar";
import ContainerLayout from "./ContainerLayout";


function AuthLayout({ title, content, children }) {
  return (
    <Stack
      w="full"
      justify="center"
      align="center"
      h="full"
      minH={["full", "full",  "100vh"]}
      py={["5rem", "6rem", "8rem"]}
      bgImage="https://res.cloudinary.com/doqvfemo3/image/upload/v1762883180/MbLaw/20913291a9cd9cef841ea2db04fdbea7cd5b4fe5_xatgip.jpg"
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
            <SimpleGrid
              w="full"
              columns={[1, 1, 2]}
              gap="40px"
              zIndex={2}
              alignItems="center"
            >
                <VStack
                  w="full"
                  justify="start"
                  align="start"
                >
                    <MiniHeading
                        title={title}
                        titleColor="white"
                        content={content}
                        contentColor="white"
                        titleFontSize={["60px", "60px", "80px"]}
                        contentFontSize={["20px", "20px", "25px"]}
                    />

                </VStack>

                <VStack
                  w="full"
                  justify="start"
                  align="start"
                >
                    {children}
                </VStack>

            </SimpleGrid>
        </ContainerLayout>

    </Stack>
  )
}

export default AuthLayout