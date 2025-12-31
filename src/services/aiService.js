import { chatWithAI } from "./apiAI";
import { practiceAreaData } from "../data/PracticeAreaData";
import { faqsData } from "../data/FaqsData";

/**
 * Process user message and return AI response
 * @param {string} message - User's message
 * @param {Array} conversationHistory - Previous conversation messages
 * @returns {Promise<Object>} Response object with message, suggestions, etc.
 */
async function processMessage(message, conversationHistory = []) {
    try {
        // Call backend AI service
        const response = await chatWithAI(message, conversationHistory);

        if (response.success && response.data) {
            // Generate suggestions based on the response
            const suggestions = generateSuggestions(message, response.data.response);

            return {
                message: response.data.response,
                timestamp: new Date(),
                suggestions,
                tokensUsed: response.data.tokensUsed,
                processingTime: response.data.processingTime,
            };
        }

        throw new Error(response.message || "Failed to get AI response");
    } catch (error) {
        console.error("AI Service Error:", error);

        // Fallback response
        return {
            message: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact our support team directly at +1-647-642-2117.",
            timestamp: new Date(),
            suggestions: [
                "Contact support",
                "Book a consultation",
                "Learn about our practice areas",
                "Try again"
            ],
        };
    }
}

/**
 * Generate contextual suggestions based on user message and AI response
 * @param {string} userMessage - User's message
 * @param {string} aiResponse - AI's response
 * @returns {Array<string>} Array of suggestion strings
 */
function generateSuggestions(userMessage, aiResponse) {
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();

    const suggestions = [];

    // Practice area related
    if (lowerMessage.includes("immigration") || lowerResponse.includes("immigration")) {
        suggestions.push("Learn more about Immigration Law");
        suggestions.push("Book an immigration consultation");
    } else if (lowerMessage.includes("real estate") || lowerResponse.includes("real estate")) {
        suggestions.push("Learn more about Real Estate Law");
        suggestions.push("Book a real estate consultation");
    } else if (lowerMessage.includes("corporate") || lowerResponse.includes("corporate")) {
        suggestions.push("Learn more about Corporate Law");
        suggestions.push("Book a corporate consultation");
    } else if (lowerMessage.includes("family") || lowerResponse.includes("family")) {
        suggestions.push("Learn more about Family Law");
        suggestions.push("Book a family law consultation");
    } else if (lowerMessage.includes("criminal") || lowerResponse.includes("criminal")) {
        suggestions.push("Learn more about Criminal Law");
        suggestions.push("Book a criminal law consultation");
    } else if (lowerMessage.includes("litigation") || lowerResponse.includes("litigation")) {
        suggestions.push("Learn more about Litigation");
        suggestions.push("Book a litigation consultation");
    }

    // Action related
    if (lowerMessage.includes("consultation") || lowerMessage.includes("book") || lowerMessage.includes("appointment")) {
        suggestions.push("View our practice areas");
        suggestions.push("Contact us directly");
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email")) {
        suggestions.push("Book a consultation");
        suggestions.push("View our practice areas");
    } else {
        // Default suggestions
        if (!suggestions.length) {
            suggestions.push("Book a consultation");
            suggestions.push("View our practice areas");
            suggestions.push("Contact us");
        }
    }

    // Always add "Learn more" if not already present
    if (!suggestions.some(s => s.toLowerCase().includes("learn more"))) {
        suggestions.push("Learn more about our services");
    }

    return suggestions.slice(0, 4); // Limit to 4 suggestions
}

/**
 * Get practice area information
 * @param {string} practiceAreaName - Name of the practice area
 * @returns {Object|null} Practice area data or null
 */
function getPracticeAreaInfo(practiceAreaName) {
    return practiceAreaData.find(
        area => area.title.toLowerCase().includes(practiceAreaName.toLowerCase()) ||
            practiceAreaName.toLowerCase().includes(area.title.toLowerCase())
    ) || null;
}

/**
 * Get FAQ answer
 * @param {string} question - User's question
 * @returns {Object|null} FAQ data or null
 */
function getFAQAnswer(question) {
    const lowerQuestion = question.toLowerCase();

    return faqsData.find(faq =>
        lowerQuestion.includes(faq.question.toLowerCase().substring(0, 20)) ||
        faq.question.toLowerCase().includes(lowerQuestion.substring(0, 20))
    ) || null;
}

const aiService = {
    processMessage,
    generateSuggestions,
    getPracticeAreaInfo,
    getFAQAnswer,
};

export default aiService;

