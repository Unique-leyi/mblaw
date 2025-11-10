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
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "./ContainerLayout";
import { contactDetails, NavbarData, socialsLinks } from "../../data/NavbarData";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoMenu } from "react-icons/io5";
import { Users } from "lucide-react";
import AppLogo from "./AppLogo";
import CtaButton from "../CtaButton";




function Navbar() {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const id = location.pathname.split("/")[1];
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <>
    {isDesktop ?
        <VStack
            w="full"
            justify="start"
            align="start"
            bgColor="rgba(255, 255, 255, 0.7)"
            borderBottom="1px solid"
            borderBottomColor="white"
            position="fixed"
            top={0}
            left={0}
            zIndex={9999999999}
            py="12px"
            sx={{
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
            }}
        >
            <ContainerLayout>    
                <HStack
                    w="full"
                    justify="space-between"
                    align="center"
                >
                    <Box w="fit-content">
                        <AppLogo/>
                    </Box>



                    <HStack
                        w="fit-content"
                        justify="end"
                        align="center"
                        gap="40px"
                    >
                        <HStack 
                            gap="24px" 
                            justify="center" 
                            align="center"
                            flex="1"
                        >
                            {NavbarData.map((item) => ((
                                    <NavLink key={item.id} to={item.path}>
                                        <Text
                                            fontSize={20}
                                            fontWeight={400}
                                            color={item.id === id ? "brand.100" : "brand.500"}
                                            lineHeight="100%"
                                            letterSpacing="0%"
                                            _hover={{ color: "brand.100" }}
                                        >
                                            {item.display}
                                        </Text>
                                    </NavLink>
                                )
                            ))}
                        </HStack>

                        <CtaButton
                            isLink={true}
                            btnText="Contact us"
                            isOutline={false}
                            url="/contact-us"
                        />
                    </HStack>    
                </HStack>
            </ContainerLayout>
        </VStack>

        :

        <>
            <HStack
                w="full"
                justify="space-between"
                align="center"
                p="15px"
                position="fixed"
                top={0}
                left={0}
                zIndex={999}
                bgColor="rgba(255, 255, 255, 0.7)"
                borderBottom="1px solid"
                borderBottomColor="white"
                sx={{
                    WebkitBackdropFilter: "blur(20px)",
                    backdropFilter: "blur(20px)",
                }}
            >
                    <Box w="fit-content">
                        <AppLogo/>
                    </Box>

                <VStack>
                    <Box
                        w="40px"
                        h="40px"
                        p="4px"
                        rounded="8px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        bg="brand.100"
                        cursor="pointer"
                    >
                        <Icon 
                            as={IoMenu} 
                            w={6}
                            h={6}
                            color="white" 
                            onClick={onOpen} 
                        />
                    </Box>
                </VStack>    
            </HStack>

        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody bgColor="white">
                        <VStack 
                            mt="40px" 
                            w="full" 
                            gap="25px" 
                            justify="start" 
                            align="start"
                        >
                            {NavbarData.map((item) => ((
                                <NavLink key={item.id} to={item.path}>
                                    <Text
                                        fontSize={[20, 20, 24]}
                                        fontWeight={400}
                                        color={item.id === id ? "brand.100" : "brand.500"}
                                        lineHeight="100%"
                                        letterSpacing="0%"
                                        _hover={{ color: "brand.100" }}
                                        onClick={onClose}
                                    >
                                        {item.display}
                                    </Text>
                                </NavLink>
                            )
                        ))}

                        <VStack
                          w="full"
                          justify="start"
                          align="start"
                        >

                            <CtaButton
                                isLink={true}
                                isFull={true}
                                btnText="Contact us"
                                isOutline={false}
                                url="/contact-us"
                                handleClick={onClose}
                            />
                        </VStack>

                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        
        </>
    }
    </>
  )
}

export default Navbar