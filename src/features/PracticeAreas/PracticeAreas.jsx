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
import MiniHeading from "../../ui/MiniHeading";
import { practiceAreaData } from "../../data/PracticeAreaData";
import { FaArrowRightLong } from "react-icons/fa6";
import { color } from "framer-motion";


function PracticeAreas() {
  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={["2rem", "2rem", "6rem"]}
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
                    miniTitle="Our Practice Areas"
                    title="Our Specialisations"
                    miniTitleColor="brand.100"
                    titleColor="brand.100"
                />

                <SimpleGrid
                 w="full"
                 columns={[1, 1, 3]}
                 gap="20px"
                >
                    {practiceAreaData.map((area, i) => (
                        <VStack
                          key={i}
                          w="full"
                          h={["full", "full", "509px"]}
                          justify="end"
                          align="center"
                          bgImage={area.image}
                          bgSize="cover"
                          bgPos="center"
                          bgRepeat="no-repeat"
                          rounded="15px"
                          overflow="hidden"
                          data-aos="fade-up"
                          data-aos-delay={`${i * 200}`}
                        >
                            <VStack
                              w="full"
                              justify="start"
                              align="start"
                              gap="15px"
                              bgGradient="linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)"
                              backdropFilter="blur(10px)"
                              py="16px"
                              px="26px"
                            >
                                <Heading
                                  fontSize={["24px", "24px", "40px"]}
                                  fontWeight={700}
                                  color="white"
                                  lineHeight="100%"
                                  letterSpacing="0%"
                                >
                                    {area.title}
                                </Heading>

                                <Link to={`/practice-areas/${encodeURIComponent(area?.title?.toLowerCase())}`}>
                                    <HStack
                                      w="full"
                                      justify="start"
                                      align="center"
                                      gap="10px"
                                      color="white"
                                      _hover={{
                                        color: "whiteAlpha.800",
                                      }}
                                    >
                                        <Text
                                          fontSize="16px"
                                          fontFamily="openSans"
                                          fontWeight={500}
                                          textTransform="uppercase"
                                        >
                                            Read More
                                        </Text>

                                        <Icon
                                           as={FaArrowRightLong}
                                           w={6}
                                           h={6}
                                        />
                                    </HStack>
                                </Link>

                            </VStack>

                        </VStack>
                    ))}
                        

                </SimpleGrid>


            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default PracticeAreas