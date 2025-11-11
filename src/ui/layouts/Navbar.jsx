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
import { RiAccountCircleFill } from "react-icons/ri";
import CtaButton from "../CtaButton";




function Navbar({ isWhite = false }) {


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
            position="fixed"
            bgColor={isWhite ? "transparent" : "#f9fafb"}
            top={0}
            left={0}
            zIndex={9999999999}
            py="12px"
        >
            <ContainerLayout>    
                <HStack
                    w="full"
                    justify="space-between"
                    align="center"
                >
                    <Box w="fit-content">
                        <AppLogo isWhite={isWhite}/>
                    </Box>



                    <HStack
                        w="fit-content"
                        justify="end"
                        align="center"
                        gap="40px"
                    >
                        <HStack 
                            gap="40px" 
                            justify="center" 
                            align="center"
                            flex="1"
                        >
                            {NavbarData.map((item) => ((
                                    <NavLink key={item.id} to={item.path}>
                                        <Text
                                            fontSize={20}
                                            fontWeight={300}
                                            color={isWhite ? "white" : (item.id === id ? "brand.100" : "brand.200")}
                                            lineHeight="24px"
                                            letterSpacing="0%"
                                            _hover={{ color: isWhite ? "white" : "brand.100" }}
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
                            isOutline={true}
                            url="/contact-us"
                            borderColor={isWhite ? "white" : undefined}
                            color={isWhite ? "white" : undefined}
                        />

                        <Link to="/login">
                            <IconButton
                                aria-label="Search database"
                                color={isWhite ? "white" : "brand.100"}
                                bgColor="transparent"
                                icon={<Icon as={RiAccountCircleFill} w={12} h={12} />}
                                _hover={{ bgColor: "transparent" }}
                            />
                        </Link>

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
                bgColor="#f9fafb"
                top={0}
                left={0}
                zIndex={999}
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
                                        lineHeight="24px"
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
                          gap="20px"
                          mt="20px"
                        >

                            <CtaButton
                                isLink={true}
                                isFull={true}
                                btnText="Contact us"
                                isOutline={true}
                                url="/contact-us"
                                handleClick={onClose}
                            />

                            <Link 
                                to="/login" 
                                onClick={onClose} 
                                style={{  width: "100%" }}
                            >

                               <HStack
                                 w="full"
                                 justify="center"
                                 align="center"
                                 gap="20px"
                                 border="1px solid"
                                 borderColor="brand.100"
                                 py="15px"
                                 px="25px"
                                 rounded="5px"
                               >
                                    <IconButton
                                        aria-label="Search database"
                                        color="brand.100"
                                        bgColor="transparent"
                                        icon={<Icon as={RiAccountCircleFill} w={12} h={12} />}
                                        _hover={{ bgColor: "transparent" }}
                                    />

                                    <Text
                                        fontSize={[20, 20, 24]}
                                        fontWeight={400}
                                        color="brand.100"
                                        lineHeight="24px"
                                        letterSpacing="0%"
                                        _hover={{ color: "brand.100" }}
                                    >
                                        Account
                                    </Text>
                               </HStack>
                            </Link>
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