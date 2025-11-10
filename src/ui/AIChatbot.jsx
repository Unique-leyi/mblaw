import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Avatar,
  Flex,
  Heading,
  Badge,
  Textarea,
  FormControl,
  FormLabel,
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
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  Search,
  MapPin,
  Building2,
  FileText
} from 'lucide-react';
import aiService from '../services/aiService';

const AIChatbot = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hospitalSearchQuery, setHospitalSearchQuery] = useState('');
  const [hospitalSearchResults, setHospitalSearchResults] = useState([]);
  const [isSearchingHospitals, setIsSearchingHospitals] = useState(false);
  const messagesEndRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: 'bot',
        text: "👋 Hello! I'm your Greenshield HMO AI Assistant. I can help you with:\n\n• Finding the right health plan\n• Understanding coverage details\n• Locating hospitals in our network\n• Answering questions about our services\n\nHow can I assist you today?",
        timestamp: new Date(),
        suggestions: [
          "What health plans do you offer?",
          "How do I enroll?",
          "Find hospitals near me",
          "What's covered in your plans?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, hospitalSearchResults]);

  // Reset hospital search when chat closes
  useEffect(() => {
    if (!isOpen) {
      setHospitalSearchQuery('');
      setHospitalSearchResults([]);
      setIsSearchingHospitals(false);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    }
  }, [isOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageToSend = inputMessage; // Store message before clearing

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
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await aiService.processMessage(messageToSend);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.message,
        timestamp: response.timestamp,
        suggestions: response.suggestions,
        hospitals: response.hospitals || null,
        showHospitalSearch: response.showHospitalSearch || false,
        searchQuery: response.searchQuery || '',
        totalHospitals: response.totalHospitals || null
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Initialize hospital search if needed
      if (response.showHospitalSearch) {
        setHospitalSearchQuery(response.searchQuery || '');
        if (response.hospitals && response.hospitals.length > 0) {
          setHospitalSearchResults(response.hospitals);
        } else {
          setHospitalSearchResults([]);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact our support team directly.",
        timestamp: new Date(),
        suggestions: ["Contact support", "Try again"]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleHospitalSearch = async (query) => {
    setIsSearchingHospitals(true);
    
    try {
      // Simulate search delay for better UX
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const results = aiService.searchHospitals(query);
      setHospitalSearchResults(results);
    } catch (error) {
      console.error('Error searching hospitals:', error);
      setHospitalSearchResults([]);
    } finally {
      setIsSearchingHospitals(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "What health plans do you offer?",
    "How do I enroll?",
    "Find hospitals near me",
    "What's covered in your plans?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <Box
        position="fixed"
        bottom={{ base: "40px", md: "80px" }}
        right={{ base: "30px", md: "50px" }}
        zIndex={10000000000} // Higher than navbar
      >
        {!isOpen && (
          <ScaleFade in={!isOpen} initialScale={0.9}>
            <Button
              onClick={() => setIsOpen(true)}
              bg="brand.100"
              color="white"
              size="lg"
              borderRadius="full"
              boxShadow="0 8px 32px rgba(0, 191, 99, 0.4)"
              _hover={{
                bg: "brand.600",
                transform: "scale(1.05)",
                boxShadow: "0 12px 40px rgba(0, 191, 99, 0.5)",
              }}
              transition="all 0.3s ease"
              h={{ base: "60px", md: "70px" }}
              w={{ base: "60px", md: "70px" }}
              position="relative"
              animation="pulse 2s infinite"
              sx={{
                "@keyframes pulse": {
                  "0%, 100%": {
                    boxShadow: "0 8px 32px rgba(0, 191, 99, 0.4)",
                  },
                  "50%": {
                    boxShadow: "0 12px 48px rgba(0, 191, 99, 0.6)",
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
          zIndex={10000000001} // Higher than navbar and chat button
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
                <Bot size={24} color="#00BF63" />
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
                    Greenshield AI
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
                background: "rgba(0, 191, 99, 0.05)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0, 191, 99, 0.3)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(0, 191, 99, 0.5)",
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

                    {/* Hospital Search UI */}
                    {message.showHospitalSearch && (
                      <VStack 
                        spacing={3} 
                        align="stretch" 
                        w="full" 
                        mt={3}
                        p={3}
                        bg="white"
                        borderRadius="12px"
                        border="1px solid"
                        borderColor="brand.100"
                      >
                        <HStack spacing={2} align="center">
                          <Search size={18} color="#00BF63" />
                          <Text fontSize="14px" fontWeight="600" color="gray.700">
                            Search Hospital Network
                          </Text>
                          {message.totalHospitals && (
                            <Badge colorScheme="green" fontSize="10px">
                              {message.totalHospitals} hospitals
                            </Badge>
                          )}
                        </HStack>
                        
                        {/* Search Bar */}
                        <HStack spacing={2}>
                          <Input
                            placeholder="Search by location, hospital name, or plan type..."
                            value={hospitalSearchQuery}
                            onChange={(e) => {
                              const query = e.target.value;
                              setHospitalSearchQuery(query);
                              
                              // Clear previous timeout
                              if (searchTimeoutRef.current) {
                                clearTimeout(searchTimeoutRef.current);
                              }
                              
                              // Debounce search - search after 400ms of no typing
                              if (query.trim().length > 0) {
                                setIsSearchingHospitals(true);
                                searchTimeoutRef.current = setTimeout(() => {
                                  handleHospitalSearch(query);
                                }, 400);
                              } else {
                                // If query is empty, show empty results or initial results if available
                                setHospitalSearchResults([]);
                                setIsSearchingHospitals(false);
                              }
                            }}
                            bg="white"
                            border="1px solid"
                            borderColor="gray.300"
                            fontSize="13px"
                            _focus={{
                              borderColor: "brand.100",
                              boxShadow: "0 0 0 1px #00BF63",
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const currentQuery = e.target.value;
                                setHospitalSearchQuery(currentQuery);
                                if (searchTimeoutRef.current) {
                                  clearTimeout(searchTimeoutRef.current);
                                }
                                handleHospitalSearch(currentQuery);
                              }
                            }}
                          />
                          <IconButton
                            icon={<Search size={18} />}
                            onClick={() => handleHospitalSearch(hospitalSearchQuery)}
                            bg="brand.100"
                            color="white"
                            _hover={{ bg: "brand.600" }}
                            isLoading={isSearchingHospitals}
                            aria-label="Search hospitals"
                          />
                        </HStack>

                        {/* Search Results */}
                        {hospitalSearchResults.length > 0 ? (
                          <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
                            <Text fontSize="12px" color="gray.600" fontWeight="500">
                              Found {hospitalSearchResults.length} result{hospitalSearchResults.length > 1 ? 's' : ''}:
                            </Text>
                            {hospitalSearchResults.map((hospital, idx) => (
                              <Box
                                key={idx}
                                p={3}
                                bg="gray.50"
                                borderRadius="8px"
                                border="1px solid"
                                borderColor="gray.200"
                                _hover={{
                                  borderColor: "brand.100",
                                  bg: "green.50",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(0, 191, 99, 0.15)"
                                }}
                                transition="all 0.2s"
                              >
                                <HStack spacing={2} mb={2}>
                                  <Building2 size={16} color="#00BF63" />
                                  <Text fontSize="14px" fontWeight="600" color="gray.800">
                                    {hospital.provider}
                                  </Text>
                                </HStack>
                                
                                <VStack spacing={1} align="stretch" fontSize="12px">
                                  <HStack spacing={1}>
                                    <MapPin size={12} color="#718096" />
                                    <Text color="gray.600">
                                      {hospital.town}, {hospital.category}
                                    </Text>
                                  </HStack>
                                  
                                  <Text color="gray.600" mt={1} noOfLines={1}>
                                    {hospital.address}
                                  </Text>
                                  
                                  <HStack spacing={1} mt={1}>
                                    <FileText size={12} color="#718096" />
                                    <Text color="gray.600" fontSize="11px">
                                      Plans: {hospital.planType}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        ) : hospitalSearchQuery.trim().length > 0 ? (
                          <Box p={4} textAlign="center">
                            <Text fontSize="13px" color="gray.500">
                              No hospitals found matching "{hospitalSearchQuery}"
                            </Text>
                            <Text fontSize="11px" color="gray.400" mt={1}>
                              Try searching by state, city, or hospital name
                            </Text>
                          </Box>
                        ) : message.hospitals && message.hospitals.length > 0 ? (
                          <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
                            <Text fontSize="12px" color="gray.600" fontWeight="500">
                              Recent results:
                            </Text>
                            {message.hospitals.map((hospital, idx) => (
                              <Box
                                key={idx}
                                p={3}
                                bg="gray.50"
                                borderRadius="8px"
                                border="1px solid"
                                borderColor="gray.200"
                                _hover={{
                                  borderColor: "brand.100",
                                  bg: "green.50",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 12px rgba(0, 191, 99, 0.15)"
                                }}
                                transition="all 0.2s"
                              >
                                <HStack spacing={2} mb={2}>
                                  <Building2 size={16} color="#00BF63" />
                                  <Text fontSize="14px" fontWeight="600" color="gray.800">
                                    {hospital.provider}
                                  </Text>
                                </HStack>
                                
                                <VStack spacing={1} align="stretch" fontSize="12px">
                                  <HStack spacing={1}>
                                    <MapPin size={12} color="#718096" />
                                    <Text color="gray.600">
                                      {hospital.town}, {hospital.category}
                                    </Text>
                                  </HStack>
                                  
                                  <Text color="gray.600" mt={1} noOfLines={1}>
                                    {hospital.address}
                                  </Text>
                                  
                                  <HStack spacing={1} mt={1}>
                                    <FileText size={12} color="#718096" />
                                    <Text color="gray.600" fontSize="11px">
                                      Plans: {hospital.planType}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        ) : (
                          <Box p={4} textAlign="center">
                            <Text fontSize="13px" color="gray.500">
                              Start typing to search our hospital network
                            </Text>
                            <Text fontSize="11px" color="gray.400" mt={2}>
                              Search by: Location (Lagos, Abuja), Hospital name, or Plan type
                            </Text>
                          </Box>
                        )}
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
                color="gray.800"
                fontSize="14px"
                _placeholder={{ color: "gray.500", fontSize: "14px" }}
                _focus={{
                  borderColor: "brand.100",
                  boxShadow: "0 0 0 1px #00BF63",
                }}
                flex={1}
              />
              <IconButton
                icon={<Send size={18} />}
                onClick={handleSendMessage}
                bg="brand.100"
                color="white"
                _hover={{ bg: "brand.600" }}
                isDisabled={!inputMessage.trim()}
                borderRadius="12px"
              />
            </HStack>

            <Text fontSize="10px" color="gray.500" mt={2} textAlign="center">
              Powered by Greenshield AI • Available 24/7
            </Text>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default AIChatbot;
