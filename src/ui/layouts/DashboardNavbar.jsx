import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNav from "./MobileNav";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { LogoutIcon } from "../icons";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "../../util/helper";
import { useUser } from "../../features/Auth/useUser";


function DashboardNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const { user, isLoading } = useUser();
  
  // Get user's display name
  const displayName = user?.firstName || user?.fullName || user?.name || "User";


  const logout = () => {
    redirectToLogin();
  }

  return (
    <>
      <HStack
        justify="space-between"
        align="center"
        px={["16px", "8", "8"]}
        py="20px"
        w="full"
        m="0"
        position="sticky"
        top="0"
        zIndex={10}
        bgColor={["white", "white", "brand.1500"]}
      >
        <HStack w="full" justify="start" align="center" gap="30px">
          {!isDesktop && (
            <Icon
              as={RxHamburgerMenu}
              w={6}
              h={6}
              color="black"
              cursor="pointer"
              _hover={{
                color: "orange.600",
              }}
              onClick={onOpen}
            />
          )}

          <Text 
            fontSize={[20, 20, 24]} 
            fontWeight={300} 
            letterSpacing="0%"
          >
            Welcome, {isLoading ? <SkeletonText w="200px" bgColor="gray.200"/> : <strong>{displayName}</strong>}
          </Text>
        </HStack>

        {isDesktop ? (
          <>
            <Flex justify="end" align="end" gap="15px" w="full">
              <Popover trigger="hover" placement="bottom-end">
                <PopoverTrigger>
                  <Flex cursor="pointer" align="center" gap="20px">
                    {/* <Icon as={NotifyIcon} color="board.400" w={5} h={5} /> */}

                    <HStack
                      w="full"
                      justify="space-between"
                      align="center"
                      gap="16px"
                    >
                      <Avatar
                        name={displayName}
                        src={user?.image || user?.avatar || undefined}
                        size="sm"
                        rounded="full"
                        bgColor="brand.1000"
                      />
                    </HStack>
                  </Flex>
                </PopoverTrigger>
                <PopoverContent
                  border="none"
                  rounded="sm"
                  overflow="hidden"
                  boxShadow="lg"
                  w="204px"
                >
                  <Box
                    position="relative"
                    cursor="pointer"
                    // onClick={logout}
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
                        h="42px"
                        _before={{
                          content: '" "',
                          w: 0,
                          h: "inherit",
                          position: "absolute",
                          top: 0,
                          left: "-4px",
                          bgColor: "actions.error",
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
                        py="10px"
                        px="15px"
                        w="full"
                        mb="4px"
                        bg="white"
                        color="alt.900"
                        rounded=""
                        _groupHover={{
                          bg: "actions.error",
                          color: "white",
                          rounded: "6px",
                        }}
                      >
                        <HStack gap="10px" align="center">
                          <LogoutIcon w={5} h={5} />
                          <Box
                            fontSize={14}
                            fontFamily="body"
                            fontWeight={500}
                            lineHeight="17.07px"
                            letterSpacing="0%"
                          >
                            Logout
                          </Box>
                        </HStack>
                      </Box>
                    </HStack>
                  </Box>
                </PopoverContent>
              </Popover>
            </Flex>
          </>
        ) : (
          <>
            <Flex align="center" gap="15px" w="fit-content">
              <Popover trigger="hover" placement="bottom-end">
                <PopoverTrigger>
                  <Flex cursor="pointer" align="center" gap="10px">
                    <Avatar
                      name={displayName}
                      src={user?.image || user?.avatar || undefined}
                      size="sm"
                      rounded="8px"
                    />
                  </Flex>
                </PopoverTrigger>
                <PopoverContent
                  border="none"
                  rounded="sm"
                  overflow="hidden"
                  boxShadow="lg"
                  w="204px"
                >
                  <Box
                    position="relative"
                    cursor="pointer"
                    //   onClick={logout}
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
                        h="42px"
                        _before={{
                          content: '" "',
                          w: 0,
                          h: "inherit",
                          position: "absolute",
                          top: 0,
                          left: "-4px",
                          bgColor: "actions.error",
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
                        py="10px"
                        px="15px"
                        w="full"
                        mb="4px"
                        bg="white"
                        color="alt.900"
                        rounded=""
                        _groupHover={{
                          bg: "actions.error",
                          color: "white",
                          rounded: "6px",
                        }}
                      >
                        <HStack gap="10px" align="center">
                          <LogoutIcon w={5} h={5} />
                          <Box
                            fontSize={14}
                            fontFamily="body"
                            fontWeight={500}
                            lineHeight="17.07px"
                            letterSpacing="0%"
                          >
                            Logout
                          </Box>
                        </HStack>
                      </Box>
                    </HStack>
                  </Box>
                </PopoverContent>
              </Popover>
            </Flex>
          </>
        )}

        {isOpen && <MobileNav isOpen={isOpen} onClose={onClose} />}
      </HStack>
    </>
  );
}

export default DashboardNavbar;
