/**
 * Recommendations Logic - Dynamic AI Learning Coach
 * Powered by Gemini AI
 */

let _recUserContext = null;
let _chatHistory = [];

document.addEventListener("AppDataLoaded", () => {
    initRecommendations();
});

// ─── Build User Context from AppState ──────────────────────────────────────
function buildUserContext() {
    const user = AppState.getUser() || {};
    const assessments = AppState.getAssessments() || [];
    const skills = AppState.getSkills() || [];

    const completedSkills = skills.filter(s => s.progress >= 100).map(s => s.name);
    const inProgressSkills = skills.filter(s => s.progress > 0 && s.progress < 100).map(s => s.name);

    const takenAssessments = assessments.filter(a => a.bestScore !== null && a.bestScore !== undefined);
    const weakTopics = takenAssessments.filter(a => a.bestScore < 70).map(a => a.title);
    const strongestAssessment = takenAssessments.length
        ? takenAssessments.reduce((best, a) => (!best || a.bestScore > best.bestScore ? a : best), null)?.title
        : null;

    return {
        name: user.name || "Student",
        learningHours: user.learningHours || 0,
        completedSkills,
        inProgressSkills,
        recentAssessments: assessments.slice(0, 6).map(a => ({ title: a.title, bestScore: a.bestScore ?? null })),
        weakTopics,
        strongestAssessment
    };
}

// ─── Skeleton Loader HTML ──────────────────────────────────────────────────
function getSkeletonHTML() {
    return Array(3).fill(0).map(() => `
        <div class="glass-card rec-card skeleton-card" style="padding: 30px; display: flex; flex-direction: column; gap: 16px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <div class="skeleton-box" style="width:28px; height:28px; border-radius:50%;"></div>
                <div class="skeleton-box" style="width:140px; height:16px; border-radius:6px;"></div>
            </div>
            <div class="skeleton-box" style="width:80%; height:28px; border-radius:6px;"></div>
            <div style="display:flex; flex-direction:column; gap:8px; flex:1;">
                <div class="skeleton-box" style="width:100%; height:14px; border-radius:4px;"></div>
                <div class="skeleton-box" style="width:90%; height:14px; border-radius:4px;"></div>
                <div class="skeleton-box" style="width:75%; height:14px; border-radius:4px;"></div>
            </div>
            <div class="skeleton-box" style="width:100%; height:44px; border-radius:10px;"></div>
        </div>
    `).join("");
}

// ─── Render Cards ─────────────────────────────────────────────────────────
function renderRecommendations(data) {
    const cards = [
        {
            key: "recommended_next",
            color: "var(--primary)",
            badge: "Recommended Next",
            gradient: "rgba(0,240,255,0.08)",
            borderColor: "rgba(0,240,255,0.3)"
        },
        {
            key: "improve_skill",
            color: "var(--warning)",
            badge: "Improve This Skill",
            gradient: "rgba(255,184,0,0.08)",
            borderColor: "rgba(255,184,0,0.3)"
        },
        {
            key: "explore_next",
            color: "var(--secondary)",
            badge: "Explore Next",
            gradient: "rgba(112,0,255,0.08)",
            borderColor: "rgba(112,0,255,0.3)"
        }
    ];

    return cards.map(c => {
        const rec = data[c.key];
        if (!rec) return "";
        return `
            <div class="glass-card rec-card" style="
                padding: 30px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                background: linear-gradient(135deg, ${c.gradient}, var(--bg-card));
                border: 1px solid ${c.borderColor};
                border-radius: var(--border-radius-md);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            " onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.4)'"
               onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='none'">

                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="${rec.icon || "fa-solid fa-star"}" style="color:${c.color}; font-size:1.4rem;"></i>
                    <span style="
                        color: ${c.color};
                        font-size: 0.8rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        background: rgba(255,255,255,0.05);
                        padding: 4px 12px;
                        border-radius: 20px;
                        border: 1px solid ${c.borderColor};
                    ">${c.badge}</span>
                </div>

                <h2 style="font-size: 1.4rem; line-height: 1.3; margin: 0;">${rec.title}</h2>

                <p class="text-secondary" style="flex: 1; line-height: 1.7; margin: 0; font-size: 0.95rem;">
                    <i class="fa-solid fa-quote-left" style="opacity:0.3; margin-right:4px;"></i>
                    ${rec.description}
                    <i class="fa-solid fa-quote-right" style="opacity:0.3; margin-left:4px;"></i>
                </p>

                <button style="
                    width: 100%;
                    padding: 12px 20px;
                    border-radius: 10px;
                    border: 1px solid ${c.borderColor};
                    background: ${c.gradient};
                    color: ${c.color};
                    font-weight: 600;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                "
                onmouseenter="this.style.background='${c.color}'; this.style.color='#000'; this.style.borderColor='${c.color}';"
                onmouseleave="this.style.background='${c.gradient}'; this.style.color='${c.color}'; this.style.borderColor='${c.borderColor}';"
                onclick="window.location.href='${rec.action_link}'">
                    <i class="${rec.icon || "fa-solid fa-arrow-right"}"></i>
                    ${rec.action_text}
                </button>
            </div>
        `;
    }).join("");
}

