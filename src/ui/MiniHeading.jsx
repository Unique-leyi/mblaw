import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import CtaButton from './CtaButton'

function MiniHeading({ 
  miniTitle, 
  title, 
  miniTitleColor = "brand.400", 
  titleColor = "white", 
  content,
  contentColor = "brand.400",
  btnText, 
  miniTitleFontSize,
  titleFontSize,
  contentFontSize,
  isReverse = false,
  isCenter = false,
  url 
}) {

  return (

    <HStack
        w="full"
        justify={isCenter ? "center" : ["start", "start", "space-between"]}
        align={isCenter ? "center" : ["center", "center", "end"]}
        gap={["20px", "20px", "40px"]}
        wrap={["wrap", "wrap", "nowrap"]}
        flexDirection={isCenter ? "column" : "row"}
    >

        <VStack
          w="full"
          justify="start"
          align={isCenter ? "center" : "start"}
          gap="15px"
        >
          <Text
              fontSize={miniTitleFontSize ? miniTitleFontSize : ["16px", "16px", "20px"]}
              fontWeight={300}
              lineHeight="24px"
              color={miniTitleColor}
              letterSpacing="0%"
              textAlign={isCenter ? "center" : "left"}
          >
              {miniTitle}
          </Text>

          <Heading
              fontSize={titleFontSize ? titleFontSize : ["32px", "36px", "50px"]}
              fontWeight={700}
              lineHeight="100%"
              color={titleColor}
              letterSpacing="0%"
              textAlign={isCenter ? "center" : "left"}
          >
              {title}
          </Heading>

          {content &&  (
            <Text
                fontSize={contentFontSize ? contentFontSize : ["16px", "16px", "20px"]}
                fontWeight={300}
                lineHeight="25px"
                color={contentColor}
                letterSpacing="0%"
                textAlign={isCenter ? "center" : "left"}
            >
               {content}
            </Text>
          )}

        </VStack>

       {btnText && (
        <VStack
          w={isCenter ? "full" : ["full", "full", "40%"]}
          justify={isCenter ? "center" : ["center", "center", "end"]}
          align={isCenter ? "center" : ["center", "center", "end"]}
        >
          <CtaButton
              isLink={true}
              isReverse={isReverse}
              isOutline={false}
              url={url}
              btnText={btnText}
          />
        </VStack>
       )}   

        
    </HStack>
  )
}

export default MiniHeading