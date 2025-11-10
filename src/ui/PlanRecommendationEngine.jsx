import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Progress,
  Divider,
  Icon,
  useBreakpointValue,
  Collapse,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Star,
  Users,
  Heart,
  Shield,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { servicesData } from '../data/ServicesData.jsx';
import aiService from '../services/aiService';
import CtaButton from './CtaButton';

const PlanRecommendationEngine = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDetails, setShowDetails] = useState({});
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  const questions = [
    {
      id: 'age',
      question: 'What is your age range?',
      type: 'select',
      options: [
        { value: '18-25', label: '18-25 years', budget: 50000 },
        { value: '26-35', label: '26-35 years', budget: 100000 },
        { value: '36-50', label: '36-50 years', budget: 200000 },
        { value: '51-65', label: '51-65 years', budget: 300000 },
        { value: '65+', label: '65+ years', budget: 400000 }
      ]
    },
    {
      id: 'familySize',
      question: 'How many people will be covered?',
      type: 'select',
      options: [
        { value: 1, label: 'Just me (Individual)', multiplier: 1 },
        { value: 2, label: 'Me + Spouse (Couple)', multiplier: 2 },
        { value: 3, label: 'Me + Spouse + 1 child (Family of 3)', multiplier: 3 },
        { value: 4, label: 'Me + Spouse + 2 children (Family of 4)', multiplier: 4 },
        { value: 5, label: 'Larger family (5+ members)', multiplier: 5 }
      ]
    },
    {
      id: 'budget',
      question: 'What is your annual budget for health insurance?',
      type: 'select',
      options: [
        { value: 50000, label: 'Under ₦100,000', tier: 'bronze' },
        { value: 150000, label: '₦100,000 - ₦200,000', tier: 'silver' },
        { value: 250000, label: '₦200,000 - ₦300,000', tier: 'gold' },
        { value: 400000, label: '₦300,000 - ₦500,000', tier: 'gold-plus' },
        { value: 600000, label: 'Above ₦500,000', tier: 'platinum' }
      ]
    },
    {
      id: 'healthStatus',
      question: 'How would you describe your current health status?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - Rarely get sick', risk: 'low' },
        { value: 'good', label: 'Good - Occasional minor issues', risk: 'low' },
        { value: 'fair', label: 'Fair - Some ongoing conditions', risk: 'medium' },
        { value: 'chronic', label: 'Chronic conditions requiring regular care', risk: 'high' },
        { value: 'high-risk', label: 'High-risk conditions or family history', risk: 'high' }
      ]
    },
    {
      id: 'priorities',
      question: 'What matters most to you in a health plan? (Select all that apply)',
      type: 'multi-select',
      options: [
        { value: 'low-cost', label: 'Low monthly premiums', icon: TrendingUp },
        { value: 'comprehensive', label: 'Comprehensive coverage', icon: Shield },
        { value: 'family-friendly', label: 'Family coverage benefits', icon: Users },
        { value: 'preventive', label: 'Preventive care focus', icon: Heart },
        { value: 'emergency', label: 'Emergency coverage', icon: Zap },
        { value: 'specialist', label: 'Specialist access', icon: Target }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setUserProfile(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Last question - analyze and generate recommendations
      analyzeAndRecommend({ ...userProfile, [questionId]: answer });
    }
  };

  const analyzeAndRecommend = async (profile) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await aiService.analyzeUserResponses(profile);
      setRecommendations(result);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetRecommendation = () => {
    setCurrentStep(0);
    setUserProfile({});
    setRecommendations(null);
    setShowDetails({});
  };

  const toggleDetails = (planTitle) => {
    setShowDetails(prev => ({
      ...prev,
      [planTitle]: !prev[planTitle]
    }));
  };

  const getProgressPercentage = () => {
    return ((currentStep + 1) / questions.length) * 100;
  };

  const renderQuestion = () => {
    const question = questions[currentStep];
    
    return (
      <VStack spacing={6} align="stretch">
        <VStack spacing={4} align="center">
          <Heading fontSize={[24, 28, 32]} textAlign="center" color="brand.700">
            {question.question}
          </Heading>
          <Text fontSize={[16, 18]} textAlign="center" color="brand.500" maxW="600px">
            Step {currentStep + 1} of {questions.length}
          </Text>
          <Progress 
            value={getProgressPercentage()} 
            w="300px" 
            colorScheme="green" 
            size="sm" 
            borderRadius="10px"
          />
        </VStack>

        <SimpleGrid columns={[1, 1, 2]} spacing={4} maxW="800px" mx="auto">
          {question.options.map((option, index) => (
            <Card
              key={index}
              cursor="pointer"
              _hover={{
                borderColor: "brand.100",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 191, 99, 0.15)"
              }}
              transition="all 0.3s ease"
              onClick={() => handleAnswer(question.id, option.value)}
            >
              <CardBody p={4}>
                <HStack spacing={3}>
                  {option.icon && (
                    <Icon as={option.icon} color="brand.100" boxSize={6} />
                  )}
                  <VStack align="start" spacing={1}>
                    <Text fontWeight={600} fontSize="16px">
                      {option.label}
                    </Text>
                    {option.budget && (
                      <Text fontSize="14px" color="brand.500">
                        Budget: ₦{option.budget.toLocaleString()}/year
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    );
  };

  const renderRecommendations = () => {
    if (!recommendations) return null;

    return (
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} align="center">
          <Heading fontSize={[24, 28, 32]} textAlign="center" color="brand.700">
            Your Personalized Recommendations
          </Heading>
          <Text fontSize={[16, 18]} textAlign="center" color="brand.500" maxW="600px">
            Based on your profile, here are the best health plans for you
          </Text>
        </VStack>

        {/* Reasoning */}
        {recommendations.reasoning && recommendations.reasoning.length > 0 && (
          <Alert status="info" borderRadius="12px">
            <AlertIcon />
            <Box>
              <AlertTitle>Why these plans?</AlertTitle>
              <AlertDescription>
                {recommendations.reasoning.join(' ')}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Recommended Plans */}
        <SimpleGrid columns={[1, 1, 2]} spacing={6}>
          {recommendations.recommendations.map((plan, index) => (
            <Card
              key={plan.title}
              border={index === 0 ? "2px solid" : "1px solid"}
              borderColor={index === 0 ? "brand.100" : "gray.200"}
              position="relative"
            >
              {index === 0 && (
                <Badge
                  position="absolute"
                  top="-10px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="brand.100"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="20px"
                  fontSize="12px"
                  fontWeight={600}
                >
                  <Icon as={Star} mr={1} />
                  RECOMMENDED
                </Badge>
              )}
              
              <CardHeader pb={2}>
                <VStack align="start" spacing={2}>
                  <Heading fontSize="20px" color="brand.700">
                    {plan.title}
                  </Heading>
                  <Text fontSize="14px" color="brand.500">
                    {plan.content}
                  </Text>
                </VStack>
              </CardHeader>

              <CardBody pt={0}>
                <VStack spacing={4} align="stretch">
                  {/* Pricing */}
                  <Box
                    bg="brand.300"
                    p={3}
                    borderRadius="8px"
                    textAlign="center"
                  >
                    <Text fontSize="12px" color="brand.600" fontWeight={600}>
                      ANNUAL PREMIUM
                    </Text>
                    <Text fontSize="18px" fontWeight={700} color="brand.700">
                      {plan.annualPremium.individual}
                    </Text>
                    <Text fontSize="14px" color="brand.600">
                      Individual • {plan.annualPremium.family} Family
                    </Text>
                  </Box>

                  {/* Key Benefits */}
                  <VStack align="start" spacing={2}>
                    <Text fontSize="14px" fontWeight={600} color="brand.700">
                      Key Benefits:
                    </Text>
                    {plan.briefBenefits.map((benefit, idx) => (
                      <HStack key={idx} spacing={2}>
                        <Icon as={CheckCircle} color="brand.100" boxSize={4} />
                        <Text fontSize="13px" color="brand.600">
                          {benefit}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  {/* Detailed Benefits Toggle */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleDetails(plan.title)}
                    rightIcon={showDetails[plan.title] ? <ChevronUp /> : <ChevronDown />}
                    fontSize="12px"
                    color="brand.100"
                  >
                    {showDetails[plan.title] ? 'Hide' : 'Show'} Full Benefits
                  </Button>

                  <Collapse in={showDetails[plan.title]}>
                    <VStack align="start" spacing={2} p={3} bg="gray.50" borderRadius="8px">
                      <Text fontSize="13px" fontWeight={600} color="brand.700">
                        Complete Coverage:
                      </Text>
                      {plan.benefits.slice(0, 10).map((benefit, idx) => (
                        <HStack key={idx} spacing={2}>
                          <Icon as={CheckCircle} color="brand.100" boxSize={3} />
                          <Text fontSize="12px" color="brand.600">
                            {benefit}
                          </Text>
                        </HStack>
                      ))}
                      {plan.benefits.length > 10 && (
                        <Text fontSize="11px" color="brand.500" fontStyle="italic">
                          +{plan.benefits.length - 10} more benefits
                        </Text>
                      )}
                    </VStack>
                  </Collapse>

                  {/* Action Buttons */}
                  <VStack spacing={2}>
                    <CtaButton
                      isLink={true}
                      btnText="View Full Details"
                      isOutline={false}
                      url={`/plans/plan-detail/${plan.title.toLowerCase().replace(/\s+/g, '-')}`}
                      isFull={true}
                    />
                    <CtaButton
                      isLink={true}
                      btnText="Get Quote"
                      isOutline={true}
                      url="/contact-us"
                      isFull={true}
                    />
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Additional Options */}
        <Box textAlign="center" pt={4}>
          <Text fontSize="14px" color="brand.500" mb={4}>
            Want to see all available plans?
          </Text>
          <HStack spacing={4} justify="center">
            <CtaButton
              isLink={true}
              btnText="View All Plans"
              isOutline={false}
              url="/plans"
            />
            <Button
              variant="ghost"
              onClick={resetRecommendation}
              fontSize="14px"
              color="brand.100"
            >
              Start Over
            </Button>
          </HStack>
        </Box>
      </VStack>
    );
  };

  const renderAnalyzing = () => {
    return (
      <VStack spacing={6} align="center" py={12}>
        <VStack spacing={4}>
          <Box
            w="80px"
            h="80px"
            borderRadius="50%"
            bg="brand.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="pulse 2s infinite"
          >
            <Icon as={Target} color="white" boxSize={8} />
          </Box>
          <Heading fontSize={[24, 28]} textAlign="center" color="brand.700">
            Analyzing Your Profile...
          </Heading>
          <Text fontSize={[16, 18]} textAlign="center" color="brand.500" maxW="500px">
            Our AI is processing your responses to find the perfect health plan for your needs
          </Text>
        </VStack>
        
        <VStack spacing={3} w="300px">
          <Progress 
            value={100} 
            w="full" 
            colorScheme="green" 
            size="sm" 
            borderRadius="10px"
            isIndeterminate
          />
          <Text fontSize="14px" color="brand.500">
            This may take a few moments...
          </Text>
        </VStack>
      </VStack>
    );
  };

  return (
    <Box w="full" py={8}>
      {isAnalyzing ? (
        renderAnalyzing()
      ) : recommendations ? (
        renderRecommendations()
      ) : (
        renderQuestion()
      )}
    </Box>
  );
};

export default PlanRecommendationEngine;
