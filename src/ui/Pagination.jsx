import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange, isDisabled, showPaginateItems }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <HStack
            w="full"
            justify="space-between"
            align="center"
            gap="40px"
            py="20px"
            px="15px"
        >
            <Button 
                leftIcon={<IoArrowBack />} 
                bg="white"
                border="1px solid"
                borderColor="alt.200"
                variant="solid"
                color="alt.200"
                rounded="10px"
                _hover={{ bgColor: "brand.100", color: "white" }}
                isDisabled={isDisabled || currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            {showPaginateItems && (

            <HStack gap="20px" display={["none", "none", "none", "flex"]}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        fontSize={14}
                        fontWeight={500}
                        lineHeight="22px"
                        color={i + 1 === currentPage ? "white" : "white"}
                        letterSpacing="-0.5%"
                        cursor="pointer"
                        bg={i + 1 === currentPage ? "brand.100" : "alt.200"}
                        py="4px"
                        px="10px"
                        textAlign="center"
                        rounded="4px"
                        _hover={{ bg: "alt.800" }}
                        isDisabled={isDisabled}
                        onClick={() => onPageChange(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}
            </HStack>
            )}


            <Button 
                rightIcon={<IoArrowForward />} 
                bg="white"
                border="1px solid"
                borderColor="alt.200"
                variant="solid"
                color="alt.200"
                rounded="10px"
                _hover={{ bgColor: "brand.100", color: "white" }}
                isDisabled={isDisabled || currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </HStack>
    )
}

export default Pagination;
