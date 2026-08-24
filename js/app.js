/**
 * Global App State and Mock Data
 */

// Mock Data
// Initialize State
async function initApp() {
    if (window.db) {
        try {
            // Wait for all major data points concurrently
            const [skillsRes, compRes, projRes, roadmapRes, assessRes, mockRes] = await Promise.all([
                window.db.from('skills').select('*').order('id'),
                window.db.from('companies').select('*').order('id'),
                window.db.from('projects').select('*').order('id'),
                window.db.from('roadmap_items').select('*'),
                window.db.from('assessments').select('*').order('id'),
                window.db.from('mockInterviews').select('*').order('id')
            ]);
            
            // Check auth state for profile
            let userProfile = null;
            if (window.Auth) {
                const currentUser = await window.Auth.getUser();
                if (currentUser) {
                    // Fetch their specific profile
                    const { data: profile } = await window.db.from('profiles').select('*').eq('id', currentUser.id).single();
                    if (profile) userProfile = profile;
                }
            }

            // Sync with local storage / MOCK_DATA
            // (Skills are now mapped and fetched via fetchDynamicData below)
            if (compRes.data && compRes.data.length > 0) MOCK_DATA.companies = compRes.data;
            // Removed bugHunts overwrite from projects table as bug hunts use bug_bounties
            
            if (roadmapRes.data && roadmapRes.data.length > 0) {
                const cc = {};
                roadmapRes.data.forEach(item => {
                    if(!cc[item.skill_id]) cc[item.skill_id] = [];
                    cc[item.skill_id].push(item);
                });
                if (cc["s1"]) localStorage.setItem('levelup_course_js', JSON.stringify(cc["s1"]));
            }

            if (assessRes.data && assessRes.data.length > 0) localStorage.setItem('levelup_assessments', JSON.stringify(assessRes.data));
            if (mockRes.data && mockRes.data.length > 0) localStorage.setItem('levelup_mock_interviews', JSON.stringify(mockRes.data));
            // Removed: Let fetchDynamicData handle the profile merging correctly so it doesn't overwrite local fields (college, branch, dob)

        } catch(e) {
            console.error("Failed to load live data from Supabase", e);
        }
    }

    // Fallbacks if data missing (e.g. user not logged in or fetch failed)
    if (!localStorage.getItem('levelup_user')) {
        localStorage.setItem('levelup_user', JSON.stringify(MOCK_DATA.user));
    }
    
    // Force overwrite local cache with clean mock data (only 5 skills) so old cached extra skills are deleted
    localStorage.setItem('levelup_skills', JSON.stringify(MOCK_DATA.skills));
    
    // Force reset notifications for the new update
    localStorage.setItem('levelup_notifications', JSON.stringify(MOCK_DATA.notifications));

    // Also save the entire new course content payload to localStorage
    localStorage.setItem('levelup_courseContent', JSON.stringify(MOCK_DATA.courseContent));
    if (!localStorage.getItem('levelup_user_bugs')) {
        localStorage.setItem('levelup_user_bugs', JSON.stringify(MOCK_DATA.userBugs));
    }
    if (!localStorage.getItem('levelup_career_profile')) {
        localStorage.setItem('levelup_career_profile', JSON.stringify(MOCK_DATA.careerProfile));
    }
    
    // Force overwrite local cache with clean mock data so old cached extra assessments are deleted
    localStorage.setItem('levelup_assessments', JSON.stringify(MOCK_DATA.assessments));
    if (!localStorage.getItem('levelup_mock_interviews')) {
        localStorage.setItem('levelup_mock_interviews', JSON.stringify(MOCK_DATA.mockInterviews));
    }
    if (!localStorage.getItem('levelup_interview_history')) {
        localStorage.setItem('levelup_interview_history', JSON.stringify(MOCK_DATA.interviewHistory));
    }
    if (!localStorage.getItem('levelup_applications')) {
        localStorage.setItem('levelup_applications', JSON.stringify(MOCK_DATA.applications));
    }
    if (!localStorage.getItem('levelup_daily_tasks')) {
        localStorage.setItem('levelup_daily_tasks', JSON.stringify(MOCK_DATA.dailyTasks));
    }

    if (!localStorage.getItem('levelup_interview_readiness')) {
        localStorage.setItem('levelup_interview_readiness', JSON.stringify(MOCK_DATA.interviewReadiness));
    }
    if (!localStorage.getItem('levelup_interview_goal')) {
        localStorage.setItem('levelup_interview_goal', JSON.stringify(MOCK_DATA.interviewGoal));
    }

    // Setup global UI components
    setupModals();
    setupAIChat();
    updateGlobalUI();
    setupThemeToggle();

    // Inject Lucide script for icons
    if (!document.getElementById('lucide-script')) {
        const script = document.createElement('script');
        script.id = 'lucide-script';
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => { if(window.lucide) lucide.createIcons(); };
        document.body.appendChild(script);
    } else if(window.lucide) {
        lucide.createIcons();
    }
    
    // Fetch Dynamic Data from Supabase if available
    if (window.supabase) {
        // Trigger UI IMMEDIATELY with local/mock data to eliminate latency
        document.dispatchEvent(new Event('AppDataLoaded'));
        
        // Fetch fresh data in the background and re-render
        fetchDynamicData().then(() => {
            document.dispatchEvent(new Event('AppDataLoaded'));
        }).catch(err => {
            console.error("Supabase fetch failed:", err);
        });
    } else {
        // Trigger UI scripts to render with mock data
        document.dispatchEvent(new Event('AppDataLoaded'));
    }
}

