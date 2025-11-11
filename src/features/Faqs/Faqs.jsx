import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Text,
  HStack,
  useBreakpointValue,
  SimpleGrid,
  Icon,
  Heading,
  Stack,
  textDecoration,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import MiniHeading from "../../ui/MiniHeading";
import { ChevronDown } from "lucide-react";
import { faqsData } from "../../data/FaqsData";



function Faqs() {

  const [activeIndex, setActiveIndex] = useState(0); 

  const handleAccordionChange = (index) => {
    setActiveIndex(activeIndex === index ? undefined : index);
  };

  return (
    <Stack
        w="full"
        justify="start"
        align="start"
        py={["4rem", "4rem", "6rem"]}
        bgColor="brand.800"
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
              gap={["20px", "20px", "40px"]}
            >

                <MiniHeading
                    miniTitle="FAQs"
                    title="Your Questions, Answered Clearly"
                    miniTitleColor="brand.100"
                    titleColor="brand.100"
                />


               <SimpleGrid
                 w="full"
                 columns={[1, 1, 2]}
                 gap="40px"
               >

                  <VStack
                    w="full"
                    justify="start"
                    align="start"
                  >
                    <Image
                      w="full"
                      h="full"
                      minH={["full", "full", "674px"]}
                      src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762880056/MbLaw/3b906a59b98d7f2a3096f2faeebb6d5ac8198c3a_nfdmzg.jpg"
                      alt="faq-img"
                      objectFit="cover"
                      rounded="20px"
                    />

                  </VStack>

                    <Accordion
                        allowMultiple={false}
                        allowToggle={true}
                        index={activeIndex !== undefined ? activeIndex : -1} 
                        onChange={handleAccordionChange} 
                        w="full"
                    >
                            <VStack
                                w="full"
                                justify="start"
                                align="start"
                                gap="20px"
                            >
                                {faqsData.map((faq, index) => (
                                    <AccordionItem key={index} borderTop="none" w="full"> 
                                        <AccordionButton
                                            py={["18px", "18px", "25px"]}
                                            px={["16px", "16px", "22px"]}
                                            h="initial"
                                            w="full"
                                            bg={activeIndex === index ? "brand.100" : "brand.300"}
                                            color={activeIndex === index ? "white" : "brand.100"}
                                            _hover={{ bg: activeIndex === index ? "brand.100" : "brand.50" }}
                                            justifyContent="space-between"
                                            alignItems="center"
                                            rounded="10px"
                                            border="2px dotted"
                                            borderColor="#0000000A"
                                            minH="100px"
                                        >

                                            <Text
                                                fontSize={["18px", "18px", "20px"]}
                                                fontWeight={400}
                                                lineHeight="25px"
                                                textAlign="left"
                                                flex="1"
                                            >
                                                {faq.question}
                                            </Text>
                                        <VStack
                                            w="50px"
                                            h="50px"
                                            justify="center"
                                            align="center"
                                            cursor="pointer"
                                        >
                                            <Icon
                                                as={ChevronDown}
                                                boxSize={6}
                                                transform={activeIndex === index ? "rotate(180deg)" : "rotate(0deg)"}
                                                transition="transform 0.3s ease"
                                                color={activeIndex === index ? "white" : "brand.100"}
                                            />

                                        </VStack>
                                        </AccordionButton>
                                        <AccordionPanel
                                        p={6}
                                        bg="white"
                                        borderRadius="md"
                                        mt={2}
                                        color="gray.600"
                                        >
                                        <Text fontSize={["16px", "18px"]} lineHeight="1.6">
                                            {faq.answer}
                                        </Text>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}

                            </VStack>

                    </Accordion>


               </SimpleGrid>


            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default Faqs