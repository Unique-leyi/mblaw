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
import { BinocularsIcon } from "../../ui/icons";


function OurMission() {
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
          w={["full", "full", "60%"]}
          mx={["initial", "initial", "auto"]}
          justify="center"
          align="center"
          gap="10px"
        >

            <Icon as={BinocularsIcon} fontSize="60px"/>
            <MiniHeading
                title="Our Mission"
                titleColor="white"
                contentColor="white"
                content="At MB Law Office, our mission is to provide exceptional legal services tailored to meet the unique needs of our clients. We are dedicated to upholding the highest standards of professionalism and integrity in every case we handle."
                isCenter={true}
            />

        </VStack>
      </ContainerLayout>
    </Stack>
  )
}

export default OurMission

