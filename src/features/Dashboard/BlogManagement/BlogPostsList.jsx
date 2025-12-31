import React, { useState, useMemo } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Icon,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useBlogPosts } from "./useBlogPosts";
import { useDeleteBlogPost } from "./useDeleteBlogPost";
import { FiEye, FiTrash2, FiEdit, FiSearch, FiBook, FiCheckCircle, FiFileText } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";
import CtaButton from "../../../ui/CtaButton";
import DeleteConfirmationModal from "../../../ui/DeleteConfirmationModal";

function BlogPostsList() {
  const navigate = useNavigate();
  const { blogPosts: allBlogPosts, isLoading, refetch } = useBlogPosts();
  const { deleteBlogPost, isDeleting } = useDeleteBlogPost();

  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, itemName: null });

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = allBlogPosts?.length || 0;
    const published = allBlogPosts?.filter((p) => p.status === "published").length || 0;
    const draft = allBlogPosts?.filter((p) => p.status === "draft").length || 0;

    return { total, published, draft };
  }, [allBlogPosts]);

  // Filter and search blog posts
  const filteredBlogPosts = useMemo(() => {
    let filtered = allBlogPosts || [];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((post) => post.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((post) => post.type === typeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(query) ||
          post.author?.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allBlogPosts, statusFilter, typeFilter, searchQuery]);

  // Paginate blog posts
  const paginatedBlogPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBlogPosts.slice(startIndex, endIndex);
  }, [filteredBlogPosts, currentPage]);

  const totalPages = Math.ceil(filteredBlogPosts.length / itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, searchQuery]);

  const handleView = (id) => {
    navigate(`/dashboard/blog-management/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/blog-management/${id}/edit`);
  };

  const handleDeleteClick = (id, blogPost) => {
    const itemName = blogPost.title || "Blog Post";
    setDeleteModal({ isOpen: true, id, itemName });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.id) {
      await deleteBlogPost(deleteModal.id);
      refetch();
      setDeleteModal({ isOpen: false, id: null, itemName: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, id: null, itemName: null });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "published":
        return "green";
      case "draft":
        return "gray";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Get first image from paragraphs or use main image
  const getPostImage = (post) => {
    if (post.image) return post.image;
    if (post.paragraphs && Array.isArray(post.paragraphs)) {
      const paragraphWithImage = post.paragraphs.find((p) => p.image);
      return paragraphWithImage?.image || null;
    }
    return null;
  };

  return (
    <VStack w="full" align="start" gap="30px">
      {/* Header */}
      <HStack w="full" justify="space-between" align="start">
        <VStack align="start" gap="8px" flex="1">
          <Heading
            fontSize={["28px", "32px", "36px"]}
            fontWeight={700}
            color="brand.100"
            lineHeight="40px"
          >
            Blog Management
          </Heading>
          <Text fontSize="16px" color="brand.200" fontWeight={400}>
            Create, edit, and manage blog posts and articles.
          </Text>
        </VStack>
        <CtaButton
          isFull={false}
          isLink={false}
          btnText="Create Blog Post"
          handleClick={() => navigate("/dashboard/blog-management/create")}
          leftIcon={FiEdit}
        />
      </HStack>

      {/* Metrics Cards - 3 Columns */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="20px" w="full">
        <Box
          bg="white"
          rounded="16px"
          p="24px"
          border="1px solid"
          borderColor="#E5E7EB"
          _hover={{
            boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start" mb="16px">
            <VStack align="start" gap="4px" flex="1">
              <Text fontSize="14px" color="brand.200" fontWeight={400} lineHeight="20px">
                Total Blog Posts
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="brand.100" lineHeight="40px">
                {metrics.total}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, brand.100, brand.600)" p="12px" rounded="12px" color="white">
              <Icon as={FiBook} boxSize="24px" />
            </Box>
          </HStack>
        </Box>

        <Box
          bg="white"
          rounded="16px"
          p="24px"
          border="1px solid"
          borderColor="#E5E7EB"
          _hover={{
            boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start" mb="16px">
            <VStack align="start" gap="4px" flex="1">
              <Text fontSize="14px" color="brand.200" fontWeight={400} lineHeight="20px">
                Published Posts
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#10B981" lineHeight="40px">
                {metrics.published}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #10B981, #059669)" p="12px" rounded="12px" color="white">
              <Icon as={FiCheckCircle} boxSize="24px" />
            </Box>
          </HStack>
        </Box>

        <Box
          bg="white"
          rounded="16px"
          p="24px"
          border="1px solid"
          borderColor="#E5E7EB"
          _hover={{
            boxShadow: "0 4px 12px rgba(11, 29, 58, 0.1)",
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
          transition="all 0.2s"
        >
          <HStack justify="space-between" align="start" mb="16px">
            <VStack align="start" gap="4px" flex="1">
              <Text fontSize="14px" color="brand.200" fontWeight={400} lineHeight="20px">
                Draft Posts
              </Text>
              <Heading fontSize={["28px", "32px", "36px"]} fontWeight={700} color="#6B7280" lineHeight="40px">
                {metrics.draft}
              </Heading>
            </VStack>
            <Box bgGradient="linear(to-br, #6B7280, #4B5563)" p="12px" rounded="12px" color="white">
              <Icon as={FiFileText} boxSize="24px" />
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Search and Filter Section */}
      <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="16px" w="full">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="brand.200" />
            </InputLeftElement>
            <Input
              placeholder="Search by title, author, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
              border="1px solid"
              borderColor="#E5E7EB"
              color="brand.200"
              fontSize="16px"
              _placeholder={{
                color: "brand.200",
                fontSize: "14px",
              }}
              _focus={{
                borderColor: "brand.100",
                boxShadow: "0 0 0 1px brand.100",
              }}
            />
          </InputGroup>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            bg="white"
            border="1px solid"
            borderColor="#E5E7EB"
            color="brand.200"
            fontSize="16px"
            _focus={{
              borderColor: "brand.100",
              boxShadow: "0 0 0 1px brand.100",
            }}
          >
            <option value="all" style={{ color: "#121416" }}>All Statuses</option>
            <option value="published" style={{ color: "#121416" }}>Published</option>
            <option value="draft" style={{ color: "#121416" }}>Draft</option>
          </Select>

          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            bg="white"
            border="1px solid"
            borderColor="#E5E7EB"
            color="brand.200"
            fontSize="16px"
            _focus={{
              borderColor: "brand.100",
              boxShadow: "0 0 0 1px brand.100",
            }}
          >
            <option value="all" style={{ color: "#121416" }}>All Types</option>
            <option value="article" style={{ color: "#121416" }}>Article</option>
            <option value="news" style={{ color: "#121416" }}>News</option>
            <option value="case-study" style={{ color: "#121416" }}>Case Study</option>
            <option value="guide" style={{ color: "#121416" }}>Guide</option>
          </Select>
        </SimpleGrid>

        {/* Results count */}
        <Text fontSize="14px" color="brand.200" mt="16px">
          Showing {paginatedBlogPosts.length} of {filteredBlogPosts.length} blog posts
        </Text>
      </Box>

      {/* Blog Posts Cards */}
      {isLoading ? (
        <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
          <VStack py="60px">
            <Spinner size="xl" color="brand.100" thickness="4px" />
            <Text color="brand.200" fontSize="16px" mt="20px">
              Loading blog posts...
            </Text>
          </VStack>
        </Box>
      ) : paginatedBlogPosts.length === 0 ? (
        <Box w="full" bg="white" rounded="16px" p="24px" border="1px solid" borderColor="#E5E7EB">
          <VStack py="60px">
            <Text fontSize="16px" color="brand.200" textAlign="center">
              {filteredBlogPosts.length === 0 && allBlogPosts?.length > 0
                ? "No blog posts match your search criteria."
                : "No blog posts yet."}
            </Text>
          </VStack>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="24px" w="full">
            {paginatedBlogPosts.map((post) => {
              const postImage = getPostImage(post);
              return (
                <Box
                  key={post.id}
                  bg="white"
                  rounded="16px"
                  border="1px solid"
                  borderColor="#E5E7EB"
                  overflow="hidden"
                  _hover={{
                    boxShadow: "0 8px 24px rgba(11, 29, 58, 0.12)",
                    transform: "translateY(-4px)",
                    transition: "all 0.3s",
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => handleView(post.id)}
                >
                  {/* Image */}
                  {postImage && (
                    <Box w="full" h="200px" overflow="hidden" bg="brand.800">
                      <Image
                        src={postImage}
                        alt={post.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                        _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
                      />
                    </Box>
                  )}

                  {/* Content */}
                  <VStack align="start" p="20px" gap="12px" w="full">
                    {/* Header with badges */}
                    <HStack w="full" justify="space-between" align="start">
                      <VStack align="start" gap="4px" flex="1">
                        <HStack gap="8px" flexWrap="wrap">
                          <Badge
                            colorScheme={getStatusColor(post.status)}
                            textTransform="capitalize"
                            fontSize="11px"
                            px="10px"
                            py="4px"
                            rounded="6px"
                            fontWeight={500}
                          >
                            {post.status || "draft"}
                          </Badge>
                          {post.isFeatured && (
                            <Badge colorScheme="blue" fontSize="11px" px="10px" py="4px" rounded="6px" fontWeight={500}>
                              Featured
                            </Badge>
                          )}
                          {post.type && (
                            <Badge
                              variant="outline"
                              colorScheme="gray"
                              fontSize="11px"
                              px="10px"
                              py="4px"
                              rounded="6px"
                              fontWeight={500}
                            >
                              {post.type}
                            </Badge>
                          )}
                        </HStack>
                      </VStack>
                    </HStack>

                    {/* Title */}
                    <Heading
                      fontSize="18px"
                      fontWeight={600}
                      color="brand.100"
                      lineHeight="24px"
                      noOfLines={2}
                      _hover={{ color: "brand.600" }}
                    >
                      {post.title}
                    </Heading>

                    {/* Author and Date */}
                    <HStack w="full" justify="space-between" align="center" fontSize="13px" color="brand.200">
                      <Text>By {post.author || "Admin"}</Text>
                      <Text>{formatDate(post.publishedDate || post.createdAt)}</Text>
                    </HStack>

                    {/* Read Time */}
                    {post.readTime && (
                      <Text fontSize="12px" color="brand.400">
                        {post.readTime} min read
                      </Text>
                    )}

                    {/* Actions */}
                    <HStack
                      w="full"
                      justify="flex-end"
                      gap="8px"
                      pt="8px"
                      borderTop="1px solid"
                      borderColor="#E5E7EB"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconButton
                        icon={<FiEye />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(post.id)}
                        aria-label="View blog post"
                        isDisabled={isDeleting}
                        color="brand.100"
                        _hover={{ bg: "brand.100", color: "white" }}
                      />
                      <IconButton
                        icon={<FiEdit />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(post.id)}
                        aria-label="Edit blog post"
                        isDisabled={isDeleting}
                        color="brand.100"
                        _hover={{ bg: "brand.100", color: "white" }}
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteClick(post.id, post)}
                        isLoading={isDeleting}
                        isDisabled={isDeleting}
                        aria-label="Delete blog post"
                        _hover={{ bg: "red.500", color: "white" }}
                      />
                    </HStack>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box mt="24px" w="full">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Box>
          )}
          </>
        )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        itemName={deleteModal.itemName}
        isLoading={isDeleting}
      />
    </VStack>
  );
}

export default BlogPostsList;
