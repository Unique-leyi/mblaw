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
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import { testimonialsData } from "../../data/TestimonialData";
import { BiSolidQuoteLeft } from "react-icons/bi";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";


function Testimonials() {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

  return (
    <Stack
        w="full"
        justify="start"
        align="start"
        pt={["3rem", "3rem", "6rem"]}
        pb={["3rem", "3rem", "8rem"]}
        position="relative"
        bgColor="brand.500"
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
                    miniTitle="Testimonials"
                    title="Trusted by Clients, Proven Through Results"
                    miniTitleColor="brand.100"
                    titleColor="brand.100"
                />


                <VStack
                    w="full"
                    justify="center"
                    align="center"
                    py="2rem"
                >
                    <Swiper
                        style={{ 
                            width: "100%", 
                            height: "auto",
                            padding: "20px" 
                        }}
                        
                        slidesPerView={3}
                        centeredSlides={true}
                        speed={800}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={20}
                        pagination={false}
                        initialSlide={Math.floor(testimonialsData.length / 2)}
                        modules={[Autoplay, Parallax, Pagination, Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.update();
                        }}
                        breakpoints={{
                            // mobile
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            // tablet
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            // desktop
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            },
                        }}
                    >
                        {testimonialsData.map((testimony, i) => (
                            <SwiperSlide key={i}>
                                <VStack
                                  w="full"
                                  justify="start"
                                  align="start"
                                  h="full"
                                  minH={["full", "full", "350px"]}
                                  bgColor="white"
                                  rounded="10px"
                                  gap="10px"
                                >
                                    <Icon
                                      as={BiSolidQuoteLeft}
                                      color="gray.200"
                                      fontSize="60px"
                                      mt="-30px"
                                      zIndex={2}
                                    />

                                    <Text
                                      fontSize={["18px", "18px", "20px"]}
                                      fontWeight={300}
                                      color="brand.100"
                                      p="15px"
                                    >
                                        {testimony.comment}
                                    </Text>

                                    <HStack
                                      w="full"
                                      justify="start"
                                      align="center"
                                      gap="20px"
                                      p="15px"
                                    >
                                        <Avatar
                                         size="md"
                                         src={testimony.image}
                                        />

                                        <VStack
                                          w="full"
                                          justify="start"
                                          align="start"
                                          gap="4px"
                                        >
                                            <Text
                                              fontSize="20px"
                                              fontWeight={500}
                                              lineHeight="100%"
                                              letterSpacing="0%"
                                              color="brand.100"
                                            >
                                                {testimony.name}
                                            </Text>

                                            <Text
                                              fontSize="16px"
                                              fontWeight={300}
                                              lineHeight="100%"
                                              letterSpacing="0%"
                                              color="gray.500"
                                            >
                                                {testimony.occupation}
                                            </Text>

                                        </VStack>


                                    </HStack>

                                </VStack>
                            </SwiperSlide>
                        ))}

                    </Swiper>


                    {/*  navigation buttons */}
                    <Flex 
                        w="full"
                        justify="start" 
                        align="center"
                        position="absolute"
                        bottom={["10%", "10%", "10%"]} 
                        left="2%"  
                        // transform="translateY(50%)"
                        px={[2, 4, 6]} 
                        zIndex={10} 
                        gap="30px"
                    >
                        <IconButton
                            ref={prevRef}
                            icon={<Icon as={IoIosArrowRoundBack} w={8} h={8} color="brand.100" />}
                            border="1px solid"
                            borderColor="brand.100"
                            rounded="full"
                            py="30px"
                            px="15px"
                            bgColor="transparent"
                            aria-label="Previous"
                            _hover={{
                                bgColor: "transparent",
                            }}
                        />
                        <IconButton
                            ref={nextRef}
                            icon={<Icon as={IoIosArrowRoundForward} w={8} h={8} color="brand.100"/>}
                            border="1px solid"
                            borderColor="brand.100"
                            rounded="full"
                            py="30px"
                            px="15px"
                            bgColor="transparent"
                            aria-label="Next"
                            _hover={{
                                bgColor: "transparent",
                            }}
                        />
                    </Flex>

                </VStack>



            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default Testimonials