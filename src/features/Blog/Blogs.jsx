import React, { useEffect, useRef, useState, useMemo } from "react";
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
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ContainerLayout from "../../ui/layouts/ContainerLayout";
import MiniHeading from "../../ui/MiniHeading";
import Pagination from "../../ui/Pagination";
import { GoClock } from "react-icons/go";
import { usePublishedBlogPosts } from "./usePublishedBlogPosts";
import { Spinner } from "@chakra-ui/react";


function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch published blog posts
  const { blogPosts: allBlogPosts, isLoading } = usePublishedBlogPosts();

  // Get unique blog types for filter
  const blogTypes = useMemo(() => {
    const types = ["All", ...new Set(allBlogPosts.map(blog => blog.type))];
    return types;
  }, [allBlogPosts]);

  // Filter and search blogs
  const filteredBlogs = useMemo(() => {
    let filtered = allBlogPosts;

    // Filter by type
    if (selectedFilter !== "All") {
      filtered = filtered.filter(blog => blog.type === selectedFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        (blog.content && blog.content.toLowerCase().includes(query)) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(query)) ||
        blog.type.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter, allBlogPosts]);

  // Paginate filtered blogs
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBlogs.slice(startIndex, endIndex);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get featured blog post
  const featuredPost = allBlogPosts.find(post => post.isFeatured) || allBlogPosts[0];

  if (isLoading) {
    return (
      <Stack
        w="full"
        justify="center"
        align="center"
        py={["4rem", "4rem", "6rem"]}
        bgColor="white"
      >
        <ContainerLayout>
          <VStack py="40px">
            <Spinner size="lg" color="brand.100" />
          </VStack>
        </ContainerLayout>
      </Stack>
    );
  }

  return (
    <Stack
        w="full"
        justify="start"
        align="start"
        py={["4rem", "4rem", "6rem"]}
        bgColor="white"
    >
        <ContainerLayout>
            <VStack
              w="full"
              justify="center"
              align="center"
              py="20px"
              gap={["20px", "20px", "40px"]}
            >

              <SimpleGrid
                w="full"
                columns={[1, 1, 2]}
                gap="30px"
              >
                <VStack
                  w="full"
                  justify="center"
                  align="center"
                >
                  {featuredPost?.image && (
                    <Image
                      w="full"
                      h={["full", "full", "431px"]}
                      src={featuredPost.image}
                      alt="featured-img-post"
                      objectFit="cover"
                      rounded="20px"
                    />
                  )}

                </VStack>

                <VStack
                  w="full"
                  justify="start"
                  align="start"
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
                  justify="start"
                  align="start"
                  gap="10px"
                >

                    <Heading
                        fontSize={["32px", "36px", "40px"]}
                        fontWeight={700}
                        lineHeight="100%"
                        color="brand.100"
                        letterSpacing="0%"
                    >
                      {featuredPost?.title || "Featured Blog Post"}
                    </Heading>

                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                        {featuredPost?.excerpt || featuredPost?.content?.substring(0, 200) || "No content available"}
                    </Text>

                    {featuredPost && (
                      <Link to={`/blog/post-detail/${encodeURIComponent(featuredPost.slug || featuredPost.title?.toLowerCase())}`}>
                        <Button
                          variant="link"
                          color="brand.100"
                          mt="15px"
                          textTransform="uppercase"
                          textDecoration="underline"
                          _hover={{
                              textDecoration:"none"
                          }}
                        >
                            Read More
                        </Button>
                      </Link>
                    )}
                    
                </VStack>

                </VStack>

              </SimpleGrid>


              <VStack
               w="full"
               justify="start"
               align="start"
               gap="30px"
              >
                  <MiniHeading
                      title="Recent Blogs"
                      titleColor="brand.100"
                  />

                  {/* Search and Filter Section */}
                  <HStack
                    w="full"
                    justify="space-between"
                    align="center"
                    gap="20px"
                    flexWrap="wrap"
                  >
                    {/* Search Input */}
                    <InputGroup
                      maxW={["full", "full", "400px"]}
                      w="full"
                    >
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaSearch} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        rounded="8px"
                        _focus={{
                          borderColor: "brand.100",
                          boxShadow: "0 0 0 1px brand.100"
                        }}
                      />
                    </InputGroup>

                    {/* Filter Dropdown */}
                    <Select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      maxW={["full", "full", "250px"]}
                      w="full"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      rounded="8px"
                      color="brand.200"
                      _focus={{
                        borderColor: "brand.100",
                        boxShadow: "0 0 0 1px brand.100"
                      }}
                    >
                      {blogTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </HStack>

                  {/* Results Count */}
                  {filteredBlogs.length > 0 && (
                    <Text
                      fontSize="16px"
                      fontWeight={400}
                      color="brand.200"
                    >
                      Showing {paginatedBlogs.length} of {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}
                    </Text>
                  )}

                  {/* No Results Message */}
                  {filteredBlogs.length === 0 && (
                    <VStack
                      w="full"
                      py="40px"
                      gap="10px"
                    >
                      <Text
                        fontSize="18px"
                        fontWeight={500}
                        color="brand.200"
                      >
                        No blogs found
                      </Text>
                      <Text
                        fontSize="14px"
                        fontWeight={400}
                        color="gray.500"
                      >
                        Try adjusting your search or filter criteria
                      </Text>
                    </VStack>
                  )}

                  <SimpleGrid
                    w="full"
                    columns={[1, 1, 3]}
                    gap="40px 20px"
                  >
                      {paginatedBlogs.map((post, i) => (
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
                                <Link to={`/blog/post-detail/${encodeURIComponent(post?.slug || post?.title?.toLowerCase())}`}>
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box w="full" py="40px">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </Box>
                  )}

              </VStack>



            </VStack>
        </ContainerLayout>

    </Stack>
  )
}

export default Blogs