// ─── Error State ──────────────────────────────────────────────────────────
function renderError(msg) {
    return `
        <div class="glass-card" style="grid-column: 1/-1; padding: 50px; text-align: center;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--warning); margin-bottom: 20px; display:block;"></i>
            <h3 style="margin-bottom: 12px;">Could Not Load AI Recommendations</h3>
            <p class="text-secondary" style="margin-bottom: 24px; max-width: 500px; margin-inline: auto;">${msg}</p>
            <button class="btn-primary" onclick="initRecommendations()" style="margin-inline: auto;">
                <i class="fa-solid fa-rotate-right"></i> Try Again
            </button>
        </div>
    `;
}

// ─── Fallback Recommendations (no API key) ────────────────────────────────
function getFallbackRecommendations(ctx) {
    const weak = ctx.weakTopics[0] || "Data Structures & Algorithms";
    const next = ctx.inProgressSkills[0] || "Full-Stack JavaScript";
    return {
        recommended_next: {
            title: next,
            description: `Based on your ${ctx.learningHours} learning hours, continuing with ${next} is the best next step to build momentum and complete your roadmap.`,
            action_text: "Start Learning",
            action_link: "learning.html",
            icon: "fa-solid fa-rocket"
        },
        improve_skill: {
            title: weak,
            description: `Your recent performance in ${weak} indicates room for improvement. Focused practice sessions will significantly boost your assessment scores.`,
            action_text: "Practice Now",
            action_link: "assessments.html",
            icon: "fa-solid fa-arrow-trend-up"
        },
        explore_next: {
            title: "Cloud Architecture (AWS)",
            description: "You've built a solid programming foundation. Learning cloud deployment will make your projects production-ready and dramatically increase your market value.",
            action_text: "Explore Skill",
            action_link: "skills.html",
            icon: "fa-solid fa-compass"
        }
    };
}

// ─── Main Init ────────────────────────────────────────────────────────────
async function initRecommendations() {
    const grid = document.getElementById("recommendationsGrid");
    if (!grid) return;

    _recUserContext = buildUserContext();

    // Show skeleton loader
    grid.innerHTML = getSkeletonHTML();

    const hasApiKey = typeof GROQ_API_KEY !== "undefined" && GROQ_API_KEY && GROQ_API_KEY !== "YOUR_GROQ_API_KEY_HERE";

    try {
        let data;
        if (hasApiKey) {
            data = await getAIRecommendations(_recUserContext);
        } else {
            // Graceful fallback with simulated delay
            await new Promise(r => setTimeout(r, 1200));
            data = getFallbackRecommendations(_recUserContext);
        }

        grid.innerHTML = renderRecommendations(data);

        // Animate cards in
        grid.querySelectorAll(".rec-card").forEach((card, i) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(24px)";
            setTimeout(() => {
                card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, i * 150);
        });

    } catch (err) {
        console.error("AI Recommendations error:", err);
        // On API key error, show fallback silently
        if (err.message?.includes("API_KEY") || err.message?.includes("key") || !hasApiKey) {
            const data = getFallbackRecommendations(_recUserContext);
            grid.innerHTML = renderRecommendations(data);
        } else {
            grid.innerHTML = renderError(err.message || "An unexpected error occurred.");
        }
    }

    // Init chat drawer with context
    initChatDrawer();
}

// ─── AI Coach Chat Drawer ────────────────────────────────────────────────
function initChatDrawer() {
    const drawer = document.getElementById("aiCoachDrawer");
    const drawerMessages = document.getElementById("drawerMessages");
    if (!drawer || !drawerMessages) return;

    _chatHistory = [];

    // Welcome message
    appendChatMessage("ai", `👋 Hi ${_recUserContext?.name || "there"}! I'm your AI Learning Coach. Ask me anything about your weak topics, study plans, or concepts you'd like to understand better!`);
}

window.toggleAICoachDrawer = function() {
    const drawer = document.getElementById("aiCoachDrawer");
    const overlay = document.getElementById("drawerOverlay");
    if (!drawer) return;
    const isOpen = drawer.classList.contains("open");
    drawer.classList.toggle("open", !isOpen);
    overlay.classList.toggle("open", !isOpen);
    if (!isOpen) {
        setTimeout(() => document.getElementById("drawerInput")?.focus(), 300);
    }
};

window.closeAICoachDrawer = function() {
    document.getElementById("aiCoachDrawer")?.classList.remove("open");
    document.getElementById("drawerOverlay")?.classList.remove("open");
};

window.handleDrawerKey = function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendDrawerMessage();
    }
};

window.sendDrawerMessage = async function() {
    const input = document.getElementById("drawerInput");
    const text = input?.value?.trim();
    if (!text) return;

    input.value = "";
    appendChatMessage("user", text);

    // Show typing indicator
    const typingId = "typing_" + Date.now();
    appendChatMessage("ai", '<span class="typing-dots"><span></span><span></span><span></span></span>', typingId);

    try {
        const reply = await getAIChatReply(_chatHistory.slice(0, -1), text, _recUserContext || { name: "Student", weakTopics: [], recentAssessments: [] });
        document.getElementById(typingId)?.remove();
        appendChatMessage("ai", reply);
    } catch (err) {
        document.getElementById(typingId)?.remove();
        appendChatMessage("ai", "⚠️ I'm having trouble connecting right now. Please check your API key or try again shortly.");
    }
};

function appendChatMessage(role, text, id) {
    const container = document.getElementById("drawerMessages");
    if (!container) return;

    const msgEl = document.createElement("div");
    msgEl.className = `drawer-msg ${role}`;
    if (id) msgEl.id = id;
    msgEl.innerHTML = text;

    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;

    if (role !== "ai" || !id) {
        _chatHistory.push({ role, text });
    }
}
