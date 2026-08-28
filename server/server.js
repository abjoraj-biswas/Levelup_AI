require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-70b-versatile";

// Endpoint for generating recommendations
app.post('/api/recommendations', async (req, res) => {
    const userContext = req.body;
    
    if (!userContext || !userContext.name) {
        return res.status(400).json({ error: "Missing user context" });
    }

    const systemPrompt = `You are an expert AI Learning Coach for a developer upskilling platform called LevelUP.AI.
You analyze student performance data and generate concise, personalized learning recommendations.
IMPORTANT: Always respond ONLY with a valid JSON object. No markdown, no explanation, no extra text whatsoever.`;

    const userPrompt = `Analyze this student profile and generate EXACTLY 3 personalized recommendations:

STUDENT PROFILE:
- Name: ${userContext.name}
- Completed Skills: ${(userContext.completedSkills || []).join(", ") || "None yet"}
- In-Progress Skills: ${(userContext.inProgressSkills || []).join(", ") || "None"}
- Recent Assessments: ${(userContext.recentAssessments || []).map(a => `"${a.title}" (${a.bestScore !== null ? a.bestScore + "% score" : "Not taken"})`).join(", ")}
- Weak Topics (scored below 70%): ${(userContext.weakTopics || []).join(", ") || "None identified"}
- Strongest Assessment: ${userContext.strongestAssessment || "No data yet"}
- Total Learning Hours: ${userContext.learningHours || 0}

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

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 800,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        const rawText = data.choices?.[0]?.message?.content || "{}";
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const jsonResult = JSON.parse(cleaned);

        res.json(jsonResult);
    } catch (error) {
        console.error("Error generating recommendations:", error);
        res.status(500).json({ error: "Failed to generate recommendations." });
    }
});

// Endpoint for AI Chatbot
app.post('/api/chat', async (req, res) => {
    const { history, userMessage, userContext } = req.body;

    if (!userMessage) {
        return res.status(400).json({ error: "Missing user message" });
    }

    const systemPrompt = `You are an expert AI Learning Coach on LevelUP.AI — friendly, concise, and encouraging.
Student context:
- Weak areas: ${(userContext?.weakTopics || []).join(", ") || "general programming"}
- Recent assessments: ${(userContext?.recentAssessments || []).map(a => a.title + (a.bestScore !== null ? " (" + a.bestScore + "%)" : " (not taken)")).join(", ")}
Rules: Keep replies to 2-4 sentences. Be practical and specific. Use emojis sparingly.
CRITICAL RULE: You are strictly a CODING and PROGRAMMING assistant. You MUST ONLY answer questions related to coding, software engineering, computer science, and technical topics. If a user asks about anything else, you MUST firmly refuse and remind them you only help with coding.`;

    const messages = [
        { role: "system", content: systemPrompt },
        ...(history || []).map(h => ({
            role: h.role === "ai" ? "assistant" : "user",
            content: h.text
        })),
        { role: "user", content: userMessage }
    ];

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages,
                temperature: 0.8,
                max_tokens: 300
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        const reply = data.choices?.[0]?.message?.content || "I am having trouble responding right now. Please try again!";
        res.json({ reply });
    } catch (error) {
        console.error("Error in AI chat:", error);
        res.status(500).json({ error: "Failed to fetch AI reply." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
