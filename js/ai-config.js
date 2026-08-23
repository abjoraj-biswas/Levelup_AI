/**
 * AI Config - Groq API Integration for LevelUP.AI
 *
 * Add your Groq API key below.
 * Get a FREE key at: https://console.groq.com/keys
 *
 * Available fast models:
 *   - llama-3.1-70b-versatile  (best quality)
 *   - llama3-8b-8192           (fastest)
 *   - mixtral-8x7b-32768       (great balance)
 *   - gemma2-9b-it             (Google Gemma via Groq)
 */
const GROQ_API_KEY = "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";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-70b-versatile"; // Change model here if needed

/**
 * Calls Groq API with user context and returns structured recommendations.
 * @param {Object} userContext - User performance data from AppState
 * @returns {Object} - Structured recommendations JSON
 */
window.getAIRecommendations = async function (userContext) {
    const systemPrompt = `You are an expert AI Learning Coach for a developer upskilling platform called LevelUP.AI.
You analyze student performance data and generate concise, personalized learning recommendations.
IMPORTANT: Always respond ONLY with a valid JSON object. No markdown, no explanation, no extra text whatsoever.`;

    const userPrompt = `Analyze this student profile and generate EXACTLY 3 personalized recommendations:

STUDENT PROFILE:
- Name: ${userContext.name}
- Completed Skills: ${userContext.completedSkills.join(", ") || "None yet"}
- In-Progress Skills: ${userContext.inProgressSkills.join(", ") || "None"}
- Recent Assessments: ${userContext.recentAssessments.map(a => `"${a.title}" (${a.bestScore !== null ? a.bestScore + "% score" : "Not taken"})`).join(", ")}
- Weak Topics (scored below 70%): ${userContext.weakTopics.join(", ") || "None identified"}
- Strongest Assessment: ${userContext.strongestAssessment || "No data yet"}
- Total Learning Hours: ${userContext.learningHours}

Respond with this EXACT JSON format:
{
  "recommended_next": {
    "title": "Specific Topic Name",
    "description": "Personalized 1-2 sentence reason referencing their actual data",
    "action_text": "Start Learning",
    "action_link": "learning.html",
    "icon": "fa-solid fa-rocket"
  },
  "improve_skill": {
    "title": "Specific Weak Topic",
    "description": "Specific feedback referencing their score or weak area",
    "action_text": "Practice Now",
    "action_link": "assessments.html",
    "icon": "fa-solid fa-arrow-trend-up"
  },
  "explore_next": {
    "title": "Next Logical Skill",
    "description": "Why this is the right next step based on their current progress",
    "action_text": "Explore Skill",
    "action_link": "skills.html",
    "icon": "fa-solid fa-compass"
  }
}`;

    const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 800,
            response_format: { type: "json_object" } // Groq supports JSON mode!
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
};

/**
 * Calls Groq for a single AI Coach chat reply.
 * @param {Array}  history     - Array of {role, text} chat history objects
 * @param {string} userMessage - Latest message from user
 * @param {Object} userContext - User context for grounding responses
 * @returns {string} - AI reply text
 */
window.getAIChatReply = async function (history, userMessage, userContext) {
    const systemPrompt = `You are an expert AI Learning Coach on LevelUP.AI — friendly, concise, and encouraging.
Student context:
- Weak areas: ${userContext.weakTopics.join(", ") || "general programming"}
- Recent assessments: ${userContext.recentAssessments.map(a => a.title + (a.bestScore !== null ? " (" + a.bestScore + "%)" : " (not taken)")).join(", ")}
Rules: Keep replies to 2-4 sentences. Be practical and specific. Use emojis sparingly.`;

    const messages = [
        { role: "system", content: systemPrompt },
        ...history.map(h => ({
            role: h.role === "ai" ? "assistant" : "user",
            content: h.text
        })),
        { role: "user", content: userMessage }
    ];

    const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages,
            temperature: 0.8,
            max_tokens: 300
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error?.message || "Groq chat API error");
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I am having trouble responding right now. Please try again!";
};
