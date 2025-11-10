import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Box, Icon, useColorModeValue } from "@chakra-ui/react";
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [borderAngle, setBorderAngle] = useState(0);

  const location = useLocation();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    setIsVisible(scrollTop > 200);

    const angle = Math.min(360, (scrollTop / maxScroll) * 360);
    setBorderAngle(angle);
  };

  const handleBackUp = () => { 
    scroll.scrollToTop({ duration: 50, smooth: true });
  };

    // Automatically scroll to top on route change
    useEffect(() => {
      scroll.scrollToTop({ duration: 50, smooth: true });
    }, [location]);
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = "#00BF63";
  const hoverIconColor = "#00BF63";

  return (
    <>
      {isVisible && (
        <Box
          position="fixed"
          bottom="10"
          left="10"
          w="16"
          h="16"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="xl"
          cursor="pointer"
          bgGradient={`conic-gradient(from 0deg, #00AFEF ${borderAngle}deg, rgba(0, 175, 239, 0.9) ${borderAngle}deg 360deg)`}
          transition="background 0.5s ease"
          onClick={handleBackUp}
          zIndex="9997"
        >
          <Box
            w="full"
            h="full"
            bg={bgColor}
            borderRadius="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            transition="all 0.3s ease"
            role="group"
            _hover={{
              bg: hoverBgColor,
              svg: { color: hoverIconColor },
            }}
          >
            <Icon 
                as={FaArrowUp} 
                fontSize="2xl" 
                color="brand.100"
                _groupHover={{
                    color: "white"
                }} 
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ScrollToTop;
