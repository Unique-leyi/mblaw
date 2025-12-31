import React from 'react'
import { Stack, VStack, Text, Heading, SimpleGrid, Image, HStack, Icon, Badge, IconButton, Box, Spinner } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContainerLayout from '../../ui/layouts/ContainerLayout'
import MiniHeading from '../../ui/MiniHeading'
import { useBlogPostBySlug } from './useBlogPostBySlug'
import { usePublishedBlogPosts } from './usePublishedBlogPosts'
import { FaArrowLeftLong, FaArrowRightLong, FaFacebookF, FaInstagram } from 'react-icons/fa6'
import { BiLogoGmail } from 'react-icons/bi'
import { GoClock } from 'react-icons/go'

function BlogDetail() {

  const { slug } = useParams();
  const navigate = useNavigate();
  const normalizedSlug = decodeURIComponent(slug || '').trim();
  
  const { blogPost, isLoading } = useBlogPostBySlug(normalizedSlug);
  const { blogPosts } = usePublishedBlogPosts();
  
  // Get related posts (exclude current post, limit to 3)
  const relatedPosts = blogPosts
    .filter(post => post.id !== blogPost?.id && post.status === 'published')
    .slice(0, 3);

  if (isLoading) {
    return (
      <Stack
        w="full"
        justify="center"
        align="center"
        pt={["6rem", "6rem", "8rem"]}
        pb={["2rem", "2rem", "4rem"]}
      >
        <ContainerLayout>
          <VStack py="40px">
            <Spinner size="lg" color="brand.100" />
          </VStack>
        </ContainerLayout>
      </Stack>
    );
  }

  if (!blogPost) {
    return (
      <Stack
        w="full"
        justify="center"
        align="center"
        pt={["6rem", "6rem", "8rem"]}
        pb={["2rem", "2rem", "4rem"]}
      >
        <ContainerLayout>
          <VStack py="40px" gap="20px">
            <Text fontSize="18px" color="brand.200">
              Blog post not found
            </Text>
            <Link to="/blog">
              <Text color="brand.100" textDecoration="underline">
                Back to Blogs
              </Text>
            </Link>
          </VStack>
        </ContainerLayout>
      </Stack>
    );
  }

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
            {blogPost.isFeatured && (
              <Badge
                  textTransform="normal"
                  py="9px"
                  px="20px"
                  bgColor="gray.100"
              >
                  Featured
              </Badge>
            )}

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
                    {blogPost.title}
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
                            {blogPost.author}
                        
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
                        {blogPost.publishedDate 
                          ? new Date(blogPost.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                          : "Not published"}
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
                        {blogPost.readTime || "5 minute read"}
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
                {(() => {
                  // Ensure paragraphs is an array - handle both parsed JSON and string JSON
                  let paragraphs = [];
                  if (blogPost.paragraphs) {
                    if (Array.isArray(blogPost.paragraphs)) {
                      paragraphs = blogPost.paragraphs;
                    } else if (typeof blogPost.paragraphs === 'string') {
                      try {
                        paragraphs = JSON.parse(blogPost.paragraphs);
                      } catch (e) {
                        console.error('Error parsing paragraphs:', e);
                        paragraphs = [];
                      }
                    }
                  }
                  
                  if (paragraphs && paragraphs.length > 0) {
                    return paragraphs.map((paragraph, index) => (
                      <VStack key={index} w={["full", "full", "80%"]} align="start" gap="20px">
                        {paragraph.title && (
                          <Heading
                            fontSize={["24px", "28px", "32px"]}
                            fontWeight={700}
                            color="brand.100"
                            letterSpacing="0%"
                          >
                            {paragraph.title}
                          </Heading>
                        )}

                        {paragraph.content && (
                          <Text
                            fontSize={["16px", "16px", "18px"]}
                            fontWeight={300}
                            lineHeight="28px"
                            color="brand.200"
                            letterSpacing="0%"
                            whiteSpace="pre-wrap"
                          >
                            {paragraph.content}
                          </Text>
                        )}

                        {paragraph.image && (
                          <VStack w="full" align="start" gap="8px">
                            <Image
                              w="full"
                              h="full"
                              src={paragraph.image}
                              alt={paragraph.imageCaption || paragraph.title || `Image ${index + 1}`}
                              objectFit="cover"
                              rounded="20px"
                            />
                            {paragraph.imageCaption && (
                              <Text
                                fontSize="14px"
                                fontWeight={400}
                                color="brand.200"
                                fontStyle="italic"
                                textAlign="center"
                                w="full"
                              >
                                {paragraph.imageCaption}
                              </Text>
                            )}
                          </VStack>
                        )}
                      </VStack>
                    ));
                  } else if (blogPost.content) {
                    return (
                      <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                        w={["full", "full", "80%"]}
                        whiteSpace="pre-wrap"
                      >
                        {blogPost.content}
                      </Text>
                    );
                  }
                  return null;
                })()}

                {(() => {
                  // Show featured image only if no paragraphs with images
                  let paragraphs = [];
                  if (blogPost.paragraphs) {
                    if (Array.isArray(blogPost.paragraphs)) {
                      paragraphs = blogPost.paragraphs;
                    } else if (typeof blogPost.paragraphs === 'string') {
                      try {
                        paragraphs = JSON.parse(blogPost.paragraphs);
                      } catch (e) {
                        paragraphs = [];
                      }
                    }
                  }
                  
                  return blogPost.image && (!paragraphs || paragraphs.length === 0) && (
                    <Image
                      w="full"
                      h="full"
                      src={blogPost.image}
                      alt={blogPost.title}
                      objectFit="cover"
                      rounded="20px"
                    />
                  );
                })()}

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
                {relatedPosts.map((post, i) => (
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
                            {post.image && (
                              <Image
                                  w="full"
                                  h="full"
                                  src={post.image}
                                  alt={`${post.title}-image`}
                                  objectFit="cover"
                              />
                            )}

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
                            <Link to={`/blog/post-detail/${encodeURIComponent(post.slug || post.title?.toLowerCase())}`}>
                              <Heading
                                  fontSize={["20px", "20px", "28px"]}
                                  fontWeight={700}
                                  lineHeight="100%"
                                  letterSpacing="0%"
                                  color="brand.600"
                                  _hover={{
                                    textDecoration: "underline"
                                  }}
                              >
                                  {post.title}
                              </Heading>
                            </Link>

                            <Text
                                fontSize="18px"
                                fontWeight={400}
                                lineHeight="24px"
                                letterSpacing="0%"
                            >
                                {post.excerpt || post.content?.substring(0, 150) || "No content available"}
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
                                    {post.publishedDate 
                                      ? new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                      : "Not published"} 

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
                                        {post.readTime || "5 minute read"}
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

