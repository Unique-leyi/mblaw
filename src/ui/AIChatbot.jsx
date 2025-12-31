import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Flex,
  Heading,
  Badge,
  useToast,
  Collapse,
  ScaleFade,
  useBreakpointValue,
} from '@chakra-ui/react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Sparkles,
} from 'lucide-react';
import aiService from '../services/aiService';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: 'bot',
        text: "👋 Hello! I'm your MB Law AI Assistant. I can help you with:\n\n• Understanding our practice areas\n• Answering questions about Canadian laws\n• Explaining legal processes and requirements\n• Guiding you to book a consultation\n• Providing general legal information\n\nI have knowledge about Canadian immigration, real estate, corporate, family, and criminal law. How can I assist you today?",
        timestamp: new Date(),
        suggestions: [
          "What practice areas do you cover?",
          "Tell me about Canadian immigration law",
          "How do I book a consultation?",
          "What are Canadian business laws?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const messageToSend = inputMessage.trim();
    const currentMessages = [...messages];

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Build conversation history for context
      const conversationHistory = currentMessages
        .filter(msg => msg.type === 'bot' || msg.type === 'user')
        .map(msg => ({
          type: msg.type,
          text: msg.text,
          content: msg.text
        }));

      const response = await aiService.processMessage(messageToSend, conversationHistory);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.message,
        timestamp: response.timestamp || new Date(),
        suggestions: response.suggestions || [],
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact our support team directly at +1-647-642-2117.",
        timestamp: new Date(),
        suggestions: ["Contact support", "Try again", "Book a consultation"]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    // Small delay to ensure input is set before sending
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "What practice areas do you cover?",
    "Tell me about Canadian immigration law",
    "How do I book a consultation?",
    "What are Canadian business laws?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <Box
        position="fixed"
        bottom={{ base: "40px", md: "80px" }}
        right={{ base: "30px", md: "50px" }}
        zIndex={10000000000}
      >
        {!isOpen && (
          <ScaleFade in={!isOpen} initialScale={0.9}>
            <Button
              onClick={() => setIsOpen(true)}
              bg="brand.100"
              color="white"
              size="lg"
              borderRadius="full"
              boxShadow="0 8px 32px rgba(11, 29, 58, 0.4)"
              _hover={{
                bg: "brand.600",
                transform: "scale(1.05)",
                boxShadow: "0 12px 40px rgba(11, 29, 58, 0.5)",
              }}
              transition="all 0.3s ease"
              h={{ base: "60px", md: "70px" }}
              w={{ base: "60px", md: "70px" }}
              position="relative"
              animation="pulse 2s infinite"
              sx={{
                "@keyframes pulse": {
                  "0%, 100%": {
                    boxShadow: "0 8px 32px rgba(11, 29, 58, 0.4)",
                  },
                  "50%": {
                    boxShadow: "0 12px 48px rgba(11, 29, 58, 0.6)",
                  },
                },
              }}
            >
              <MessageCircle size={28} />
              {/* Notification Badge */}
              <Badge
                position="absolute"
                top="-2px"
                right="-2px"
                bg="red.500"
                color="white"
                borderRadius="full"
                w="20px"
                h="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="10px"
                fontWeight="bold"
              >
                AI
              </Badge>
            </Button>
          </ScaleFade>
        )}
      </Box>

      {/* Chat Window */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          position="fixed"
          bottom={{ base: "20px", md: "30px" }}
          right={{ base: "20px", md: "30px" }}
          w={{ base: "calc(100vw - 40px)", sm: "400px", md: "450px" }}
          h={{ base: "calc(100vh - 40px)", sm: "600px", md: "650px" }}
          maxH="90vh"
          bg="white"
          borderRadius="24px"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)"
          border="1px solid"
          borderColor="brand.100"
          zIndex={10000000001}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* Header */}
          <Flex
            bg="brand.100"
            p={6}
            align="center"
            justify="space-between"
            borderBottom="1px solid"
            borderColor="brand.200"
            position="relative"
          >
            <HStack spacing={3}>
              <Box
                bg="white"
                p={2}
                borderRadius="12px"
                position="relative"
              >
                <Bot size={24} color="#0B1D3A" />
                <Box
                  position="absolute"
                  top="2px"
                  right="2px"
                  w="8px"
                  h="8px"
                  bg="#10B981"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="white"
                />
              </Box>
              <VStack align="start" spacing={0}>
                <HStack spacing={2}>
                  <Heading fontSize="18px" fontWeight="700" color="white">
                    MB Law AI
                  </Heading>
                  <Sparkles size={14} color="#D4AF37" />
                </HStack>
                <Text fontSize="12px" color="rgba(255,255,255,0.8)" fontWeight="500">
                  Always here to help • Instant replies
                </Text>
              </VStack>
            </HStack>

            <IconButton
              icon={<X size={20} />}
              onClick={() => setIsOpen(false)}
              variant="ghost"
              color="white"
              size="sm"
              borderRadius="10px"
              _hover={{ bg: "rgba(255,255,255,0.1)", color: "white" }}
            />
          </Flex>

          {/* Messages Container */}
          <VStack
            flex={1}
            overflowY="auto"
            p={4}
            spacing={4}
            align="stretch"
            css={{
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(11, 29, 58, 0.05)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(11, 29, 58, 0.3)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(11, 29, 58, 0.5)",
              },
            }}
          >
            {messages.map((message) => (
              <Flex
                key={message.id}
                justify={message.type === "user" ? "flex-end" : "flex-start"}
                w="full"
              >
                <HStack
                  spacing={3}
                  maxW="85%"
                  flexDirection={message.type === "user" ? "row-reverse" : "row"}
                >
                  {/* Avatar */}
                  {message.type === "bot" ? (
                    <Box
                      bg="brand.100"
                      p={2}
                      borderRadius="10px"
                      flexShrink={0}
                    >
                      <Bot size={18} color="white" />
                    </Box>
                  ) : (
                    <Box
                      bg="gray.200"
                      p={2}
                      borderRadius="10px"
                      flexShrink={0}
                    >
                      <User size={18} color="gray.600" />
                    </Box>
                  )}

                  {/* Message Bubble */}
                  <VStack
                    align={message.type === "user" ? "flex-end" : "flex-start"}
                    spacing={1}
                  >
                    <Box
                      bg={
                        message.type === "user"
                          ? "brand.100"
                          : "gray.100"
                      }
                      color={message.type === "user" ? "white" : "gray.800"}
                      px={4}
                      py={3}
                      borderRadius="16px"
                      borderBottomRightRadius={message.type === "user" ? "4px" : "16px"}
                      borderBottomLeftRadius={message.type === "user" ? "16px" : "4px"}
                      border="1px solid"
                      borderColor={
                        message.type === "user"
                          ? "transparent"
                          : "gray.200"
                      }
                      whiteSpace="pre-line"
                    >
                      <Text fontSize="14px" fontWeight="500" lineHeight="1.5">
                        {message.text}
                      </Text>
                    </Box>
                    <Text fontSize="10px" color="gray.500" px={2}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <VStack spacing={2} align="stretch" w="full">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            size="sm"
                            variant="outline"
                            fontSize="12px"
                            onClick={() => handleSuggestionClick(suggestion)}
                            _hover={{
                              bg: "brand.100",
                              color: "white",
                              borderColor: "brand.100"
                            }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </VStack>
                    )}
                  </VStack>
                </HStack>
              </Flex>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <Flex justify="flex-start" w="full">
                <HStack spacing={3}>
                  <Box bg="brand.100" p={2} borderRadius="10px">
                    <Bot size={18} color="white" />
                  </Box>
                  <Box
                    bg="gray.100"
                    px={4}
                    py={3}
                    borderRadius="16px"
                    borderBottomLeftRadius="4px"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <HStack spacing={1}>
                      <Box
                        w="8px"
                        h="8px"
                        bg="brand.100"
                        borderRadius="full"
                        animation="bounce 1.4s infinite"
                        sx={{
                          "@keyframes bounce": {
                            "0%, 80%, 100%": { transform: "scale(0)" },
                            "40%": { transform: "scale(1)" },
                          },
                        }}
                      />
                      <Box
                        w="8px"
                        h="8px"
                        bg="brand.100"
                        borderRadius="full"
                        animation="bounce 1.4s infinite 0.2s"
                        sx={{
                          "@keyframes bounce": {
                            "0%, 80%, 100%": { transform: "scale(0)" },
                            "40%": { transform: "scale(1)" },
                          },
                        }}
                      />
                      <Box
                        w="8px"
                        h="8px"
                        bg="brand.100"
                        borderRadius="full"
                        animation="bounce 1.4s infinite 0.4s"
                        sx={{
                          "@keyframes bounce": {
                            "0%, 80%, 100%": { transform: "scale(0)" },
                            "40%": { transform: "scale(1)" },
                          },
                        }}
                      />
                    </HStack>
                  </Box>
                </HStack>
              </Flex>
            )}

            <div ref={messagesEndRef} />
          </VStack>

          {/* Quick Replies */}
          {messages.length <= 2 && !isTyping && (
            <Box px={4} pb={2}>
              <Text fontSize="11px" color="gray.500" mb={2} fontWeight="600">
                Quick options:
              </Text>
              <Flex gap={2} flexWrap="wrap">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSuggestionClick(reply)}
                    size="xs"
                    variant="outline"
                    borderColor="brand.100"
                    color="brand.100"
                    fontSize="11px"
                    borderRadius="full"
                    _hover={{
                      bg: "brand.100",
                      borderColor: "brand.100",
                      color: "white",
                    }}
                  >
                    {reply}
                  </Button>
                ))}
              </Flex>
            </Box>
          )}

          {/* Input Area */}
          <Box
            p={4}
            borderTop="1px solid"
            borderColor="gray.200"
            bg="white"
          >
            <HStack spacing={2}>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                color="brand.200"
                fontSize="14px"
                _placeholder={{ color: "gray.500", fontSize: "14px" }}
                _focus={{
                  borderColor: "brand.100",
                  boxShadow: "0 0 0 1px #0B1D3A",
                }}
                flex={1}
                isDisabled={isTyping}
              />
              <IconButton
                icon={<Send size={18} />}
                onClick={handleSendMessage}
                bg="brand.100"
                color="white"
                _hover={{ bg: "brand.600" }}
                isDisabled={!inputMessage.trim() || isTyping}
                isLoading={isTyping}
                borderRadius="12px"
                aria-label="Send message"
              />
            </HStack>

            <Text fontSize="10px" color="gray.500" mt={2} textAlign="center">
              Powered by MB Law AI • Available 24/7
            </Text>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default AIChatbot;
