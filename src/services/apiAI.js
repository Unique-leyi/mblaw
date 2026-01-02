import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

/**
 * Chat with AI assistant
 * @param {string} message - User's message
 * @param {Array} conversationHistory - Previous conversation messages
 * @returns {Promise<Object>} AI response
 */
export async function chatWithAI(message, conversationHistory = []) {
    try {
        const response = await fetch(`${API_URL}/ai/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                conversationHistory,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        }
        throw {
            status: "OFFLINE",
            data: {
                success: false,
                message: "Network error. Please check your internet connection.",
            },
        };
    }
}

/**
 * Analyze consultation request (admin only)
 * @param {Object} consultationData - Consultation request data
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeConsultation(consultationData) {
    try {
        const response = await fetchWithAuth(`${API_URL}/ai/analyze-consultation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(consultationData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        }
        throw {
            status: "OFFLINE",
            data: {
                success: false,
                message: "Network error. Please check your internet connection.",
            },
        };
    }
}

/**
 * Generate blog post content (admin only)
 * @param {Object} params - Blog generation parameters
 * @param {string} params.topic - Blog post topic
 * @param {string} params.practiceArea - Practice area (optional)
 * @param {string} params.type - Type of content (outline, full, title, meta)
 * @returns {Promise<Object>} Generated blog content
 */
export async function generateBlogPost({ topic, practiceArea = null, type = 'outline' }) {
    try {
        const response = await fetchWithAuth(`${API_URL}/ai/generate-blog-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic,
                practiceArea,
                type,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        }
        throw {
            status: "OFFLINE",
            data: {
                success: false,
                message: "Network error. Please check your internet connection.",
            },
        };
    }
}

/**
 * Summarize document (admin only)
 * @param {Object} params - Document summarization parameters
 * @param {string} params.documentText - The document text to summarize
 * @param {string} params.documentType - Type of document (contract, case, consultation, etc.)
 * @returns {Promise<Object>} Document summary
 */
export async function summarizeDocument({ documentText, documentType = 'general' }) {
    try {
        const response = await fetchWithAuth(`${API_URL}/ai/summarize-document`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                documentText,
                documentType,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        }
        throw {
            status: "OFFLINE",
            data: {
                success: false,
                message: "Network error. Please check your internet connection.",
            },
        };
    }
}

/**
 * Suggest appointment times (admin only)
 * @param {Object} params - Scheduling parameters
 * @param {Array} params.existingAppointments - Array of existing appointments
 * @param {string} params.preferredDate - Preferred date (optional)
 * @param {string} params.preferredTime - Preferred time (optional)
 * @param {string} params.practiceArea - Practice area
 * @param {number} params.duration - Appointment duration in minutes (default 60)
 * @returns {Promise<Object>} Scheduling suggestions
 */
export async function suggestAppointmentTimes({ existingAppointments = [], preferredDate = null, preferredTime = null, practiceArea = null, duration = 60 }) {
    try {
        const response = await fetchWithAuth(`${API_URL}/ai/suggest-appointment-times`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                existingAppointments,
                preferredDate,
                preferredTime,
                practiceArea,
                duration,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                data: data,
            };
        }

        return data;
    } catch (error) {
        if (error.status) {
            throw error;
        }
        throw {
            status: "OFFLINE",
            data: {
                success: false,
                message: "Network error. Please check your internet connection.",
            },
        };
    }
}

