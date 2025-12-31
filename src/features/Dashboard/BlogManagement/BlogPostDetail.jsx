import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Badge,
  Button,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { FiArrowLeft, FiEdit, FiTrash2 } from "react-icons/fi";
import { useBlogPostById } from "./useBlogPostById";
import { useDeleteBlogPost } from "./useDeleteBlogPost";
import DeleteConfirmationModal from "../../../ui/DeleteConfirmationModal";

function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogPost, isLoading } = useBlogPostById(id);
  const { deleteBlogPost, isDeleting } = useDeleteBlogPost();

  // State for delete modal
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteBlogPost(id);
    navigate("/dashboard/blog-management");
    setDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
  };

  if (isLoading) {
    return (
      <VStack py="40px">
        <Spinner size="lg" color="brand.100" />
      </VStack>
    );
  }

  if (!blogPost) {
    return (
      <VStack py="40px">
        <Text fontSize="16px" color="brand.200">
          Blog post not found.
        </Text>
      </VStack>
    );
  }

  return (
    <VStack w="full" align="start" spacing="16px">
      <HStack w="full" justify="space-between" align="center">
        <IconButton
          icon={<FiArrowLeft />}
          onClick={() => navigate("/dashboard/blog-management")}
          aria-label="Go back"
        />
        <HStack gap="8px">
          <Button
            leftIcon={<FiEdit />}
            onClick={() => navigate(`/dashboard/blog-management/${id}/edit`)}
            isDisabled={isDeleting}
          >
            Edit
          </Button>
          <Button
            leftIcon={<FiTrash2 />}
            colorScheme="red"
            onClick={handleDeleteClick}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </HStack>
      </HStack>

      <VStack w="full" align="start" spacing="20px" bg="white" rounded="16px" p="24px">
        <HStack w="full" justify="space-between" align="start">
          <VStack align="start" spacing="8px" flex={1}>
            <Heading fontSize={["24px", "28px", "32px"]} fontWeight={700} color="brand.100">
              {blogPost.title}
            </Heading>
            <HStack gap="12px" flexWrap="wrap">
              <Badge colorScheme="blue" textTransform="capitalize">
                {blogPost.type}
              </Badge>
              <Badge colorScheme={blogPost.status === "published" ? "green" : "gray"} textTransform="capitalize">
                {blogPost.status}
              </Badge>
              {blogPost.isFeatured && (
                <Badge colorScheme="purple">Featured</Badge>
              )}
            </HStack>
          </VStack>
        </HStack>

        <Box w="full" pt="16px" borderTop="1px solid" borderColor="gray.200">
          <VStack align="start" spacing="12px">
            <HStack>
              <Text fontSize="14px" fontWeight={600} color="brand.100">
                Author:
              </Text>
              <Text fontSize="14px" color="brand.200">
                {blogPost.author}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="14px" fontWeight={600} color="brand.100">
                Published Date:
              </Text>
              <Text fontSize="14px" color="brand.200">
                {blogPost.publishedDate
                  ? new Date(blogPost.publishedDate).toLocaleDateString()
                  : "Not published"}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="14px" fontWeight={600} color="brand.100">
                Read Time:
              </Text>
              <Text fontSize="14px" color="brand.200">
                {blogPost.readTime}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="14px" fontWeight={600} color="brand.100">
                Slug:
              </Text>
              <Text fontSize="14px" color="brand.200" fontFamily="mono">
                {blogPost.slug}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {blogPost.image && (
          <Box w="full" h="400px" rounded="12px" overflow="hidden">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}

        {blogPost.excerpt && (
          <Box>
            <Text fontSize="16px" fontWeight={600} color="brand.100" mb="8px">
              Excerpt:
            </Text>
            <Text fontSize="14px" color="brand.200" lineHeight="1.6">
              {blogPost.excerpt}
            </Text>
          </Box>
        )}

        <Box w="full" pt="16px" borderTop="1px solid" borderColor="gray.200">
          <Text fontSize="16px" fontWeight={600} color="brand.100" mb="12px">
            Content:
          </Text>
          {blogPost.content && (
            <Text
              fontSize="14px"
              color="brand.200"
              lineHeight="1.8"
              whiteSpace="pre-wrap"
              mb="16px"
            >
              {blogPost.content}
            </Text>
          )}

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
            
            return paragraphs && paragraphs.length > 0 && (
              <VStack w="full" align="start" spacing="20px" mt="16px">
                <Text fontSize="16px" fontWeight={600} color="brand.100">
                  Paragraphs:
                </Text>
                {paragraphs.map((paragraph, index) => (
                <Box
                  key={index}
                  w="full"
                  p="16px"
                  border="1px solid"
                  borderColor="gray.200"
                  rounded="8px"
                  bg="gray.50"
                >
                  <VStack w="full" align="start" spacing="12px">
                    {paragraph.title && (
                      <Text fontSize="16px" fontWeight={600} color="brand.100">
                        {paragraph.title}
                      </Text>
                    )}
                    {paragraph.content && (
                      <Text fontSize="14px" color="brand.200" lineHeight="1.6" whiteSpace="pre-wrap">
                        {paragraph.content}
                      </Text>
                    )}
                    {paragraph.image && (
                      <VStack w="full" align="start" gap="8px">
                        <Box w="full" maxH="300px" rounded="8px" overflow="hidden">
                          <img
                            src={paragraph.image}
                            alt={paragraph.imageCaption || paragraph.title || `Image ${index + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                        {paragraph.imageCaption && (
                          <Text fontSize="12px" color="brand.200" fontStyle="italic">
                            {paragraph.imageCaption}
                          </Text>
                        )}
                      </VStack>
                    )}
                  </VStack>
                </Box>
                ))}
              </VStack>
            );
          })()}
        </Box>
      </VStack>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        itemName={blogPost?.title || null}
        isLoading={isDeleting}
      />
    </VStack>
  );
}

export default BlogPostDetail;

