import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  Button,
  Checkbox,
  Spinner,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { FiArrowLeft, FiPlus, FiTrash2, FiZap } from "react-icons/fi";
import { useBlogPostById } from "./useBlogPostById";
import { useCreateBlogPost } from "./useCreateBlogPost";
import { useUpdateBlogPost } from "./useUpdateBlogPost";
import { useGenerateBlogPost } from "./useGenerateBlogPost";
import CtaButton from "../../../ui/CtaButton";

const blogTypes = [
  "Immigration Law",
  "Criminal Law",
  "Real Estate Law",
  "Family Law",
  "Corporate Law",
  "Litigation",
  "Employment Law",
  "Commercial Law",
  "Intellectual Property",
  "Estate Planning",
];

function BlogPostForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogPost, isLoading: isLoadingPost } = isEdit ? useBlogPostById(id) : { blogPost: null, isLoading: false };
  const { createBlogPost, isLoading: isCreating } = useCreateBlogPost();
  const { updateBlogPost, isUpdating } = useUpdateBlogPost();
  const { generate, isLoading: isGenerating } = useGenerateBlogPost();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [aiTopic, setAiTopic] = useState("");
  const [aiPracticeArea, setAiPracticeArea] = useState("");
  const [aiType, setAiType] = useState("outline");
  const [generatedContent, setGeneratedContent] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      author: "",
      image: "",
      type: "",
      publishedDate: "",
      readTime: "5 minute read",
      status: "draft",
      isFeatured: false,
      paragraphs: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "paragraphs",
  });

  useEffect(() => {
    if (isEdit && blogPost) {
      reset({
        title: blogPost.title || "",
        content: blogPost.content || "",
        excerpt: blogPost.excerpt || "",
        author: blogPost.author || "",
        image: blogPost.image || "",
        type: blogPost.type || "",
        publishedDate: blogPost.publishedDate
          ? new Date(blogPost.publishedDate).toISOString().split("T")[0]
          : "",
        readTime: blogPost.readTime || "5 minute read",
        status: blogPost.status || "draft",
        isFeatured: blogPost.isFeatured || false,
        paragraphs: blogPost.paragraphs || [],
      });
    }
  }, [isEdit, blogPost, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateBlogPost(id, data);
    } else {
      createBlogPost(data);
    }
  };

  const handleGenerateBlog = async () => {
    if (!aiTopic.trim()) return;
    
    generate(
      {
        topic: aiTopic.trim(),
        practiceArea: aiPracticeArea || null,
        type: aiType,
      },
      {
        onSuccess: (response) => {
          const data = response;
          if (data?.success && data?.data) {
            setGeneratedContent(data.data);
            if (aiType === "outline" && data.data.title) {
              setValue("title", data.data.title);
              if (data.data.metaDescription) {
                setValue("excerpt", data.data.metaDescription);
              }
            } else if (aiType === "full" && data.data.title) {
              setValue("title", data.data.title);
              if (data.data.metaDescription) {
                setValue("excerpt", data.data.metaDescription);
              }
              if (data.data.paragraphs && Array.isArray(data.data.paragraphs)) {
                // Clear existing paragraphs and add generated ones
                fields.forEach((_, index) => remove(index));
                data.data.paragraphs.forEach((para) => {
                  append({
                    title: para.title || "",
                    content: para.content || "",
                    image: para.image || "",
                    imageCaption: para.imageCaption || "",
                  });
                });
              }
            } else if (aiType === "title" && data.data.titles) {
              // Show titles in modal for selection
              setGeneratedContent({ titles: data.data.titles });
            } else if (aiType === "meta" && data.data.metaDescription) {
              setValue("excerpt", data.data.metaDescription);
              onClose();
            }
          }
        },
      }
    );
  };

  const handleUseGeneratedTitle = (title) => {
    setValue("title", title);
    setGeneratedContent(null);
    onClose();
  };

  if (isEdit && isLoadingPost) {
    return (
      <VStack py="40px">
        <Spinner size="lg" color="brand.100" />
      </VStack>
    );
  }

  return (
    <VStack w="full" align="start" spacing="16px">
      <HStack w="full" justify="space-between" align="center">
        <HStack gap="12px">
          <IconButton
            icon={<FiArrowLeft />}
            onClick={() => navigate("/dashboard/blog-management")}
            aria-label="Go back"
          />
          <VStack align="start" spacing="4px">
            <Heading
              fontSize={["24px", "26px", "30px"]}
              fontWeight={700}
              color="brand.100"
            >
              {isEdit ? "Edit Blog Post" : "Create Blog Post"}
            </Heading>
            <Text fontSize="16px" color="brand.200">
              {isEdit
                ? "Update blog post details and content."
                : "Create a new blog post for the public site."}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Box w="full" bg="white" rounded="16px" p="24px">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <VStack w="full" align="start" spacing="24px">
            <FormControl isInvalid={!!errors.title}>
              <HStack justify="space-between" align="center" mb="8px">
                <FormLabel fontSize="14px" fontWeight={500} color="brand.100" mb={0}>
                  Title *
                </FormLabel>
                <Button
                  type="button"
                  size="xs"
                  leftIcon={<FiZap />}
                  colorScheme="purple"
                  variant="outline"
                  onClick={onOpen}
                  isDisabled={isGenerating}
                >
                  AI Generate
                </Button>
              </HStack>
              <Input
                {...register("title", {
                  required: "Title is required",
                })}
                placeholder="Enter blog post title"
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.author}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Author *
              </FormLabel>
              <Input
                {...register("author", {
                  required: "Author is required",
                })}
                placeholder="Enter author name"
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
              <FormErrorMessage>
                {errors.author && errors.author.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.type}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Type/Category *
              </FormLabel>
              <Select
                {...register("type", {
                  required: "Type is required",
                })}
                placeholder="Select blog type"
                fontSize="14px"
                color="brand.200"
              >
                {blogTypes.map((type) => (
                  <option key={type} value={type} style={{ color: "#121416" }}>
                    {type}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.type && errors.type.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Featured Image URL
              </FormLabel>
              <Input
                {...register("image")}
                type="url"
                placeholder="https://example.com/image.jpg"
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.excerpt}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Excerpt
              </FormLabel>
              <Textarea
                {...register("excerpt")}
                placeholder="Brief summary of the blog post (optional)"
                rows={3}
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.content}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Content *
              </FormLabel>
              <Textarea
                {...register("content", {
                  required: "Content is required",
                })}
                placeholder="Write the full blog post content here..."
                rows={12}
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
              <FormErrorMessage>
                {errors.content && errors.content.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Published Date
              </FormLabel>
              <Input
                {...register("publishedDate")}
                type="date"
                fontSize="14px"
                color="brand.200"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Read Time
              </FormLabel>
              <Input
                {...register("readTime")}
                placeholder="e.g., 5 minute read"
                fontSize="14px"
                color="brand.200"
                _placeholder={{ color: "brand.200" }}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.status}>
              <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                Status *
              </FormLabel>
              <Select
                {...register("status", {
                  required: "Status is required",
                })}
                fontSize="14px"
                color="brand.200"
              >
                <option value="draft" style={{ color: "#121416" }}>
                  Draft
                </option>
                <option value="published" style={{ color: "#121416" }}>
                  Published
                </option>
              </Select>
              <FormErrorMessage>
                {errors.status && errors.status.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <Checkbox
                {...register("isFeatured")}
                colorScheme="blue"
                fontSize="14px"
                color="brand.200"
              >
                Mark as Featured
              </Checkbox>
            </FormControl>

            {/* Paragraphs Section */}
            <Box w="full" pt="16px" borderTop="1px solid" borderColor="gray.200">
              <HStack w="full" justify="space-between" align="center" mb="16px">
                <FormLabel fontSize="16px" fontWeight={600} color="brand.100" mb={0}>
                  Paragraphs
                </FormLabel>
                <Button
                  type="button"
                  size="sm"
                  leftIcon={<FiPlus />}
                  onClick={() => append({ title: "", content: "", image: "", imageCaption: "" })}
                >
                  Add Paragraph
                </Button>
              </HStack>

              {fields.length === 0 && (
                <Text fontSize="14px" color="brand.200" mb="16px">
                  No paragraphs added. Click "Add Paragraph" to add content sections.
                </Text>
              )}

              <VStack w="full" align="start" spacing="20px">
                {fields.map((field, index) => (
                  <Box
                    key={field.id}
                    w="full"
                    p="16px"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="8px"
                    bg="gray.50"
                  >
                    <HStack w="full" justify="space-between" align="center" mb="12px">
                      <Text fontSize="14px" fontWeight={600} color="brand.100">
                        Paragraph {index + 1}
                      </Text>
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => remove(index)}
                        aria-label="Remove paragraph"
                      />
                    </HStack>

                    <VStack w="full" align="start" spacing="12px">
                      <FormControl>
                        <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                          Title
                        </FormLabel>
                        <Input
                          {...register(`paragraphs.${index}.title`)}
                          placeholder="Paragraph title (optional)"
                          fontSize="14px"
                          color="brand.200"
                          _placeholder={{ color: "brand.200" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                          Content
                        </FormLabel>
                        <Textarea
                          {...register(`paragraphs.${index}.content`)}
                          placeholder="Paragraph content..."
                          rows={4}
                          fontSize="14px"
                          color="brand.200"
                          _placeholder={{ color: "brand.200" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                          Image URL
                        </FormLabel>
                        <Input
                          {...register(`paragraphs.${index}.image`)}
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          fontSize="14px"
                          color="brand.200"
                          _placeholder={{ color: "brand.200" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontSize="14px" fontWeight={500} color="brand.100">
                          Image Caption
                        </FormLabel>
                        <Input
                          {...register(`paragraphs.${index}.imageCaption`)}
                          placeholder="Image caption (optional)"
                          fontSize="14px"
                          color="brand.200"
                          _placeholder={{ color: "brand.200" }}
                        />
                      </FormControl>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </Box>

            <HStack w="full" justify="flex-end" gap="12px" pt="8px">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard/blog-management")}
              >
                Cancel
              </Button>
              <CtaButton
                isFull={false}
                isLink={false}
                btnText={isEdit ? "Update Blog Post" : "Create Blog Post"}
                isDisabled={isSubmitting || isCreating || isUpdating}
                isLoading={isSubmitting || isCreating || isUpdating}
                handleClick={handleSubmit(onSubmit)}
              />
            </HStack>
          </VStack>
        </form>
      </Box>

      {/* AI Generation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Blog Post Generator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px" align="stretch">
              <FormControl>
                <FormLabel>Blog Topic *</FormLabel>
                <Input
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g., Understanding Canadian Immigration Law"
                  color="brand.200"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Practice Area (Optional)</FormLabel>
                <Select
                  value={aiPracticeArea}
                  onChange={(e) => setAiPracticeArea(e.target.value)}
                  placeholder="Select practice area"
                  color="brand.200"
                >
                  {blogTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Generation Type</FormLabel>
                <Select
                  value={aiType}
                  onChange={(e) => setAiType(e.target.value)}
                  color="brand.200"
                >
                  <option value="outline">Outline Only</option>
                  <option value="full">Full Blog Post</option>
                  <option value="title">Title Suggestions</option>
                  <option value="meta">Meta Description</option>
                </Select>
              </FormControl>

              {generatedContent?.titles && (
                <Box p="16px" bg="gray.50" rounded="8px">
                  <Text fontSize="14px" fontWeight={600} mb="12px" color="brand.100">
                    Generated Titles:
                  </Text>
                  <VStack align="stretch" spacing="8px">
                    {generatedContent.titles.map((title, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleUseGeneratedTitle(title)}
                        textAlign="left"
                        justifyContent="flex-start"
                      >
                        {title}
                      </Button>
                    ))}
                  </VStack>
                </Box>
              )}

              {generatedContent && !generatedContent.titles && (
                <Box p="16px" bg="green.50" rounded="8px">
                  <Badge colorScheme="green" mb="8px">Generated Successfully!</Badge>
                  <Text fontSize="14px" color="brand.200">
                    Content has been auto-filled in the form. Review and edit as needed.
                  </Text>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="purple"
              onClick={handleGenerateBlog}
              isLoading={isGenerating}
              isDisabled={!aiTopic.trim() || isGenerating}
            >
              Generate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default BlogPostForm;

