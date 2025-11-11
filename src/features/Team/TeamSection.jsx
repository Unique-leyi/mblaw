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
  textDecoration,
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import MiniHeading from "../../ui/MiniHeading";
import { teamData } from "../../data/TeamData";


function TeamSection() {
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
                    miniTitle="Our Team"
                    miniTitleColor="brand.100"
                    title="Meet Our Team"
                    titleColor="brand.100"
                    btnText="See More"
                    isReverse={false}
                    url="/team"
                />


                <SimpleGrid
                  w="full"
                  columns={[1, 1, 3]}
                  gap="20px"
                >
                    {teamData?.slice(0,3)?.map((member, i) => (
                        <VStack
                            key={i}
                            w="full"
                            h={["full", "full", "571px"]}
                            justify="center"
                            align="center"
                            border="1px solid"
                            borderColor="gray.200"
                            overflow="hidden"
                            roundedTop="15px"
                        >
                            <VStack
                              w="full"
                              h={["full", "full", "412px"]}
                              justify="center"
                              align="center"
                            >
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  w="full"
                                  h="full"
                                  objectFit="cover"
                                />

                            </VStack>

                            <VStack
                              w="full"
                              justify="start"
                              align="start"
                              gap="10px"
                              p="20px"
                            >
                               <Heading
                                 fontSize={["28px", "28px", "35px"]}
                                 fontWeight={700}
                                 color="brand.100"
                                 lineHeight="100%"
                               >
                                  {member.name}
                               </Heading>

                               <Text
                                 fontSize={["18px", "18px", "20px"]}
                                 fontWeight={300}
                                 color="brand.200"
                                 lineHeight="100%"
                               >
                                 {member.type}
                               </Text>

                               <Link to={`/team/team-detail/${encodeURIComponent(member?.name?.toLowerCase())}`}>
                                  <Button
                                    variant="link"
                                    color="brand.100"
                                    mt="15px"
                                    textTransform="uppercase"
                                    textDecoration="underline"
                                    _hover={{
                                        textDecoration:"none"
                                    }}
                                  >
                                      See profile
                                  </Button>
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

export default TeamSection