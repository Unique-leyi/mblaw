import {
  Box,
  HStack,
  Image,
  ListItem,
  UnorderedList,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SidebarData } from "../../data/SidebarData";
import { redirectToLogin } from "../../util/helper";
import RoleBasedDisplay from "../RoleBasedDisplay";
import AppLogo from "./AppLogo";
import LogoutConfirmationModal from "../LogoutConfirmationModal";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  
  // Check for dashboard routes
  const dashboardMatch = location.pathname.match(/\/dashboard(?:\/([^/]+))?(?:\/([^/]+))?/);
  // Check for my-account routes
  const myAccountMatch = location.pathname.match(/\/my-account(?:\/([^/]+))?(?:\/([^/]+))?/);
  
  let id = null;
  if (dashboardMatch) {
    id = dashboardMatch[1] || "";
    // Handle nested routes like /dashboard/clients/create or /dashboard/clients/:id/edit
    if (id === "clients" && dashboardMatch[2]) {
      id = "clients"; // Keep id as "clients" for nested routes
    }
  } else if (myAccountMatch) {
    // Map my-account routes to sidebar IDs
    const pathSegment = myAccountMatch[1];
    if (!pathSegment) {
      id = "my-account-overview";
    } else if (pathSegment === "consultations") {
      id = "my-consultations";
    } else if (pathSegment === "appointments") {
      id = "my-appointments";
    } else if (pathSegment === "settings") {
      id = "my-settings";
    }
  }

  const handleLogout = () => {
    redirectToLogin();
  };

  return (
    <VStack
      w="25%"
      justify="space-between"
      align="right"
      bg="white"
      fontWeight="600"
      pt="30px"
      h="100vh"
      overflowY="auto"
      overflowX="hidden"
      position="sticky"
      top="0"
    >
      <VStack gap="20px" justify="center" align="center">
        <VStack gap="40px" justify="center" align="center">
          <AppLogo />
        </VStack>

        <UnorderedList
          m="4px"
          mt="20px"
          listStyleType="none"
          w="full"
          gap="20px"
          p="0"
        >
          {SidebarData.map((item, i) => (
            <RoleBasedDisplay  key={i} roles={item.roles}>
              <Box position="relative" my="12px">
                <NavLink 
                  to={item.link}
                  onClick={(e) => {
                    if (item?.title === "Logout") {
                      e.preventDefault(); 
                      onOpen();
                    }
                  }}
                >
                  <HStack
                    w="full"
                    justify="space-between"
                    align="start"
                    gap="12px"
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
                        bgColor: "brand.100",
                        zIndex: 1,
                        roundedRight: "6px",
                      }}
                      _groupHover={{
                        _before: {
                          w: "9px",
                        },
                      }}
                    />

                    <ListItem
                      gap="10px"
                      py="15px"
                      px="15px"
                      w="full"
                      mb="4px"
                      bg={id === item.id ? "brand.100" : "transparent"}
                      color={id === item.id ? "white" : "black"}
                      rounded={id === item.id ? "6px" : ""}
                      _groupHover={{
                        bg: "brand.100",
                        color: "white",
                        rounded: "6px",
                      }}
                    >
                      <HStack gap="10px" align="center" maxW="100%">
                        {item.icon}
                        <Text
                          fontSize="16px"
                          fontWeight="400"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {item.title}
                        </Text>
                      </HStack>
                    </ListItem>
                  </HStack>
                </NavLink>
              </Box>
            </RoleBasedDisplay>
          ))}
        </UnorderedList>
      </VStack>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleLogout}
      />
    </VStack>
  );
}

export default Sidebar;
