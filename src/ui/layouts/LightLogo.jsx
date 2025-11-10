import { Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { Users } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


function LightLogo() {
  

  return (
    <Link to="/">
        <HStack
            justify="flex-start"
            align="center"
            gap="14px"
            title="himmer-wellbeing-hub"
        >
            <VStack
                w="50px"
                h="45px"
                justify="center"
                align="center"
                bg="rgb(255 255 255 / 0.2)"
                color="white"
                rounded="12px"
                backdropBlur="5px"
            >
                <Icon as={Users} fontSize="20px"/>
            </VStack>

            <VStack
                justify="start"
                align="start"
                gap="0px"
            >
                <Heading
                    fontSize={20}
                    fontWeight={700}
                    color="white"
                >
                    Himmer
                </Heading>
                <Text
                    fontSize={14}
                    fontWeight={400}
                    color="white"
                >
                    Wellbeing Hub 
                </Text>
            </VStack>
        </HStack>
    </Link>
  )
}

export default LightLogo