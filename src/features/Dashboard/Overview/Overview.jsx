import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Spinner,
  Button,
  Badge,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { 
  FiUsers, 
  FiFileText, 
  FiCalendar, 
  FiBook, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import { useDashboardStats } from "./useDashboardStats";
import { useUser } from "../../Auth/useUser";
import CtaButton from "../../../ui/CtaButton";

function Overview() {
  const navigate = useNavigate();
  const { role } = useUser();
  const { isLoading, stats } = useDashboardStats();
  
  // Prevent users from accessing admin overview
  if (role === "user") {
    return null;
  }

  if (isLoading) {
    return (
      <VStack w="full" align="center" justify="center" py="100px">
        <Spinner size="xl" color="brand.100" thickness="4px" />
        <Text color="brand.200" fontSize="16px" mt="20px">
          Loading dashboard statistics...
        </Text>
      </VStack>
    );
  }

  if (!stats) {
    return (
      <VStack w="full" align="center" justify="center" py="100px">
        <Text color="brand.200" fontSize="16px">
          Unable to load dashboard statistics
        </Text>
      </VStack>
    );
  }

  const { metrics, recentActivities } = stats;

  // Prepare metric cards
  const metricCards = [
    {
      title: "Total Consultations",
      value: metrics.consultations?.total || 0,
      icon: FiFileText,
      color: "brand.100",
      bgGradient: "linear(to-br, brand.100, brand.600)",
    },
    {
      title: "Pending Consultations",
      value: metrics.consultations?.pending || 0,
      icon: FiClock,
      color: "#F59E0B",
      bgGradient: "linear(to-br, #F59E0B, #D97706)",
    },
    {
      title: "Scheduled Consultations",
      value: metrics.consultations?.scheduled || 0,
      icon: FiCalendar,
      color: "#3B82F6",
      bgGradient: "linear(to-br, #3B82F6, #2563EB)",
    },
    {
      title: "Completed Consultations",
      value: metrics.consultations?.completed || 0,
      icon: FiCheckCircle,
      color: "#10B981",
      bgGradient: "linear(to-br, #10B981, #059669)",
    },
    {
      title: "Total Appointments",
      value: metrics.appointments?.total || 0,
      icon: FiCalendar,
      color: "brand.100",
      bgGradient: "linear(to-br, brand.100, brand.600)",
    },
    {
      title: "Scheduled Appointments",
      value: metrics.appointments?.scheduled || 0,
      icon: FiClock,
      color: "#3B82F6",
      bgGradient: "linear(to-br, #3B82F6, #2563EB)",
    },
    {
      title: "Published Blog Posts",
      value: metrics.blogPosts?.published || 0,
      icon: FiBook,
      color: "#10B981",
      bgGradient: "linear(to-br, #10B981, #059669)",
    },
    ...(metrics.clients ? [
      {
        title: "Total Clients",
        value: metrics.clients?.total || 0,
        icon: FiUsers,
        color: "brand.100",
        bgGradient: "linear(to-br, brand.100, brand.600)",
      },
    ] : []),
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "yellow";
      case "scheduled":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      case "published":
        return "green";
      case "draft":
        return "gray";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString;
  };

  return (
    <VStack w="full" align="start" gap="30px">
      {/* Header */}
      <VStack w="full" align="start" gap="8px">
        <Heading
          fontSize={["28px", "32px", "36px"]}
          fontWeight={700}
          color="brand.100"
          lineHeight="40px"
        >
          Dashboard Overview
        </Heading>
        <Text fontSize="16px" color="brand.200" fontWeight={400}>
          Welcome back! Here's what's happening with your law firm today.
        </Text>
      </VStack>

      {/* Metrics Cards - 3 Columns */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px" w="full">
        {metricCards.map((metric, index) => (
          <Box
            key={index}
            bg="white"
            rounded="16px"
            p="24px"
            border="1px solid"
            borderColor="#E5E7EB"
            _hover={{
              boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
              transform: "translateY(-2px)",
              transition: "all 0.2s",
            }}
            transition="all 0.2s"
          >
            <HStack justify="space-between" align="start" mb="16px">
              <VStack align="start" gap="4px" flex="1">
                <Text
                  fontSize="14px"
                  color="brand.200"
                  fontWeight={400}
                  lineHeight="20px"
                >
                  {metric.title}
                </Text>
                <Heading
                  fontSize={["28px", "32px", "36px"]}
                  fontWeight={700}
                  color="brand.100"
                  lineHeight="40px"
                >
                  {metric.value}
                </Heading>
              </VStack>
              <Box
                bgGradient={metric.bgGradient}
                p="12px"
                rounded="12px"
                color="white"
              >
                <Icon as={metric.icon} boxSize="24px" />
              </Box>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Quick Actions */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <VStack align="start" gap="20px" w="full">
          <Heading fontSize="20px" fontWeight={600} color="brand.100">
            Quick Actions
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="16px" w="full">
            <CtaButton
              isFull={true}
              isLink={false}
              btnText="New Consultation"
              handleClick={() => navigate("/dashboard/consultations")}
              leftIcon={FiPlus}
            />
            <CtaButton
              isFull={true}
              isLink={false}
              btnText="New Appointment"
              handleClick={() => navigate("/dashboard/appointments")}
              leftIcon={FiPlus}
            />
            <CtaButton
              isFull={true}
              isLink={false}
              btnText="New Blog Post"
              handleClick={() => navigate("/dashboard/blog-management/new")}
              leftIcon={FiPlus}
            />
            <CtaButton
              isFull={true}
              isLink={false}
              btnText="View All Clients"
              handleClick={() => navigate("/dashboard/clients")}
              leftIcon={FiUsers}
            />
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Recent Activities */}
      <SimpleGrid columns={[1, 1, 2]} spacing="20px" w="full">
        {/* Recent Consultations */}
        <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
          <VStack align="start" gap="16px" w="full">
            <HStack justify="space-between" w="full">
              <Heading fontSize="18px" fontWeight={600} color="brand.100">
                Recent Consultations
              </Heading>
              <Button
                variant="ghost"
                size="sm"
                color="brand.100"
                onClick={() => navigate("/dashboard/consultations")}
                _hover={{ bg: "brand.100", color: "white" }}
              >
                View All
              </Button>
            </HStack>
            <Divider borderColor="#E5E7EB" />
            <VStack align="start" gap="12px" w="full">
              {recentActivities?.consultations?.length > 0 ? (
                recentActivities.consultations.map((consultation) => (
                  <Box key={consultation.id} w="full" p="12px" rounded="8px" _hover={{ bg: "brand.800" }}>
                    <HStack justify="space-between" align="start" w="full">
                      <VStack align="start" gap="4px" flex="1">
                        <Text fontSize="14px" fontWeight={600} color="brand.100">
                          {consultation.firstName} {consultation.lastName}
                        </Text>
                        <Text fontSize="12px" color="brand.200">
                          {consultation.email}
                        </Text>
                        <Text fontSize="12px" color="brand.200">
                          {consultation.practiceArea || "N/A"}
                        </Text>
                        <Text fontSize="11px" color="brand.400">
                          {formatDate(consultation.createdAt)}
                        </Text>
                      </VStack>
                      <VStack align="end" gap="8px">
                        <Badge colorScheme={getStatusColor(consultation.status)}>
                          {consultation.status}
                        </Badge>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => navigate(`/dashboard/consultations/${consultation.id}`)}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        >
                          <Icon as={FiEye} />
                        </Button>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text fontSize="14px" color="brand.200" textAlign="center" w="full" py="20px">
                  No recent consultations
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>


        {/* Recent Blog Posts */}
        <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
          <VStack align="start" gap="16px" w="full">
            <HStack justify="space-between" w="full">
              <Heading fontSize="18px" fontWeight={600} color="brand.100">
                Recent Blog Posts
              </Heading>
              <Button
                variant="ghost"
                size="sm"
                color="brand.100"
                onClick={() => navigate("/dashboard/blog-management")}
                _hover={{ bg: "brand.100", color: "white" }}
              >
                View All
              </Button>
            </HStack>
            <Divider borderColor="#E5E7EB" />
            <VStack align="start" gap="12px" w="full">
              {recentActivities?.blogPosts?.length > 0 ? (
                recentActivities.blogPosts.map((post) => (
                  <Box key={post.id} w="full" p="12px" rounded="8px" _hover={{ bg: "brand.800" }}>
                    <HStack justify="space-between" align="start" w="full">
                      <VStack align="start" gap="4px" flex="1">
                        <Text fontSize="14px" fontWeight={600} color="brand.100" noOfLines={2}>
                          {post.title}
                        </Text>
                        <Text fontSize="12px" color="brand.200">
                          By {post.author || "Admin"}
                        </Text>
                        <Text fontSize="11px" color="brand.400">
                          {formatDate(post.createdAt)}
                        </Text>
                      </VStack>
                      <VStack align="end" gap="8px">
                        <Badge colorScheme={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => navigate(`/dashboard/blog-management/${post.id}`)}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        >
                          <Icon as={FiEye} />
                        </Button>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text fontSize="14px" color="brand.200" textAlign="center" w="full" py="20px">
                  No recent blog posts
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Recent Appointments */}
        <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
          <VStack align="start" gap="16px" w="full">
            <HStack justify="space-between" w="full">
              <Heading fontSize="18px" fontWeight={600} color="brand.100">
                Recent Appointments
              </Heading>
              <Button
                variant="ghost"
                size="sm"
                color="brand.100"
                onClick={() => navigate("/dashboard/appointments")}
                _hover={{ bg: "brand.100", color: "white" }}
              >
                View All
              </Button>
            </HStack>
            <Divider borderColor="#E5E7EB" />
            <VStack align="start" gap="12px" w="full">
              {recentActivities?.appointments?.length > 0 ? (
                recentActivities.appointments.map((appointment) => (
                  <Box key={appointment.id} w="full" p="12px" rounded="8px" _hover={{ bg: "brand.800" }}>
                    <HStack justify="space-between" align="start" w="full">
                      <VStack align="start" gap="4px" flex="1">
                        <Text fontSize="14px" fontWeight={600} color="brand.100">
                          {appointment.clientName}
                        </Text>
                        <Text fontSize="12px" color="brand.200">
                          {appointment.email}
                        </Text>
                        <Text fontSize="12px" color="brand.200">
                          {appointment.practiceArea || "N/A"}
                        </Text>
                        {appointment.scheduledDate && (
                          <Text fontSize="11px" color="brand.400">
                            {formatDate(appointment.scheduledDate)} {formatTime(appointment.scheduledTime)}
                          </Text>
                        )}
                      </VStack>
                      <VStack align="end" gap="8px">
                        <Badge colorScheme={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => navigate(`/dashboard/appointments/${appointment.id}`)}
                          color="brand.100"
                          _hover={{ bg: "brand.100", color: "white" }}
                        >
                          <Icon as={FiEye} />
                        </Button>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text fontSize="14px" color="brand.200" textAlign="center" w="full" py="20px">
                  No recent appointments
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>

    </VStack>
  );
}

export default Overview;

