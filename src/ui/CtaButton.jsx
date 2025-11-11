import { Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function CtaButton({ 
    isLink, 
    btnText,
    isFull, 
    handleClick, 
    icon, 
    leftIcon,
    rightIcon,
    url, 
    isOutline, 
    isDisabled, 
    isLoading,
    isReverse,
    borderColor,
    color
}) {


  return (
    <>
        {isLink ?
            <Link 
                to={url}
                style={{ width: isFull ? "100%" : "fit-content" }} 
            >
                <Button
                    w={isFull ? "full" : ["full", "full", "full", "fit-content"]}
                    bgColor={isOutline ? "transparent" :  ( isReverse ? "white" :  "brand.100" )}
                    color={color || (isOutline ? "brand.100" : ( isReverse ? "brand.100" :  "white" ))}
                    border="1px solid"
                    borderColor={borderColor || (isReverse ? "white" :  "brand.100")}
                    py="18px"
                    px="25px"
                    h="initial"
                    fontFamily="openSans"
                    fontSize={[18, 18, 20]}
                    fontWeight={500}
                    lineHeight="100%"
                    rounded="initial"
                    textAlign="center"
                    leftIcon={leftIcon ? <Icon as={leftIcon} /> : undefined}
                    rightIcon={rightIcon ? <Icon as={rightIcon} /> : undefined}
                    onClick={handleClick}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    _hover={{
                        bgColor: "brand.100",
                        color: "white",
                    }}
                >
                    {btnText}
                </Button>
            </Link>

            :
            <Button
                w={isFull ? "full" : ["full", "full", "full", "fit-content"]}
                bgColor={isOutline ? "transparent.300" :  ( isReverse ? "white" :  "brand.100" )}
                color={color || (isOutline ? "brand.100" : ( isReverse ? "brand.100" :  "white" ))}
                border="1px solid"
                borderColor={borderColor || (isReverse ? "white" :  "brand.100")}
                py="18px"
                px="25px"
                h="initial"
                fontFamily="openSans"
                fontSize={[18, 18, 20]}
                fontWeight={500}
                lineHeight="100%"
                rounded="initial"
                textAlign="center"
                leftIcon={leftIcon ? <Icon as={leftIcon} /> : undefined}
                rightIcon={rightIcon ? <Icon as={rightIcon} /> : undefined}
                onClick={handleClick}
                isDisabled={isDisabled}
                isLoading={isLoading}
                _hover={{
                    bgColor: "brand.100",
                    color: "white",
                }}
            >
                {btnText}
            </Button>

        } 
    </>
  )
}

export default CtaButton
