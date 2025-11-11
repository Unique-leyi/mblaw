import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Link,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ContainerLayout from './ContainerLayout';
import AppLogo from './AppLogo';
import { footerNavigation, footerSocialLinks, footerContactInfo, footerLanguages } from '../../data/FooterData';

const Footer = () => {
  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={['40px', '50px', '60px', '80px']}
      px={['20px', '30px', '40px', '60px']}
      bg="brand.100"
      color="white"
    >
      <ContainerLayout>
        <VStack w="full" gap={['40px', '50px', '60px', '80px']} align="stretch">
          {/* Top Navigation - Right Aligned */}
          <HStack
            w="full"
            justify={['center', 'center', 'flex-end']}
            align="center"
            spacing={['20px', '24px', '28px', '32px']}
            flexWrap="wrap"
          >
            {footerNavigation.map((item, index) => (
              <Link
                key={index}
                as={RouterLink}
                to={item.path}
                color="white"
                fontSize={['14px', '15px', '16px', '18px']}
                fontWeight={400}
                fontFamily="body"
                _hover={{
                  opacity: 0.8,
                }}
                transition="opacity 0.2s"
              >
                {item.display}
              </Link>
            ))}
          </HStack>

          {/* Main Content - Two Columns */}
          <SimpleGrid
            w="full"
            columns={[1, 1, 2]}
            gap={['40px', '50px', '60px', '80px']}
            align="start"
          >
            {/* Left Column */}
            <VStack
              w="full"
              align="start"
              spacing={['24px', '28px', '32px', '40px']}
            >
              {/* Logo */}
              <Box>
                <AppLogo isWhite={true} />
              </Box>

              {/* Description */}
              <Text
                fontSize={['14px', '15px', '16px']}
                fontWeight={400}
                color="white"
                lineHeight={['22px', '24px', '26px']}
                maxW="500px"
                fontFamily="body"
              >
                MB Law stands as a forward-thinking firm dedicated to providing exceptional legal solutions built on trust, precision, and a commitment to client success.
              </Text>

              {/* More about us */}
              <HStack spacing="8px" align="center">
                <Link
                  as={RouterLink}
                  to="/about-us"
                  color="white"
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                  fontFamily="body"
                  _hover={{ textDecoration: 'underline' }}
                  transition="all 0.2s"
                >
                  More about us
                </Link>
                <Box
                  w="4px"
                  h="4px"
                  bgColor="white"
                  rounded="full"
                />
              </HStack>

              {/* Social Icons - 2x2 Grid */}
              <SimpleGrid
                columns={2}
                spacing={['12px', '14px', '16px', '20px']}
                w="fit-content"
              >
                {footerSocialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.2s"
                  >
                    <Box
                      w={['44px', '48px', '52px', '56px']}
                      h={['44px', '48px', '52px', '56px']}
                      bgColor="white"
                      rounded="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="brand.100"
                    >
                      <Box
                        as={social.icon}
                        fontSize={['20px', '22px', '24px']}
                        w={['20px', '22px', '24px']}
                        h={['20px', '22px', '24px']}
                      />
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            </VStack>

            {/* Right Column */}
            <VStack
              w="full"
              align="start"
              spacing={['32px', '36px', '40px', '48px']}
            >
              {/* Contact Us */}
              <VStack align="start" spacing={['12px', '14px', '16px', '20px']}>
                <Heading
                  fontSize={['18px', '20px', '22px', '24px']}
                  fontWeight={600}
                  color="white"
                  lineHeight="100%"
                  fontFamily="heading"
                >
                  Contact Us
                </Heading>
                <Text
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                  color="rgba(255, 255, 255, 0.8)"
                  lineHeight="24px"
                  fontFamily="body"
                >
                  {footerContactInfo.phone}
                </Text>
                <Text
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                  color="rgba(255, 255, 255, 0.8)"
                  lineHeight="24px"
                  fontFamily="body"
                >
                  {footerContactInfo.email}
                </Text>
              </VStack>

              {/* MB Law Office */}
              <VStack align="start" spacing={['12px', '14px', '16px', '20px']}>
                <Heading
                  fontSize={['18px', '20px', '22px', '24px']}
                  fontWeight={600}
                  color="white"
                  lineHeight="100%"
                  fontFamily="heading"
                >
                  MB Law Office
                </Heading>
                <Text
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                  color="rgba(255, 255, 255, 0.8)"
                  lineHeight={['22px', '24px', '26px']}
                  maxW="400px"
                  fontFamily="body"
                >
                  {footerContactInfo.address}
                </Text>
              </VStack>

              {/* Languages */}
              <VStack align="start" spacing={['8px', '10px', '12px']}>
                <Text
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                  color="white"
                  lineHeight="100%"
                  fontFamily="body"
                >
                  Languages
                </Text>
                <HStack spacing={['12px', '14px', '16px', '20px']} flexWrap="wrap">
                  {footerLanguages.map((lang, index) => (
                    <Text
                      key={index}
                      fontSize={['14px', '15px', '16px']}
                      fontWeight={lang === 'En' ? 600 : 400}
                      color={lang === 'En' ? 'white' : 'rgba(255, 255, 255, 0.8)'}
                      lineHeight="100%"
                      cursor="pointer"
                      fontFamily="body"
                      _hover={{
                        color: 'white',
                      }}
                      transition="all 0.2s"
                    >
                      {lang}
                    </Text>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </SimpleGrid>

          {/* Copyright - Bottom Center */}
          <Box
            w="full"
            pt={['24px', '28px', '32px', '40px']}
            borderTop="1px solid rgba(255, 255, 255, 0.15)"
          >
            <VStack align={['start', 'start', 'center']} spacing="4px">
              <Text
                fontSize={['12px', '13px', '14px']}
                fontWeight={400}
                color="rgba(255, 255, 255, 0.7)"
                lineHeight="140%"
                fontFamily="body"
              >
                © {new Date().getFullYear()}— Copyright
              </Text>
              <Text
                fontSize={['12px', '13px', '14px']}
                fontWeight={400}
                color="rgba(255, 255, 255, 0.7)"
                lineHeight="140%"
                fontFamily="body"
              >
                All Rights reserved
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ContainerLayout>
    </Stack>
  );
};

export default Footer;
