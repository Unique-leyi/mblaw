import { Heading, Image, Text, VStack, Box, HStack } from '@chakra-ui/react'
import React from 'react'

function MiniHeading({ isWhite, miniTitle, title, content, underlineWord, isCenter }) {

  const renderTitleWithUnderline = (title, underlineWord) => {
  if (!underlineWord) {
    return title;
  }

  const words = title.split(' ');
  const underlineWords = underlineWord.toLowerCase().split(' ');

  return words.map((word, index) => (
    <Box
      as="span"
      key={index}
      // textDecoration={underlineWords.includes(word.toLowerCase()) ? 'underline' : 'none'}
      // textDecorationThickness={underlineWords.includes(word.toLowerCase()) ? '2px' : 'none'}
      color={
        underlineWords.includes(word.toLowerCase())
          ? isWhite
            ? 'brand.100' 
            : 'brand.100' 
          : isWhite
          ? 'white'
          : 'brand.700'
      }
    >
      {word}
      {index < words.length - 1 ? ' ' : ''}
    </Box>
  ));
};

  return (
    <VStack
      w={isCenter ? "full" : ["full", "full", "full", "70%"]}
      mx={isCenter ? "initial" : ["initial", "initial", "initial", "auto"]}
      justify={isCenter ? "start" : "center"}
      align={isCenter ? "start" : "center"}
      gap="20px"
    >
      {isCenter ?
        <HStack
          w="full"
          justify="start"
          align="center"
          gap="10px"
        >
          {/* <Image
            w="79px"
            h="77.46px"
            src={isWhite ? "https://res.cloudinary.com/doqvfemo3/image/upload/v1754344021/Greenshield-HMO/green_2_1_x5glaz.png" : "https://res.cloudinary.com/doqvfemo3/image/upload/v1754344202/Greenshield-HMO/white_2_m6u6rb.png"}
            alt={`${title?.toLowerCase()}-image`}
          /> */}

          <Text
            fontSize={[24, 24, 30]}
            fontWeight={300}
            color={isWhite ? "brand.800" : "brand.100"}
            lineHeight="40px"
            letterSpacing="0%"
            textAlign={isCenter ? "left" : "center"}
          >
            {miniTitle}
          </Text>
        </HStack>
      :

      <VStack
        w="full"
        justify="center"
        align="center"
        gap="10px"
      >
        {/* <Image
          w={["50px", "50px", "79px"]}
          h={["48px", "48px", "77.46px"]}
          src={isWhite ? "https://res.cloudinary.com/doqvfemo3/image/upload/v1754344021/Greenshield-HMO/green_2_1_x5glaz.png" : "https://res.cloudinary.com/doqvfemo3/image/upload/v1754344202/Greenshield-HMO/white_2_m6u6rb.png"}
          alt={`${title?.toLowerCase()}-image`}
          objectFit="contain"
        /> */}

        <Text
          fontSize={[18, 20, 30]}
          fontWeight={300}
          color={isWhite ? "brand.800" : "brand.100"}
          lineHeight="40px"
          letterSpacing="0%"
          textAlign={isCenter ? "left" : "center"}
        >
          {miniTitle}
        </Text>
      </VStack>
      }

      <VStack
        w="full"
        justify={isCenter ? "start" : "center"}
        align={isCenter ? "start" : "center"}
        gap="20px"
      >
        <Heading
          fontSize={[32, 44, 60]}
          fontWeight={600}
          color={isWhite ? "white" : "black"}
          lineHeight={["34px", "40px", "60px"]}
          letterSpacing="0px"
          textAlign={isCenter ? "left" : "center"}
        >
          {renderTitleWithUnderline(title, underlineWord)}
        </Heading>

        <Text
          fontSize={[20, 20, 30]}
          fontWeight={300}
          color={isWhite ? "white" : "brand.500"}
          lineHeight={["24px", "24px", "40px"]}
          letterSpacing="0px"
          textAlign={isCenter ? "left" : "center"}
        >
          {content}
        </Text>
      </VStack>
    </VStack>
  )
}

export default MiniHeading