// Supabase Data Fetching
async function fetchDynamicData() {
    try {
        const supabase = window.db;
        if(!supabase) throw new Error("Supabase client not initialized");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        // 1. Fetch Skills 
        const { data: skills, error: skillsErr } = await supabase.from('skills').select('*');
        if (!skillsErr && skills && skills.length > 0) {
            const dynamicSkills = skills.map((s) => ({
                id: s.id,
                name: s.name || s.title || "Unknown Skill",
                category: s.category || s.industry || "General",
                difficulty: s.difficulty || "Beginner",
                subSkills: s.subSkills || s.sub_skills || 5, 
                lectures: s.lectures || 10,
                hours: s.hours || s.duration_hours || 0,
                progress: s.progress || 0,
                icon: s.icon || s.image_url || "fa-solid fa-code",
                desc: s.desc || s.description || ""
            }));
            localStorage.setItem('levelup_skills', JSON.stringify(dynamicSkills));
        }

        // 2. Fetch Companies 
        const { data: companies, error: compErr } = await supabase.from('companies').select('*');
        if (!compErr && companies && companies.length > 0) {
            const dynamicCompanies = companies.map(c => {
                let iconClass = c.logo || "fa-solid fa-building";
                if (!c.logo) {
                    const lowerName = (c.name || "").toLowerCase();
                    if (lowerName.includes("microsoft")) iconClass = "fa-brands fa-microsoft";
                    else if (lowerName.includes("google")) iconClass = "fa-brands fa-google";
                    else if (lowerName.includes("apple")) iconClass = "fa-brands fa-apple";
                    else if (lowerName.includes("amazon")) iconClass = "fa-brands fa-aws";
                    else if (lowerName.includes("meta") || lowerName.includes("facebook")) iconClass = "fa-brands fa-meta";
                    else if (lowerName.includes("linkedin")) iconClass = "fa-brands fa-linkedin";
                    else if (lowerName.includes("tata") || lowerName.includes("tcs")) iconClass = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3x-Xihii0MqNDSL0ASS7ZUp36dmpawKSZJHryuYQT6Q&s=10";
                }
                return {
                    id: c.id,
                    name: c.name,
                    category: c.category,
                    type: c.type || "Enterprise",
                    logo: iconClass,
                    description: c.description,
                    culture: c.culture,
                    benefits: c.benefits || [],
                    roles: c.roles || ["Software Engineer", "Data Scientist", "Cloud Architect"],
                    skills: c.skills || ["React", "Python", "AWS", "SQL"]
                };
            });
            localStorage.setItem('levelup_companies', JSON.stringify(dynamicCompanies));
        }

        // 3. Fetch Bug Bounties (mapped to 'projects' in SQL)
        const { data: bugs, error: bugsErr } = await supabase.from('projects').select('*');
        if (!bugsErr && bugs && bugs.length > 0) {
            const dynamicBugs = bugs.map(b => ({
                id: b.id,
                title: b.title,
                company: b.company || "Unknown Company",
                rewardPool: b.rewardPool || "₹0",
                difficulty: b.difficulty || "Medium",
                category: b.category || "Security",
                timeRemaining: b.timeRemaining || "Active",
                bugsFound: b.bugsFound || 0,
                status: b.status || "Active"
            }));
            localStorage.setItem('levelup_bugHunts', JSON.stringify(dynamicBugs));
        }
        
        // 4. Fetch Auth Profile
        if (session && session.user) {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            if (profile) {
                const userState = AppState.getUser() || MOCK_DATA.user;
                userState.name = profile.name || userState.name || 'User';
                userState.email = profile.email || userState.email || 'user@example.com';
                userState.learningHours = profile.learning_hours ?? userState.learningHours ?? 0;
                userState.streak = profile.streak ?? userState.streak ?? 0;
                userState.completedSkills = profile.completed_skills ?? userState.completedSkills ?? 0;
                userState.totalSkillsLearning = profile.total_skills_learning ?? userState.totalSkillsLearning ?? 0;
                localStorage.setItem('levelup_user', JSON.stringify(userState));
            }
        }
        
        // Ensure UI updates if state changed
        updateGlobalUI();
        
    } catch (e) {
        console.error("Error in fetchDynamicData:", e);
    }
}

