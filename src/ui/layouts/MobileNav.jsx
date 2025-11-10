import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarData } from "../../data/SidebarData";
import { redirectToLogin } from "../../util/helper";
import LightLogo from "./LightLogo";
import RoleBasedDisplay from "../RoleBasedDisplay";

export default function MobileNav({ isOpen, onClose }) {
  const location = useLocation();
  const match = location.pathname.match(/\/dashboard\/([^/]+)/);
  const id = match ? match[1] : null;

  const logout = () => {
    redirectToLogin();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="brand.100" p="0">
        <DrawerCloseButton color="white" />
        <DrawerHeader>
          <VStack gap="40px" align="start">
            <LightLogo />
          </VStack>
        </DrawerHeader>

        <DrawerBody mt="20px" p="0">
          <VStack py="12px" align="left" w="full" gap="10px">
            {SidebarData.map((item, i) => (
              <RoleBasedDisplay key={i} roles={item.roles}>
                {item.children ? (
                  <Accordion allowToggle w="full">
                    <AccordionItem border="none">
                      <AccordionButton
                        _expanded={{ bg: "white", color: "brand.500" }}
                        px="16px"
                        py="14px"
                        rounded="2xl"
                        color="white"
                      >
                        <HStack gap="14px" w="full" justify="space-between">
                          <HStack gap="14px" color="white">
                            {item.icon}
                            <Text>{item.title}</Text>
                          </HStack>
                          <AccordionIcon />
                        </HStack>
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        {item.children.map((child, j) => (
                          <NavLink to={child.link} key={j} onClick={onClose}>
                            <Box
                              px="16px"
                              py="10px"
                              ml="32px"
                              rounded="2xl"
                              display="flex"
                              alignItems="center"
                              gap="10px"
                              boxShadow={
                                id === item.id ? "0px 2px 40px 0px #0000001A" : ""
                              }
                              _hover={{
                                bg: "alt.100",
                                color: "brand.100",
                                boxShadow: "0px 2px 40px 0px #0000001A",
                              }}
                              bg={location.pathname === child.link ? "alt.100" : ""}
                              color={
                                location.pathname === child.link ? "brand.100" : ""
                              }
                            >
                              {child.icon}
                              <Text>{child.title}</Text>
                            </Box>
                          </NavLink>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Box position="relative">
                    <NavLink
                      to={item.link}
                      onClick={item.title === "Logout" ? logout : onClose}
                    >
                      <HStack
                        w="full"
                        justify="space-between"
                        align="start"
                        gap="15px"
                        role="group"
                      >
                        <Box
                          position="relative"
                          h="55px"
                          _before={{
                            content: '" "',
                            w: id === item.id ? "9px" : 0,
                            h: "inherit",
                            position: "absolute",
                            top: 0,
                            left: "-4px",
                            bgColor: "white",
                            zIndex: 1,
                            roundedRight: "6px",
                            roundedLeft: "initial",
                          }}
                          _groupHover={{
                            _before: {
                              w: "9px",
                            },
                          }}
                        />
                        <Box
                          gap="10px"
                          py="15px"
                          px="20px"
                          w="full"
                          mb="10px"
                          bg={id === item.id ? "white" : ""}
                          color={id === item.id ? "brand.100" : "white"}
                          rounded={id === item.id ? "6px" : ""}
                          _groupHover={{
                            bg: "white",
                            color: "brand.100",
                            rounded: "6px",
                          }}
                        >
                          <HStack gap="10px" align="center">
                            {item.icon}
                            <Box
                              fontSize={16}
                              fontFamily="body"
                              fontWeight={400}
                              lineHeight="21px"
                              letterSpacing="0%"
                            >
                              {item.title}
                            </Box>
                          </HStack>
                        </Box>
                      </HStack>
                    </NavLink>
                  </Box>
                )}
              </RoleBasedDisplay>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}