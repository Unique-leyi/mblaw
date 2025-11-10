import { Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function PageLoader({ loadingText }) {
  return (
    <VStack
      w={["full", "full", "full", "50%"]}
      mx={["initial", "initial", "initial", "auto"]}
      justify="center"
      align="center"
      gap="10px"
      py="20px"
    >
        <Spinner color="brand.100" size="lg"/>
        <Text
          fontSize={16}
          fontWeight={500}
          color="gray.700"
          textAlign="center"
        >
            {loadingText}
        </Text>

    </VStack>
  )
}

export default PageLoader