// State Accessors
const AppState = {
    getCourseContent: () => JSON.parse(localStorage.getItem('levelup_courseContent')) || MOCK_DATA.courseContent,
    getUser: () => JSON.parse(localStorage.getItem('levelup_user')),
    setUser: (user) => {
        localStorage.setItem('levelup_user', JSON.stringify(user));
        if (window.db && user.id) {
            window.db.from('profiles')
                .update(user)
                .eq('id', user.id)
                .then(({error}) => { if (error) console.error("Failed to update profile", error) });
        }
    },
    
    getSkills: () => JSON.parse(localStorage.getItem('levelup_skills')),
    updateSkillProgress: (skillId, progress) => {
        const skills = AppState.getSkills();
        const skill = skills.find(s => s.id === skillId);
        if(skill) {
            skill.progress = progress;
            localStorage.setItem('levelup_skills', JSON.stringify(skills));
            
            if (window.db) {
                window.db.from('skills')
                    .update({ progress: progress })
                    .eq('id', skillId)
                    .then(({error}) => { if (error) console.error("Failed to update skill progress", error) });
            }
        }
    },
    
    getNotifications: () => JSON.parse(localStorage.getItem('levelup_notifications')),
    markNotificationRead: (id) => {
        const notifs = AppState.getNotifications();
        const notif = notifs.find(n => n.id === id);
        if(notif) notif.read = true;
        localStorage.setItem('levelup_notifications', JSON.stringify(notifs));
        updateGlobalUI();
    },
    markAllNotificationsRead: () => {
        const notifs = AppState.getNotifications();
        notifs.forEach(n => n.read = true);
        localStorage.setItem('levelup_notifications', JSON.stringify(notifs));
        updateGlobalUI();
    },
    
    
    // Assessments & Interviews
    getAssessments: () => JSON.parse(localStorage.getItem('levelup_assessments')),
    updateAssessment: (id, updates) => {
        const items = AppState.getAssessments();
        const item = items.find(i => i.id === id);
        if(item) { 
            Object.assign(item, updates); 
            localStorage.setItem('levelup_assessments', JSON.stringify(items)); 
            
            if (window.db) {
                window.db.from('assessments')
                    .update(updates)
                    .eq('id', id)
                    .then(({error}) => { if (error) console.error("Failed to update assessment", error) });
            }
        }
    },
    getMockInterviews: () => JSON.parse(localStorage.getItem('levelup_mock_interviews')),
    updateMockInterview: (miId, updates) => {
        const mis = AppState.getMockInterviews();
        const index = mis.findIndex(m => m.id === miId);
        if(index !== -1) {
            mis[index] = { ...mis[index], ...updates };
            localStorage.setItem('levelup_mock_interviews', JSON.stringify(mis));
            
            if (window.db) {
                window.db.from('mockInterviews')
                    .update(updates)
                    .eq('id', miId)
                    .then(({error}) => { if (error) console.error("Failed to update mock interview", error) });
            }
        }
    },
    
    getInterviewHistory: () => JSON.parse(localStorage.getItem('levelup_interview_history')),
    addInterviewHistory: (historyObj) => {
        const history = AppState.getInterviewHistory() || [];
        history.unshift(historyObj); // Add to front
        localStorage.setItem('levelup_interview_history', JSON.stringify(history));
    },

    getInterviewReadiness: () => JSON.parse(localStorage.getItem('levelup_interview_readiness')),
    getInterviewGoal: () => JSON.parse(localStorage.getItem('levelup_interview_goal')),
    
    getApplications: () => JSON.parse(localStorage.getItem('levelup_applications')),
    addApplication: (app) => {
        const apps = AppState.getApplications();
        apps.unshift(app);
        localStorage.setItem('levelup_applications', JSON.stringify(apps));
    },
    updateApplication: (id, updates) => {
        const apps = AppState.getApplications();
        const app = apps.find(a => a.id === id);
        if(app) { Object.assign(app, updates); localStorage.setItem('levelup_applications', JSON.stringify(apps)); }
    },
    
    // Daily Tasks
    getDailyTasks: () => JSON.parse(localStorage.getItem('levelup_daily_tasks')),
    updateDailyTask: (id, done) => {
        const state = AppState.getDailyTasks();
        const task = state.tasks.find(t => t.id === id);
        if(task) { 
            task.done = done; 
            state.completed = state.tasks.filter(t => t.done).length;
            localStorage.setItem('levelup_daily_tasks', JSON.stringify(state)); 
        }
    },
    
    // Notifications Enhancement
    addNotification: (notif) => {
        const notifs = AppState.getNotifications();
        notifs.unshift(notif);
        localStorage.setItem('levelup_notifications', JSON.stringify(notifs));
        updateGlobalUI();
    },

    // Bug Hunting
    getBugHunts: () => {
        const cached = JSON.parse(localStorage.getItem('levelup_bugHunts'));
        if (cached && cached.length > 0 && cached[0].title && cached[0].title !== 'null' && cached[0].title !== 'undefined') {
            return cached;
        }
        return MOCK_DATA.bugHunts;
    },
    getUserBugs: () => JSON.parse(localStorage.getItem('levelup_user_bugs')),
    addUserBug: (bug) => {
        const bugs = AppState.getUserBugs();
        bugs.unshift(bug);
        localStorage.setItem('levelup_user_bugs', JSON.stringify(bugs));
    },
    
    // Corporate Matches
    getCompanies: () => {
        const cached = JSON.parse(localStorage.getItem('levelup_companies'));
        if (cached && cached.length > 0 && cached[0].logo.includes('/')) {
            localStorage.setItem('levelup_companies', JSON.stringify(MOCK_DATA.companies));
            return MOCK_DATA.companies;
        }
        return cached || MOCK_DATA.companies;
    },
    getCareerProfile: () => JSON.parse(localStorage.getItem('levelup_career_profile')),
    updateCareerProfile: (data) => {
        const profile = { ...AppState.getCareerProfile(), ...data };
        localStorage.setItem('levelup_career_profile', JSON.stringify(profile));
    }
};

