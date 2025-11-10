import { Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


function AppLogo({ isWhite }) {
  


  return (
    <Link to="/">
        <Image
          w="81px"
          h="88.04px"
          src={isWhite ?  "https://res.cloudinary.com/doqvfemo3/image/upload/v1762763348/MbLaw/0328dd220b79e419ecae514c7130be381a2e23a0_dogbro.png" : "https://res.cloudinary.com/doqvfemo3/image/upload/v1762763348/MbLaw/f660e10be643c8e8162463cdd851cdf7f8da16d8_lfusar.png"}
          alt="logo-image"
          objectFit="contain"
        />
    </Link>
  )
}

export default AppLogo