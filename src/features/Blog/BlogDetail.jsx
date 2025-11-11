import React from 'react'
import { Stack, VStack, Text, Heading, SimpleGrid, Image, HStack, Icon, Badge, IconButton, Box } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContainerLayout from '../../ui/layouts/ContainerLayout'
import MiniHeading from '../../ui/MiniHeading'
import { practiceAreaData } from '../../data/PracticeAreaData'
import { FaArrowLeftLong, FaArrowRightLong, FaFacebookF, FaInstagram } from 'react-icons/fa6'
import { BiLogoGmail } from 'react-icons/bi'
import { blogData } from '../../data/BlogData'
import { GoClock } from 'react-icons/go'

function BlogDetail() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const normalizedSlug = decodeURIComponent(slug || '').toLowerCase().trim();

//   const filteredPracticeAreaDetail = practiceAreaData.find(detail => {
//     if (!detail?.title) return false;
//     const normalizedTitle = detail.title.toLowerCase().trim();
//     return normalizedTitle === normalizedSlug;
//   });

//   console.log(filteredPracticeAreaDetail)

  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      pt={["6rem", "6rem", "8rem"]}
      pb={["2rem", "2rem", "4rem"]}
    >
      <ContainerLayout>
        <VStack
          w="full"
          justify="start"
          align="start"
          py="40px"
          gap="30px"
        >
          <HStack
            w="fit-content"
            justify="start"
            align="center"
            gap="10px"
            p="10px"
            bgColor="white"
            color="brand.100"
            cursor="pointer"
            onClick={() => navigate(-1)}
          >
            <Icon as={FaArrowLeftLong} fontSize="20px"/>

            <Text
              fontSize="18px"
              fontWeight={600}
              lineHeight="100%"
              letterSpacing="0%"
              textTransform="uppercase"
            >
              Go Back
            </Text>

          </HStack>





        <VStack
            w={["full", "full", "70%"]}
            mx={["initial", "initial", "auto"]}
            justify="center"
            align="center"
            gap="20px"
        >
            <Badge
                textTransform="normal"
                py="9px"
                px="20px"
                bgColor="gray.100"
            >
                Featured
            </Badge>

            <VStack
                w="full"
                justify="center"
                align="center"
                gap="40px"
            >

                <Heading
                    fontSize={["40px", "48px", "60px"]}
                    fontWeight={700}
                    lineHeight="100%"
                    color="brand.100"
                    letterSpacing="0%"
                    textAlign="center"
                >
                    Your Rights, Your Voice: Understanding Client Empowerment in Modern Law
                </Heading>

                <HStack
                  w="fit-content"
                  justify="space-between"
                  align="center"
                  wrap={["wrap", "wrap", "nowrap"]}
                  gap="20px"
                >
                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                       By
                        <Text
                            as="span"
                            mx="2px"
                            fontSize={["16px", "16px", "18px"]}
                            fontWeight={400}
                            lineHeight="28px"
                            color="brand.200"
                            letterSpacing="0%"
                            textTransform="uppercase"
                        >
                            Josiah Jones
                        
                        </Text>
                    </Text>


                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                        /
                    </Text>


                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={400}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                        textTransform="uppercase"
                    > 
                        2 July, 2025
                    </Text>


                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={400}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                        /
                    </Text>

                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={400}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                        textTransform="uppercase"
                    >
                        2 mins read
                    </Text>

                </HStack>

                
            </VStack>

        </VStack>


          


          {/* Paragraphs */}

          <VStack
            w="full"
            justify="center"
            align="center"
            gap="40px"
          >

                <Text
                    fontSize={["16px", "16px", "18px"]}
                    fontWeight={300}
                    lineHeight="28px"
                    color="brand.200"
                    letterSpacing="0%"
                    w={["full", "full", "80%"]}
                >
                    <Text
                      as="span"
                      fontSize={["30px", "36px", "70px"]}
                      fontWeight={400}
                      lineHeight="28px"
                      color="brand.200"
                      letterSpacing="0%"
                    >
                        A
                    </Text>t MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs. At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.
                   
                </Text>


                <Image
                  w="full"
                  h="full"
                  src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762862017/MbLaw/3c463cf194a999a059330bebb75323363cdeb0b7_t2ltdm.jpg"
                  alt="post-detail-img-1"
                  objectFit="cover"
                  rounded="20px"
                />



                <Text
                    fontSize={["16px", "16px", "18px"]}
                    fontWeight={300}
                    lineHeight="28px"
                    color="brand.200"
                    letterSpacing="0%"
                    w={["full", "full", "80%"]}
                >
                    At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs. At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.
                   
                </Text>


                <Image
                  w="full"
                  h="full"
                  src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762862069/MbLaw/77b9dadf9241f2b1bb7603e47fcf5132bdc608f1_ug3yv8.jpg"
                  alt="post-detail-img-2"
                  objectFit="cover"
                  rounded="20px"
                />

                <Text
                    fontSize={["16px", "16px", "18px"]}
                    fontWeight={300}
                    lineHeight="28px"
                    color="brand.200"
                    letterSpacing="0%"
                    w={["full", "full", "80%"]}
                >
                    At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs. At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.At MB Law, we are more than a law firm — we are a team of dedicated legal professionals committed to excellence, integrity, and innovation. For years, we have provided individuals, families, and businesses with practical legal solutions tailored to their unique needs.
                   
                </Text>

          </VStack>

          <VStack
            mx="auto"
            justify="center"
            align="center"
            gap="20px"
            mt="30px"
          >
                
                <Text                    
                    fontSize={["18px", "18px", "20px"]}
                    fontWeight={300}
                    lineHeight="100%"
                    color="brand.200"
                    letterSpacing="0%"
                    textAlign="center"
                >
                    Share Article: 
                </Text>

                <HStack
                  justify="center"
                  align="center"
                  gap="15px"
                >
                    <Link to="/">
                        <IconButton
                          icon={<Icon as={FaFacebookF}/>}
                          bgColor="transparent"
                          border="1px solid"
                          borderColor="brand.100"
                          rounded="full"
                          py="20px"
                          px="10px"
                        />   
                    </Link>

                    <Link to="/">
                        <IconButton
                          icon={<Icon as={FaInstagram}/>}
                          bgColor="transparent"
                          border="1px solid"
                          borderColor="brand.100"
                          rounded="full"
                          py="20px"
                          px="10px"
                        />   
                    </Link>

                    <Link to="/">
                        <IconButton
                          icon={<Icon as={BiLogoGmail}/>}
                          bgColor="transparent"
                          border="1px solid"
                          borderColor="brand.100"
                          rounded="full"
                          py="20px"
                          px="10px"
                        />   
                    </Link>

                </HStack>
          </VStack>

        </VStack>


        <VStack
            w="full"
            justify="center"
            align="center"
            py="20px"
            gap={["20px", "20px", "40px"]}
        >

            <MiniHeading
                title="More Like These"
                titleColor="brand.100"
                btnText="See More"
                url="/blogs"
            />


            <SimpleGrid
                w="full"
                columns={[1, 1, 3]}
                gap="20px"
            >
                {blogData.slice(0, 3).map((post, i) => (
                    <VStack
                        key={i}
                        w="full"
                        h={["full", "full", "538.84px"]}
                        justify="center"
                        align="center"
                        position="relative"
                        overflow="hidden"
                        gap="30px"
                    >
                        <VStack
                            w="full"
                            h={["full", "full", "335.79px"]}
                            justify="center"
                            align="center"
                            roundedTop="20px"
                            overflow="hidden"
                        >
                            <Image
                                w="full"
                                h="full"
                                src={post.image}
                                alt={`${post.title}-image`}
                                objectFit="cover"
                            />

                        </VStack>

                        <Text
                            fontSize="20px"
                            fontWeight={400}
                            color="white"
                            py="8.65px"
                            px="10.81px"
                            bgColor="#FFFFFF33"
                            position="absolute"
                            left="4%"
                            top="2%"
                            backdropFilter="blur(12.97px)"
                            zIndex={3}
                        >
                            {post.type}
                        </Text>

                        <VStack
                            w="full"
                            justify="start"
                            align="start"
                            gap="20px"
                        >
                            <Heading
                                fontSize={["20px", "20px", "28px"]}
                                fontWeight={700}
                                lineHeight="100%"
                                letterSpacing="0%"
                                color="brand.600"
                            >
                                {post.title}
                            </Heading>

                            <Text
                                fontSize="18px"
                                fontWeight={400}
                                lineHeight="24px"
                                letterSpacing="0%"
                            >
                                {post.content}
                            </Text>

                            <HStack
                                w="full"
                                justify="start"
                                align="center"
                                gap="20px"
                            >
                                <Text
                                    fontSize="18px"
                                    fontWeight={400}
                                    lineHeight="24px"
                                    letterSpacing="0%"
                                    color="#121416CF"
                                >
                                    {post.dateOfPost} 

                                </Text>

                                    <Box
                                        as="span"
                                        mx="2px"
                                        w="8%"
                                        h="1px"
                                        bgColor="gray.400"
                                    />

                                <HStack>
                                    <Icon as={GoClock} color="#121416CF"/>
                                    <Text
                                        fontSize="18px"
                                        fontWeight={400}
                                        lineHeight="24px"
                                        letterSpacing="0%"
                                        color="#121416CF"
                                    >
                                        {post.time}
                                    </Text>
                                </HStack>

                            </HStack>


                        </VStack>

                    </VStack>
                ))}

            </SimpleGrid>


        </VStack>

      </ContainerLayout>
    </Stack>
  )
}

export default BlogDetail

