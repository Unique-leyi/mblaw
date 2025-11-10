import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Icon,
  Link,
  Badge,
  Button,
  Divider,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Users, Mail, Phone, MapPin, Heart } from 'lucide-react';
import ContainerLayout from '../../ui/layouts/ContainerLayout';
import { socialContacts } from '../../data/ContactData';
import { NavLink } from 'react-router-dom';
import { NavbarData } from '../../data/NavbarData';
import { generateContactLink } from '../../util/helper';

const Footer = () => {

  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      py={['6px', '20px', '40px']}
      bg="brand.100"
      color="white"
    >
      <ContainerLayout>
        <SimpleGrid
          w="full"
          columns={[1, 1, 1, 5]}
          gap={['10px', '10px', '32px']}
        >
          {/* Brand */}
          <VStack
            justify="start"
            align="start"
            gap={['10px', '10px', '24px']}
            gridColumn={{ md: 'span 2' }}
          >
            <Heading as="h4" fontSize="24px" fontWeight="600" mb="20px">
              Our Address
            </Heading>
            {/* <Link>
              <Image
                w="full"
                h={['78.97px', '98.97px', '118.97px']}
                src="https://res.cloudinary.com/doqvfemo3/image/upload/v1754508929/Greenshield-HMO/a31645f147343660fc42d0fdb86b7d1aa214d67f_wzsx5g.png"
                alt="greenshield-hmo-logo"
                objectFit="contain"
                ml="-24px"
              />
            </Link> */}
            <Text
              fontSize={[16, 16, 18]}
              fontWeight={300}
              color="white"
              lineHeight="25px"
              letterSpacing="0px"
              maxW="500px"
            >
              Contact Address (Head Office): 2nd Floor, Plot 15, CIPM Road,
              Opposite Alausa Central Mosque, Central Business District, Alausa,
              Ikeja, Lagos State.
              <br />
              <br />
              Abuja Office: Suite T14, Febson Mall, Wuse Zone 4, Abuja FCT.
            </Text>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" spacing="12px">
            <Heading as="h4" fontSize="24px" fontWeight="600" mb="20px">
              Quick Links
            </Heading>
            <VStack align="start" spacing="20px" color="white">
              {NavbarData.map((item) => (
                <NavLink key={item.id} to={item.path}>
                  <Text
                    fontSize={[16, 16, 18]}
                    fontWeight={300}
                    color="brand.800"
                    lineHeight="100%"
                    letterSpacing="0%"
                    _hover={{ color: 'white' }}
                  >
                    {item.display}
                  </Text>
                </NavLink>
              ))}
            </VStack>
          </VStack>

          {/* Contact */}
          <VStack align="start" spacing="12px" gridColumn={{ md: 'span 2' }}>
            <Heading as="h4" fontSize="24px" fontWeight="600" mb="20px">
              Contact
            </Heading>
            <VStack
              align="start"
              gap={['24px', '24px', '40px']}
              fontSize={[24, 24, 30]}
              fontWeight={400}
              color="white"
              lineHeight="40px"
              letterSpacing="0px"
            >
              {socialContacts.map((social, i) => (
                <Button
                  key={i}
                  as="a"
                  variant="unstyled"
                  href={generateContactLink(social)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '100%' }}
                >
                  <HStack w="full" justify="start" align="center" gap="10px">
                    <VStack
                      w="55px"
                      h="50px"
                      justify="center"
                      align="center"
                      bgColor="white"
                      rounded="full"
                      color="brand.100"
                      _hover={{
                        bgColor: 'brand.700',
                      }}
                    >
                      <Icon as={social.icon} fontSize="20px" />
                    </VStack>

                    <VStack w="full" justify="start" align="start" gap="1px">
                      <Text
                        fontSize={[18, 18, 20]}
                        fontWeight={400}
                        color="white"
                        lineHeight="40px"
                        letterSpacing="0px"
                      >
                        {social?.title}
                      </Text>

                      <Text
                        fontSize={16}
                        fontWeight={300}
                        color="gray.100"
                        lineHeight="20px"
                        letterSpacing="0px"
                        whiteSpace="wrap"
                      >
                        {social?.content}
                      </Text>
                    </VStack>
                  </HStack>
                </Button>
              ))}
            </VStack>
          </VStack>
        </SimpleGrid>

        <Divider border="1px dashed" borderColor="brand.800" mt="48px" />

        <HStack
          mt={["10px", "16px", "32px"]}
          w="full"
          flexDir={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap="0px"
          wrap={['wrap', 'wrap', 'nowrap']}
          fontSize={[18, 18, 20]}
          fontWeight={300}
          color="white"
          lineHeight="40px"
          letterSpacing="0px"
        >
          <Text>
            © {new Date().getFullYear()} Greenshield HMO. All rights reserved.
          </Text>
          <HStack
            spacing="24px"
            justify={['center', 'center', 'start']}
            wrap={['wrap', 'wrap', 'nowrap']}
            fontSize={[18, 18, 20]}
            fontWeight={300}
            color="white"
            lineHeight="40px"
            letterSpacing="0px"
          >
            <Link href="#" transition="colors 0.2s">
              Privacy Policy
            </Link>
            <Link href="#" transition="colors 0.2s">
              Terms of Service
            </Link>
          </HStack>
        </HStack>
      </ContainerLayout>
    </Stack>
  );
};

export default Footer;
