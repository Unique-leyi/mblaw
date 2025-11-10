import {
  Box,
  HStack,
  Image,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { SidebarData } from "../../data/SidebarData";
import LightLogo from "./LightLogo";
import RoleBasedDisplay from "../RoleBasedDisplay";
import { redirectToLogin } from "../../util/helper";


function Sidebar() {


  const [option, setOption] = useState(false);
  const location = useLocation();
  const match = location.pathname.match(/\/dashboard(?:\/([^/]+))?/);
  const id = match ? match[1] || "" : null;

  const getNavItemStyle = (itemId) => {
    if (id === "forms") {
      return {};
    }

    if (itemId === id) {
      return {
        bg: "#F5F5F9",
        color: "brand.100",
        roundedTopLeft: "full",
        roundedBottomLeft: "full",
        className: "curve",
      };
    }
    return {};
  };

  const logout = () => {
    redirectToLogin()
  }

  return (
    <VStack
      w="28%"
      justify="space-between"
      align="right"
      bg="brand.100"
      color="white"
      fontWeight="600"
      pl="20px"
      py="50px"
      h="100vh"
      overflowY="auto"
      minH="100vh"
      position="sticky"
      top="0"
    >
      <VStack gap="50px" w="full">
        <HStack w="full" align="left">
          <LightLogo />
        </HStack>

        <UnorderedList m="0" listStyleType="none" w="full">
          {SidebarData.map((item, i) => (
            <RoleBasedDisplay key={i} roles={item.roles}>
              <Box position="relative">
                <NavLink to={item.id === "forms" ? null : item.link} onClick={item?.title === "Logout" && logout}>
                  <ListItem
                    onClick={() => {
                      item.id === "forms"
                        ? setOption((prev) => !prev)
                        : setOption(false);
                    }}
                    gap="40px"
                    py="20px"
                    px="32px"
                    roundedTopLeft="full"
                    roundedBottomLeft="full"
                    w="full"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    {...getNavItemStyle(item.id)}
                  >
                    <HStack gap="20px">
                      {item.icon}
                      <Box>{item.title}</Box>
                    </HStack>
                    {item?.sub?.length > 0 && <ChevronDownIcon />}
                  </ListItem>
                  {option && item?.sub?.length > 0 && (
                    <UnorderedList m="0" listStyleType="none" w="full">
                      {item.sub.map((subs, i) => (
                        <Box key={i} bg="#F5F5F9">
                          <NavLink to={subs.link}>
                            <ListItem
                              gap="40px"
                              py="16px"
                              px="32px"
                              w="full"
                              color="brand.100"
                              borderRightWidth={
                                location.pathname === subs.link && "4px"
                              }
                              borderRightColor={
                                location.pathname === subs.link && "brand.200"
                              }
                            >
                              {subs.title}
                            </ListItem>
                          </NavLink>
                        </Box>
                      ))}
                    </UnorderedList>
                  )}
                </NavLink>
              </Box>
            </RoleBasedDisplay>
          ))}
        </UnorderedList>
      </VStack>
    </VStack>
  );
}

export default Sidebar;