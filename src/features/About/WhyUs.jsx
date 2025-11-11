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
import { whyUsData } from "../../data/WhyUsData";


function WhyUs() {
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

                <MiniHeading
                    miniTitle="Why us"
                    title="Why We’re Different"
                    titleColor="brand.100"
                />


                <SimpleGrid
                   w="full"
                   columns={[1, 1, 3]}
                   gap="40px"
                >
                    {whyUsData.map((item, i) => (
                        <VStack
                            key={i}
                            w="full"
                            h={["full", "full",  "300px"]}
                            bgColor="white"
                            color="brand.100"
                            justify="center"
                            align="start"
                            gap="10px"
                            rounded="5px"
                            py="23px"
                            px="15px"
                            role="group"
                            _hover={{
                                bgColor: "brand.100",
                                color: "white"
                            }}
                        >
                            <Text
                              fontSize={["20px", "20px", "25px"]}
                              fontWeight={500}
                              fontFamily="openSans"
                              lineHeight="100%"
                              letterSpacing="0%"
                            >
                                {item.number}
                            </Text>

                            <Heading
                              fontSize={["24px", "24px", "30px"]}
                              fontWeight={700}
                              lineHeight="100%"
                              letterSpacing="0%"
                            >
                                {item.title}
                            </Heading>

                            <Text
                              fontSize={["18px", "18px", "18px"]}
                              fontWeight={300}
                              fontFamily="openSans"
                              lineHeight="24px"
                              letterSpacing="0%"
                              color="brand.200"
                              _groupHover={{
                                color: "brand.400"
                              }}
                            >
                                {item.description}
                            </Text>



                        </VStack>
                    ))}

                </SimpleGrid>



            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default WhyUs