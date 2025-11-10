import { VStack } from '@chakra-ui/react'
import React from 'react'

function ContainerLayout({ children }) {
  return (
    <VStack
        w={["full", "full", "full", "95%"]}
        p={["12px", "20px", "20px", "initial"]}
        mx={["initial", "initial", "initial", "auto"]}
        justify="center"
        align="center"
    >
        {children}
    </VStack>
  )
}

export default ContainerLayout
