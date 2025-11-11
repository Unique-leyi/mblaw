import React from 'react'
import { Stack, VStack, Text, Heading, Button, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ContainerLayout from '../ui/layouts/ContainerLayout'
import CtaButton from '../ui/CtaButton'

function NotFoundPage() {
  return (
    <Stack
      w="full"
      justify="center"
      align="center"
      minH="80vh"
      pt={["6rem", "6rem", "8rem"]}
      pb={["2rem", "2rem", "4rem"]}
    >
      <ContainerLayout>
        <VStack
          w="full"
          justify="center"
          align="center"
          gap="30px"
          textAlign="center"
        >
          <Heading
            fontSize={[80, 100, 120]}
            fontWeight={700}
            color="brand.100"
            lineHeight="100%"
          >
            404
          </Heading>

          <Heading
            fontSize={[28, 32, 40]}
            fontWeight={700}
            color="brand.100"
            lineHeight="100%"
          >
            Page Not Found
          </Heading>

          <Text
            fontSize={[16, 18, 20]}
            fontWeight={300}
            color="brand.200"
            lineHeight="28px"
            maxW="600px"
          >
            Sorry, the page you are looking for does not exist. It may have been moved, deleted, or the URL may be incorrect.
          </Text>

          <VStack gap="20px" mt="20px">
            <CtaButton
              isLink={true}
              btnText="Go to Home"
              url="/"
              isOutline={false}
            />

            <Button
              as={Link}
              to="/contact-us"
              variant="link"
              color="brand.100"
              fontSize="18px"
              fontWeight={500}
              textDecoration="underline"
              _hover={{ textDecoration: "none" }}
            >
              Contact Us
            </Button>
          </VStack>
        </VStack>
      </ContainerLayout>
    </Stack>
  )
}

export default NotFoundPage