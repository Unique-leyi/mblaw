import { Button, HStack, Icon } from '@chakra-ui/react'
import React from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

function Pagination({ currentPage, totalPages, onPageChange }) {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    // Calculate which page numbers to show (max 3 visible)
    const getPageNumbers = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        if (currentPage === 1) {
            return [1, 2, 3];
        } else if (currentPage === totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [currentPage - 1, currentPage, currentPage + 1];
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <HStack
            w="full"
            justify="center"
            align="center"
            gap="12px"
            spacing="12px"
        >
            {/* Previous Button */}
            <Button
                leftIcon={<Icon as={IoChevronBack} />}
                bg={isFirstPage ? "gray.400" : "brand.100"}
                color="white"
                fontSize="16px"
                fontWeight={400}
                fontFamily="body"
                py="10px"
                px="20px"
                rounded="8px"
                _hover={isFirstPage ? {} : { opacity: 0.9 }}
                _disabled={{
                    bg: "gray.400",
                    color: "white",
                    cursor: "not-allowed",
                    opacity: 1
                }}
                isDisabled={isFirstPage}
                onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            {/* Page Number Buttons */}
            {pageNumbers.map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                    <Button
                        key={pageNum}
                        bg={isActive ? "brand.100" : "white"}
                        color={isActive ? "white" : "brand.100"}
                        border={isActive ? "none" : "1px solid"}
                        borderColor={isActive ? "transparent" : "gray.300"}
                        fontSize="16px"
                        fontWeight={400}
                        fontFamily="body"
                        py="10px"
                        px="20px"
                        rounded="8px"
                        _hover={isActive ? {} : { bg: "gray.50" }}
                        onClick={() => onPageChange(pageNum)}
                        cursor="pointer"
                    >
                        {pageNum}
                    </Button>
                );
            })}

            {/* Next Button */}
            <Button
                rightIcon={<Icon as={IoChevronForward} />}
                bg={isLastPage ? "gray.400" : "brand.100"}
                color="white"
                fontSize="16px"
                fontWeight={400}
                fontFamily="body"
                py="10px"
                px="20px"
                rounded="8px"
                _hover={isLastPage ? {} : { opacity: 0.9 }}
                _disabled={{
                    bg: "gray.400",
                    color: "white",
                    cursor: "not-allowed",
                    opacity: 1
                }}
                isDisabled={isLastPage}
                onClick={() => !isLastPage && onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </HStack>
    )
}

export default Pagination;
