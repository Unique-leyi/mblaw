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
    url, 
    isOutline, 
    isDisabled, 
    isLoading 
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
                    bgColor={isOutline ? "brand.300" : "brand.100" }
                    color={isOutline ? "brand.100" : "white"}
                    py="12px"
                    px="20px"
                    h="initial"
                    fontSize={[18, 18, 20]}
                    fontWeight={500}
                    rounded="10px"
                    textAlign="center"
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
                bgColor={isOutline ? "brand.300" : "brand.100" }
                color={isOutline ? "brand.100" : "white"}
                py="12px"
                px="20px"
                h="initial"
                fontSize={[18, 18, 20]}
                fontWeight={500}
                rounded="10px"
                textAlign="center"
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
