import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
  Skeleton,
  Stack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Bell, Check, Trash2 } from "lucide-react";
import MobileNav from "./MobileNav";
import { redirectToLogin } from "../../util/helper";
import { ArrowDownIcon, MessageQuestionIcon, NotificationIcon, UserIcon } from "../icons";
import { useState } from "react";
import { useNotifications } from "../../features/Notifications/useGetNotifications"
import { useNavigate } from "react-router-dom";



function DashboardNavbar() {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();

  // Use notifications hook to fetch 5 latest unread notifications
  const {
    isLoadingNotifications,
    notifications,
    metricsData,
    notificationsError,
    markAsRead,
    isMarkingRead,
    deleteNotification,
    isDeleting,
  } = useNotifications({ status: "unread", limit: 5, sort: "desc" });

  // Helper function to map notification types to UI properties (reused from Notifications component)
  const getNotificationProps = (type, isRead) => {
    switch (type) {
      case "service_request":
      case "service_accepted":
      case "service_session":
      case "session_reminder":
        return { icon: Bell, iconColor: isRead ? "gray.500" : "purple.500", bgColor: isRead ? "white" : "purple.50", borderColor: isRead ? "gray.200" : "purple.200" };
      case "service_completed":
      case "service_session_completed":
      case "onboarding_completed":
      case "achievement_unlocked":
        return { icon: Check, iconColor: isRead ? "gray.500" : "green.500", bgColor: isRead ? "white" : "green.50", borderColor: isRead ? "gray.200" : "green.200" };
      case "service_declined":
      case "service_session_cancelled":
      case "payment_reminder":
        return { icon: MessageQuestionIcon, iconColor: isRead ? "gray.500" : "orange.500", bgColor: isRead ? "white" : "orange.50", borderColor: isRead ? "gray.200" : "orange.200" };
      default:
        return { icon: NotificationIcon, iconColor: isRead ? "gray.500" : "blue.500", bgColor: isRead ? "white" : "blue.50", borderColor: isRead ? "gray.200" : "blue.200" };
    }
  };

  const logout = () => {
    redirectToLogin();
  };

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
        bgColor="white"
      >
        <HStack w="full" justify="start" align="center" gap="30px">
          {!isDesktop && (
            <VStack
              w="40px"
              h="40px"
              justify="center"
              align="center"
              bgColor="brand.100"
              color="white"
              rounded="10px"
              cursor="pointer"
            >
              <Icon as={RxHamburgerMenu} w={6} h={6} onClick={onOpen} />
            </VStack>
          )}
        </HStack>

        {isDesktop ? (
          <>
            <Flex justify="end" align="end" gap="15px" w="full">
              <Flex cursor="pointer" align="center" gap="24px">
                <Popover trigger="click" placement="bottom-end" autoFocus={false}>
                  <PopoverTrigger>
                    <Box position="relative">
                      <Icon as={Bell} fontSize="32px" color="gray.600" />
                      {metricsData?.unreadCount > 0 && (
                        <Badge
                          position="absolute"
                          top="-5px"
                          right="-5px"
                          bgColor="red.500"
                          color="white"
                          borderRadius="full"
                          fontSize="10px"
                          px="6px"
                          py="2px"
                        >
                          {metricsData.unreadCount}
                        </Badge>
                      )}
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent
                    border="1px"
                    borderColor="grey.200"
                    borderRadius="12px"
                    overflow="hidden"
                    boxShadow="0px 0px 32px 4px #0000000D"
                    bgColor="white"
                    w="444px"
                  >
                    <Stack 
                      pt="20px" 
                      px="20px"
                      pb="20px" 
                      gap="24px"
                      h="600px"
                      overflowY="auto"
                    >
                      <HStack align="center" justify="space-between">
                        <Text fontSize={20} fontFamily="heading" lineHeight="120%" color="grey.900" fontWeight={600}>
                          Notifications
                        </Text>
                      </HStack>
                      <VStack gap="12px" align="stretch">
                        {isLoadingNotifications ? (
                          <VStack gap="12px">
                            {[...Array(5)].map((_, index) => (
                              <Skeleton key={index} height="60px" width="100%" />
                            ))}
                          </VStack>
                        ) : notificationsError ? (
                          <Text fontSize="14px" color="red.500" textAlign="center">
                            Error: {notificationsError.data?.message || "Failed to load notifications"}
                          </Text>
                        ) : notifications.length === 0 ? (
                          <Text fontSize="14px" color="grey.500" textAlign="center">
                            No unread notifications
                          </Text>
                        ) : (
                          notifications.map((notification) => {
                            const { icon, iconColor, bgColor, borderColor } = getNotificationProps(notification.type, notification.isRead);
                            return (
                              <Box
                                key={notification._id}
                                p="12px"
                                rounded="8px"
                                border="1px solid"
                                borderColor={borderColor}
                                bgColor={bgColor}
                              >
                                <HStack spacing="12px" align="start">
                                  <Box
                                    w="24px"
                                    h="24px"
                                    rounded="full"
                                    bg={notification.isRead ? "gray.100" : "white"}
                                    border="2px solid"
                                    borderColor={borderColor}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexShrink={0}
                                  >
                                    <Icon as={icon} boxSize="14px" color={iconColor} />
                                  </Box>
                                  <VStack align="start" spacing="4px" flex="1">
                                    <HStack justify="space-between" w="full">
                                      <Text
                                        fontSize="14px"
                                        fontWeight={600}
                                        color={notification.isRead ? "gray.600" : "grey.700"}
                                        lineHeight="1.2"
                                        noOfLines={1}
                                      >
                                        {notification.title}
                                      </Text>
                                      <Text fontSize="12px" color="gray.500">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                      </Text>
                                    </HStack>
                                    <Text
                                      fontSize="13px"
                                      color={notification.isRead ? "gray.500" : "grey.500"}
                                      lineHeight="1.4"
                                      noOfLines={2}
                                    >
                                      {notification.message}
                                    </Text>
                                    <HStack spacing="8px" mt="4px">
                                      {!notification.isRead && (
                                        <Button
                                          variant="ghost"
                                          size="xs"
                                          leftIcon={<Check size={12} />}
                                          onClick={() => markAsRead(notification._id)}
                                          color="purple.600"
                                          _hover={{ bg: "purple.50" }}
                                          isLoading={isMarkingRead}
                                        >
                                          Mark as Read
                                        </Button>
                                      )}
                                      <IconButton
                                        variant="ghost"
                                        size="xs"
                                        icon={<Trash2 size={12} />}
                                        onClick={() => deleteNotification(notification._id)}
                                        color="red.500"
                                        _hover={{ bg: "red.50" }}
                                        aria-label="Delete notification"
                                        isLoading={isDeleting}
                                      />
                                    </HStack>
                                  </VStack>
                                </HStack>
                              </Box>
                            );
                          })
                        )}
                      </VStack>
                    </Stack>
                  </PopoverContent>
                </Popover>
                <Popover trigger="click" placement="bottom-end" autoFocus={false}>
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <HStack w="full" justify="space-between" align="center" gap="12px">
                          <Avatar
                            name="Dan Abrahmov"
                            src="https://res.cloudinary.com/doqvfemo3/image/upload/f_auto,q_auto/v1/Pafet/use_uhax7v"
                            w="40px"
                            h="40px"
                            rounded="full"
                            bgColor="brand.1000"
                          />
                          <VStack justify="center" align="center">
                            <Icon as={ArrowDownIcon} fontSize="20px" color="brand.1300" />
                          </VStack>
                        </HStack>
                      </PopoverTrigger>
                      <PopoverContent
                        border="1px"
                        borderColor="grey.200"
                        borderRadius="12px"
                        overflow="hidden"
                        boxShadow="0px 0px 32px 4px #0000000D"
                        w="299px"
                        bgColor="white"
                      >
                        <Stack p="20px" gap="16px" align="center">
                          <Icon as={UserIcon} fontSize={40} />
                          <Stack align="center" gap="8px">
                            <Text fontSize={16} fontWeight={600} lineHeight="160%" color="brand.100">
                              Adanini Patrick
                            </Text>
                            <Text fontSize={14} fontWeight={400} lineHeight="160%" color="grey.500">
                              patrick@gmail.com
                            </Text>
                          </Stack>
                          <Button
                            w="full"
                            bgColor="white"
                            border="1px"
                            borderColor="brand.800"
                            borderRadius="123px"
                            py="10px"
                            fontFamily="heading"
                            fontSize={14}
                            fontWeight={400}
                            color="brand.100"
                            lineHeight="160px"
                            _hover={{
                              color: "brand.100",
                              bgColor: "white",
                            }}
                            onClick={() => {
                              navigate("/dashboard/profile");
                              onClose();
                            }}
                          >
                            View Profile
                          </Button>
                          <Button
                            w="full"
                            bgColor="red.600"
                            borderRadius="123px"
                            py="10px"
                            fontFamily="heading"
                            fontSize={14}
                            fontWeight={400}
                            color="white"
                            lineHeight="160px"
                            _hover={{
                              color: "white",
                              bgColor: "red.600",
                            }}
                            onClick={() => {
                              logout();
                              onClose();
                            }}
                          >
                            Logout
                          </Button>
                        </Stack>
                      </PopoverContent>
                    </>
                  )}
                </Popover>
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Flex align="center" gap="15px" w="fit-content">
              <Popover trigger="hover" placement="bottom-end">
                <PopoverTrigger>
                  <Flex cursor="pointer" align="center" gap="10px">
                    <Icon as={MessageQuestionIcon} color="board.400" fontSize="32px" />
                    <Box position="relative">
                      <Icon as={NotificationIcon} fontSize="32px" />
                      {metricsData?.unreadCount > 0 && (
                        <Badge
                          position="absolute"
                          top="-5px"
                          right="-5px"
                          bgColor="red.500"
                          color="white"
                          borderRadius="full"
                          fontSize="10px"
                          px="6px"
                          py="2px"
                        >
                          {metricsData.unreadCount}
                        </Badge>
                      )}
                    </Box>
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://res.cloudinary.com/doqvfemo3/image/upload/f_auto,q_auto/v1/Pafet/use_uhax7v"
                      w="40px"
                      h="40px"
                      rounded="full"
                      bgColor="brand.1000"
                    />
                  </Flex>
                </PopoverTrigger>
                <PopoverContent
                  border="1px"
                  borderColor="grey.200"
                  borderRadius="12px"
                  overflow="hidden"
                  boxShadow="0px 0px 32px 4px #0000000D"
                  bgColor="white"
                  w="300px"
                >
                  <Stack pt="20px" px="20px" pb="20px" gap="24px">
                    <HStack align="center" justify="space-between">
                      <Text fontSize={20} fontFamily="heading" lineHeight="120%" color="grey.900" fontWeight={600}>
                        Notifications
                      </Text>
                    </HStack>
                    <VStack gap="12px" align="stretch">
                      {isLoadingNotifications ? (
                        <VStack gap="12px">
                          {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} height="60px" width="100%" />
                          ))}
                        </VStack>
                      ) : notificationsError ? (
                        <Text fontSize="14px" color="red.500" textAlign="center">
                          Error: {notificationsError.data?.message || "Failed to load notifications"}
                        </Text>
                      ) : notifications.length === 0 ? (
                        <Text fontSize="14px" color="grey.500" textAlign="center">
                          No unread notifications
                        </Text>
                      ) : (
                        notifications.map((notification) => {
                          const { icon, iconColor, bgColor, borderColor } = getNotificationProps(notification.type, notification.isRead);
                          return (
                            <Box
                              key={notification._id}
                              p="12px"
                              rounded="8px"
                              border="1px solid"
                              borderColor={borderColor}
                              bgColor={bgColor}
                            >
                              <HStack spacing="12px" align="start">
                                <Box
                                  w="24px"
                                  h="24px"
                                  rounded="full"
                                  bg={notification.isRead ? "gray.100" : "white"}
                                  border="2px solid"
                                  borderColor={borderColor}
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  flexShrink={0}
                                >
                                  <Icon as={icon} boxSize="14px" color={iconColor} />
                                </Box>
                                <VStack align="start" spacing="4px" flex="1">
                                  <HStack justify="space-between" w="full">
                                    <Text
                                      fontSize="14px"
                                      fontWeight={600}
                                      color={notification.isRead ? "gray.600" : "grey.700"}
                                      lineHeight="1.2"
                                      noOfLines={1}
                                    >
                                      {notification.title}
                                    </Text>
                                    <Text fontSize="12px" color="gray.500">
                                      {new Date(notification.createdAt).toLocaleDateString()}
                                    </Text>
                                  </HStack>
                                  <Text
                                    fontSize="13px"
                                    color={notification.isRead ? "gray.500" : "grey.500"}
                                    lineHeight="1.4"
                                    noOfLines={2}
                                  >
                                    {notification.message}
                                  </Text>
                                  <HStack spacing="8px" mt="4px">
                                    {!notification.isRead && (
                                      <Button
                                        variant="ghost"
                                        size="xs"
                                        leftIcon={<Check size={12} />}
                                        onClick={() => markAsRead(notification._id)}
                                        color="purple.600"
                                        _hover={{ bg: "purple.50" }}
                                        isLoading={isMarkingRead}
                                      >
                                        Mark as Read
                                      </Button>
                                    )}
                                    <IconButton
                                      variant="ghost"
                                      size="xs"
                                      icon={<Trash2 size={12} />}
                                      onClick={() => deleteNotification(notification._id)}
                                      color="red.500"
                                      _hover={{ bg: "red.50" }}
                                      aria-label="Delete notification"
                                      isLoading={isDeleting}
                                    />
                                  </HStack>
                                </VStack>
                              </HStack>
                            </Box>
                          );
                        })
                      )}
                    </VStack>
                  </Stack>
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