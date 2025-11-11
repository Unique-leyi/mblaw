import React, { useEffect, useRef, useState } from "react";
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
  textDecoration,
  Avatar,
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import MiniHeading from "../../ui/MiniHeading";
import { blogData } from "../../data/BlogData";
import { GoClock } from "react-icons/go";


function BlogSection() {

  return (
    <Stack
        w="full"
        justify="start"
        align="start"
        py={["4rem", "4rem", "6rem"]}
        bgColor="white"
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
              gap={["20px", "20px", "40px"]}
            >

                <MiniHeading
                    miniTitle="Blog"
                    title="News & Enterprise"
                    miniTitleColor="brand.100"
                    titleColor="brand.100"
                    btnText="See More"
                    url="/blog"
                />


                <SimpleGrid
                  w="full"
                  columns={[1, 1, 3]}
                  gap="20px"
                >
                    {blogData.slice(0, 3).map((post, i) => (
                        <VStack
                          key={i}
                          w="full"
                          h={["full", "full", "538.84px"]}
                          justify="center"
                          align="center"
                          position="relative"
                          overflow="hidden"
                          gap="30px"
                        >
                            <VStack
                              w="full"
                              h={["full", "full", "335.79px"]}
                              justify="center"
                              align="center"
                              roundedTop="20px"
                              overflow="hidden"
                            >
                                <Image
                                    w="full"
                                    h="full"
                                    src={post.image}
                                    alt={`${post.title}-image`}
                                    objectFit="cover"
                                />

                            </VStack>

                            <Text
                              fontSize="20px"
                              fontWeight={400}
                              color="white"
                              py="8.65px"
                              px="10.81px"
                              bgColor="#FFFFFF33"
                              position="absolute"
                              left="4%"
                              top="2%"
                              backdropFilter="blur(12.97px)"
                              zIndex={3}
                            >
                                {post.type}
                            </Text>

                            <VStack
                               w="full"
                               justify="start"
                               align="start"
                               gap="20px"
                            >
                                <Heading
                                   fontSize={["20px", "20px", "28px"]}
                                   fontWeight={700}
                                   lineHeight="100%"
                                   letterSpacing="0%"
                                   color="brand.600"
                                >
                                    {post.title}
                                </Heading>

                                <Text
                                  fontSize="18px"
                                  fontWeight={400}
                                  lineHeight="24px"
                                  letterSpacing="0%"
                                >
                                    {post.content}
                                </Text>

                                <HStack
                                    w="full"
                                    justify="start"
                                    align="center"
                                    gap="20px"
                                >
                                    <Text
                                        fontSize="18px"
                                        fontWeight={400}
                                        lineHeight="24px"
                                        letterSpacing="0%"
                                        color="#121416CF"
                                    >
                                        {post.dateOfPost} 

                                    </Text>

                                        <Box
                                          as="span"
                                          mx="2px"
                                          w="8%"
                                          h="1px"
                                          bgColor="gray.400"
                                        />

                                    <HStack>
                                        <Icon as={GoClock} color="#121416CF"/>
                                        <Text
                                            fontSize="18px"
                                            fontWeight={400}
                                            lineHeight="24px"
                                            letterSpacing="0%"
                                            color="#121416CF"
                                        >
                                            {post.time}
                                        </Text>
                                    </HStack>

                                </HStack>


                            </VStack>

                        </VStack>
                    ))}

                </SimpleGrid>


            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default BlogSection