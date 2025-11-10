import { Box, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";



const DashboardLayout = () => {

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      {isDesktop ? (
        <Flex gap={0} w="full" bgColor="#F5F5F9">
          <Sidebar />
          <VStack 
            align='flex-start' 
            w='full' 
            gap="0" 
            h="100vh"
            overflowY="auto"
         >
            <DashboardNavbar />
            <Box 
              w='full' 
              mx="auto" 
              py="40px" 
              px={["16px", "16px", "8"]}
            >
              <Outlet />
            </Box>
          </VStack>
        </Flex>
      ) : (
        <>
          <Box bgColor="#F5F5F9" minH="100vh">
            <DashboardNavbar />
            <Box px="16px" py="24px">
              <Outlet />
            </Box>
          </Box>
        </>
      )}


    </>
  );
};

export default DashboardLayout;