// Global UI Updates
function updateGlobalUI() {
    // Update username in topbar
    const userNameEls = document.querySelectorAll('.user-name');
    const user = AppState.getUser();
    if(user) {
        userNameEls.forEach(el => el.textContent = user.name);
    }
    
    // Update notification dot
    const notifDot = document.querySelector('.notification-dot');
    if(notifDot) {
        const unreadCount = AppState.getNotifications().filter(n => !n.read).length;
        if(unreadCount > 0) {
            notifDot.style.display = 'block';
        } else {
            notifDot.style.display = 'none';
        }
    }
}

// Toast System
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-check-circle" style="color: var(--success)"></i>' : '<i class="fa-solid fa-info-circle"></i>';
    
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal System
function setupModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeBtns = document.querySelectorAll('.close-btn, [data-close-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.classList.remove('active');
    });
}

// AI Chat System
function setupAIChat() {
    // Add chat HTML if not exists
    if(!document.querySelector('.ai-chat-btn') && !document.querySelector('.landing-page')) {
        const chatHTML = `
            <button class="ai-chat-btn" onclick="toggleChat()">
                <i class="fa-solid fa-robot"></i>
            </button>
            <div class="chat-window" id="aiChatWindow">
                <div class="chat-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-robot" style="color: var(--primary)"></i>
                        <strong>Level Up AI</strong>
                    </div>
                    <button class="close-btn" onclick="toggleChat()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message ai">Hey! I'm your learning assistant. What would you like to learn today?</div>
                </div>
                <div class="chat-input">
                    <input type="text" id="chatInputText" placeholder="Ask something..." onkeypress="handleChatKey(event)">
                    <button onclick="sendChatMessage()"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
}

window.toggleChat = function() {
    const chat = document.getElementById('aiChatWindow');
    if(chat) {
        chat.classList.toggle('active');
        if(chat.classList.contains('active')) {
            document.getElementById('chatInputText').focus();
        }
    }
}

window.sendChatMessage = function() {
    const input = document.getElementById('chatInputText');
    const text = input.value.trim();
    if(text) {
        const messages = document.getElementById('chatMessages');
        // Add User Message
        messages.innerHTML += `<div class="message user">${text}</div>`;
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
        
        // Simulate typing delay
        setTimeout(() => {
            const aiResponses = [
                "Sure! Let's break it down step by step.",
                "That's a great question. You can find more about this in the JavaScript course.",
                "I recommend practicing Data Structures next.",
                "Keep going, you're making great progress!"
            ];
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            messages.innerHTML += `<div class="message ai">${response}</div>`;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }
}

window.handleChatKey = function(e) {
    if(e.key === 'Enter') sendChatMessage();
}

// Global Search Simulator
window.handleGlobalSearch = function(e) {
    if(e.key === 'Enter') {
        const query = e.target.value.trim();
        if(query) {
            showToast(`Searching for: ${query}`);
            setTimeout(() => {
                window.location.href = 'skills.html?search=' + encodeURIComponent(query);
            }, 800);
        }
    }
}

// Theme Toggle System
function setupThemeToggle() {
    // Check local storage for theme
    const isLightMode = localStorage.getItem('levelup_theme') === 'light';
    if (isLightMode) {
        document.body.classList.add('light-mode');
    }

    // Function to handle the actual theme toggling logic
    const handleToggle = () => {
        const body = document.body;

        // Inject a temporary stylesheet that forces smooth transitions on ALL elements.
        // Using double rAF ensures the transition starts before the style is removed —
        // once a CSS transition begins, it runs to completion even if the rule is gone.
        const style = document.createElement('style');
        style.id = '__theme-transition__';
        style.textContent = `
            *, *::before, *::after {
                transition:
                    background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                    color            0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color     0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow       0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    fill             0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
        `;
        document.head.appendChild(style);

        // Toggle theme immediately — the injected transitions catch it
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('levelup_theme', isLight ? 'light' : 'dark');

        // Update icons
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.innerHTML = isLight
                ? '<i class="fa-solid fa-moon" id="themeIcon"></i>'
                : '<i class="fa-solid fa-sun" id="themeIcon"></i>';
        });

        // Double rAF: remove the style after the transition has already started.
        // The browser will let running transitions finish naturally.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                style.remove();
            });
        });
    };

    // 1. Bind to any existing theme toggle buttons (e.g., the ones in the topbar)
    const existingBtns = document.querySelectorAll('.theme-toggle-btn');
    if (existingBtns.length > 0) {
        existingBtns.forEach(btn => {
            btn.innerHTML = isLightMode ? '<i class="fa-solid fa-moon" id="themeIcon"></i>' : '<i class="fa-solid fa-sun" id="themeIcon"></i>';
            btn.onclick = handleToggle;
        });
    } else {
        // 2. Fallback for pages without standard topbar (skip landing and auth pages)
        if (!document.querySelector('.landing-page') && !document.querySelector('.auth-container')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'theme-toggle-btn';
            toggleBtn.style.position = 'fixed';
            toggleBtn.style.bottom = '80px';
            toggleBtn.style.right = '20px';
            toggleBtn.style.zIndex = '1000';
            toggleBtn.innerHTML = isLightMode ? '<i class="fa-solid fa-moon" id="themeIcon"></i>' : '<i class="fa-solid fa-sun" id="themeIcon"></i>';
            toggleBtn.onclick = handleToggle;
            document.body.appendChild(toggleBtn);
        }
    }
    // Global Keyboard Shortcut: Alt+T (Windows) / Option+T (Mac)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            handleToggle();
        }
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', initApp);
