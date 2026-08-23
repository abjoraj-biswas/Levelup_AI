/**
 * AI Config - Backend Proxy Integration for LevelUP.AI
 */
const API_BASE_URL = "http://localhost:3000/api";

/**
 * Calls Backend API with user context and returns structured recommendations.
 * @param {Object} userContext - User performance data from AppState
 * @returns {Object} - Structured recommendations JSON
 */
window.getAIRecommendations = async function (userContext) {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userContext)
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || `API error: ${response.status}`);
    }

    return await response.json();
};

/**
 * Calls Backend API for a single AI Coach chat reply.
 * @param {Array}  history     - Array of {role, text} chat history objects
 * @param {string} userMessage - Latest message from user
 * @param {Object} userContext - User context for grounding responses
 * @returns {string} - AI reply text
 */
window.getAIChatReply = async function (history, userMessage, userContext) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            history,
            userMessage,
            userContext
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error || "Chat API error");
    }

    const data = await response.json();
    return data.reply || "I am having trouble responding right now. Please try again!";
};
