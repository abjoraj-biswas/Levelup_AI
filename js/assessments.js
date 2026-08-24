// js/assessments.js

let currentAssessment = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let markedForReview = new Set();
let timerInterval = null;
let timeLeft = 0;
let allAssessments = [];

document.addEventListener('AppDataLoaded', () => {
    initAssessments();
    setupFilters();
});

async function initAssessments() {
    const newGrid = document.getElementById('newAssessmentsGrid');
    const allGrid = document.getElementById('allAssessmentsGrid');
    
    // Show brief loading state
    if (newGrid) newGrid.innerHTML = '<div class="text-secondary" style="grid-column: 1 / -1; text-align: center; padding: 20px;"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading assessments...</div>';
    if (allGrid) allGrid.innerHTML = '<div class="text-secondary" style="grid-column: 1 / -1; text-align: center; padding: 20px;"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading assessments...</div>';

    try {
        const { data, error } = await window.db.from('assessment_questions').select('assessment_name');
        if (error) throw error;
        
        if (data && data.length > 0) {
            const uniqueTopics = [...new Set(data.map(q => q.assessment_name))];
            allAssessments = uniqueTopics.map((topic, i) => {
                return {
                    id: `db_a${i}`,
                    title: topic,
                    category: "Technical Assessment",
                    difficulty: "Mixed",
                    questions: 10,
                    duration: 15,
                    status: "New",
                    bestScore: null,
                    passScore: 70,
                    isNew: true
                };
            });
        } else {
            allAssessments = AppState.getAssessments() || [];
        }
    } catch (err) {
        console.error("Error fetching assessment topics from Supabase:", err);
        allAssessments = AppState.getAssessments() || [];
    }

    renderSummaryCards();
    renderAssessmentsList();
    renderHistory();
}

function renderSummaryCards() {
    const completed = allAssessments.filter(a => a.status === 'Passed' || a.status === 'Completed');
    
    document.getElementById('sumAvailable').textContent = allAssessments.length;
    document.getElementById('sumCompleted').textContent = completed.length;
    
    let avg = 0;
    if (completed.length > 0) {
        const totalScore = completed.reduce((acc, curr) => acc + (curr.bestScore || 0), 0);
        avg = Math.round(totalScore / completed.length);
    }
    document.getElementById('sumScore').textContent = avg + '%';
    document.getElementById('sumRecommended').textContent = 5; // Static for demo
}

function renderAssessmentsList() {
    const newGrid = document.getElementById('newAssessmentsGrid');
    const allGrid = document.getElementById('allAssessmentsGrid');
    
    // Get filters
    const search = document.getElementById('assessmentSearch')?.value.toLowerCase() || '';
    const statusF = document.getElementById('assessmentStatus')?.value || 'all';
    const diffF = document.getElementById('assessmentDifficulty')?.value || 'all';
    const catF = document.getElementById('assessmentCategory')?.value || 'all';

    let filtered = allAssessments.filter(a => {
        const matchSearch = a.title.toLowerCase().includes(search);
        const matchStatus = statusF === 'all' ? true : (statusF === 'new' ? a.isNew : (statusF === 'completed' ? (a.status === 'Passed' || a.status === 'Completed') : a.status === 'In Progress'));
        const matchDiff = diffF === 'all' ? true : a.difficulty === diffF;
        const matchCat = catF === 'all' ? true : a.category.includes(catF);
        return matchSearch && matchStatus && matchDiff && matchCat;
    });

    const newAssessments = filtered.filter(a => a.isNew);
    
    const renderCard = (a) => `
        <div class="glass-card flex-col" style="padding: 20px; height: 100%;">
            <div class="flex justify-between items-start mb-2">
                <h3 style="font-size: 1.1rem; line-height: 1.3;">${a.title}</h3>
                ${a.isNew ? '<span class="badge" style="background: rgba(0, 229, 255, 0.1); color: var(--primary);">NEW</span>' : ''}
            </div>
            <p class="text-secondary mb-3 text-sm">${a.category}</p>
            
            <div class="grid-2 gap-2 mb-4 mt-auto">
                <div class="text-secondary text-sm"><i class="fa-solid fa-layer-group text-primary mr-1"></i> ${a.difficulty}</div>
                <div class="text-secondary text-sm"><i class="fa-solid fa-list-ol text-primary mr-1"></i> ${a.questions} Qs</div>
                <div class="text-secondary text-sm"><i class="fa-solid fa-clock text-primary mr-1"></i> ${a.duration} Min</div>
                <div class="text-secondary text-sm"><i class="fa-solid fa-trophy text-primary mr-1"></i> Best: ${a.bestScore !== null ? a.bestScore + '%' : '--'}</div>
            </div>
            
            <button class="btn-${a.status === 'Passed' ? 'outline' : 'primary'} w-100 py-2" onclick="openAssessmentDetail('${a.id}')">
                ${a.status === 'Passed' ? 'Retake Assessment' : 'Start Assessment'}
            </button>
        </div>
    `;

    if (newGrid) {
        newGrid.innerHTML = newAssessments.length > 0 
            ? newAssessments.map(renderCard).join('') 
            : '<p class="text-secondary col-span-3">No new assessments found.</p>';
    }

    if (allGrid) {
        allGrid.innerHTML = filtered.length > 0 
            ? filtered.map(renderCard).join('') 
            : '<p class="text-secondary col-span-3">No assessments found matching criteria.</p>';
    }
}

function setupFilters() {
    ['assessmentSearch', 'assessmentStatus', 'assessmentDifficulty', 'assessmentCategory'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener(el.tagName === 'INPUT' ? 'keyup' : 'change', renderAssessmentsList);
        }
    });
}

function renderHistory() {
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;
    
    // Mock history based on completed assessments
    const completed = allAssessments.filter(a => a.status === 'Passed' || a.status === 'Completed').slice(0, 5);
    
    if (completed.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-secondary p-3">No history available yet.</td></tr>';
        return;
    }

    tbody.innerHTML = completed.map(a => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 15px;">${a.title}</td>
            <td style="padding: 15px;" class="text-secondary">Recent</td>
            <td style="padding: 15px;" class="font-weight-bold text-primary">${a.bestScore}%</td>
            <td style="padding: 15px;"><span class="badge" style="background: rgba(0, 255, 170, 0.1); color: #00ffaa;">Passed</span></td>
            <td style="padding: 15px;"><button class="btn-outline" style="padding: 5px 10px; font-size: 0.8rem;" onclick="openAssessmentDetail('${a.id}')">Retake</button></td>
        </tr>
    `).join('');
}

function showView(viewId) {
    const views = ['assessmentsLibraryView', 'assessmentDetailView', 'assessmentQuizView', 'assessmentResultsView'];
    views.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            if(id === viewId) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
}

function openAssessmentDetail(id) {
    currentAssessment = allAssessments.find(a => a.id === id);
    if (!currentAssessment) return;
    
    document.getElementById('detailTitle').textContent = currentAssessment.title;
    document.getElementById('detailQuestions').textContent = currentAssessment.questions;
    document.getElementById('detailDuration').textContent = currentAssessment.duration + ' Minutes';
    document.getElementById('detailDifficulty').textContent = currentAssessment.difficulty;
    document.getElementById('detailPass').textContent = currentAssessment.passScore + '%';
    
    document.getElementById('detailSkills').innerHTML = `<li>${currentAssessment.category}</li><li>Problem Solving</li>`;
    
    showView('assessmentDetailView');
}

// ---------------- QUIZ LOGIC ----------------

let fetchedQuestions = [];

async function startAssessment() {
    const levelInput = document.querySelector('input[name="assessmentLevel"]:checked');
    const selectedLevel = levelInput ? levelInput.value : 'Basic';
    currentAssessment.selectedLevel = selectedLevel;

    document.getElementById('quizTitle').textContent = `Loading...`;
    showView('assessmentQuizView');

    try {
        const { data, error } = await window.db
            .from('assessment_questions')
            .select('*')
            .ilike('assessment_name', currentAssessment.title)
            .eq('difficulty', selectedLevel);

        if (error) throw error;
        
        if (data && data.length > 0) {
            // Shuffle the fetched data to get random questions
            const shuffledData = data.sort(() => 0.5 - Math.random());
            // Slice out exactly 10 questions
            const random10 = shuffledData.slice(0, 10);

            fetchedQuestions = random10.map(row => {
                const options = [row.option_a, row.option_b, row.option_c, row.option_d].filter(Boolean);
                const ansMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
                return {
                    q: row.question_text,
                    options: options,
                    ans: ansMap[row.correct_answer] !== undefined ? ansMap[row.correct_answer] : 0
                };
            });
        } else {
            if(typeof showToast === 'function') showToast(`No database questions found for "${currentAssessment.title}" at this level. Loading mock questions.`, 'warning');
            fetchedQuestions = getMockQuestions(currentAssessment.title, selectedLevel) || getMockQuestions(currentAssessment.title, "Beginner");
        }
    } catch(err) {
        console.error("Error fetching questions:", err);
        if(typeof showToast === 'function') showToast(`Error connecting to database. Loading mock questions.`, 'danger');
        fetchedQuestions = getMockQuestions(currentAssessment.title, selectedLevel) || getMockQuestions(currentAssessment.title, "Beginner");
    }

    userAnswers = {};
    markedForReview = new Set();
    currentQuestionIndex = 0;
    
    currentAssessment.questions = fetchedQuestions.length;
    timeLeft = currentAssessment.duration * 60;
    
    document.getElementById('quizTitle').textContent = `${currentAssessment.title} (${selectedLevel})`;
    
    renderQuestion();
    renderQuestionNavigator();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function exitAssessment() {
    if(confirm("Are you sure you want to exit? Your progress will be lost.")) {
        if (timerInterval) clearInterval(timerInterval);
        showView('assessmentsLibraryView');
    }
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitAssessment();
        return;
    }
    timeLeft--;
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('quizTimer').textContent = `${m}:${s}`;
}

function getMockQuestions(title, level) {
    const topic = title.split(' ')[0] || "Concept";
    if (level === "Beginner") {
        return [
            { q: `What is the primary purpose of ${topic}?`, options: ["Data Storage", "Logic Execution", "Styling", "Networking"], ans: 1 },
            { q: `Which of the following is a core feature of ${topic}?`, options: ["Variables", "Hardware", "OS", "Servers"], ans: 0 },
            { q: `How do you define a basic structure in ${topic}?`, options: ["Declaration", "Initialization", "Compilation", "Both A and B"], ans: 3 },
            { q: `What is a common use case for ${topic}?`, options: ["Web Development", "Operating Systems", "Drivers", "None of the above"], ans: 0 },
            { q: `Which tool is best used with ${topic}?`, options: ["IDE", "Hammer", "Wrench", "Screwdriver"], ans: 0 }
        ];
    } else if (level === "Intermediate") {
        return [
            { q: `How do you handle asynchronous operations in ${topic}?`, options: ["Callbacks", "Promises", "Async/Await", "All of the above"], ans: 3 },
            { q: `What is the best way to optimize performance in ${topic}?`, options: ["Caching", "Delaying", "Deleting Code", "Ignoring Errors"], ans: 0 },
            { q: `Which design pattern is most common in ${topic}?`, options: ["Singleton", "Observer", "Factory", "MVC"], ans: 3 },
            { q: `How do you manage state in ${topic}?`, options: ["Global Variables", "State Container", "Local Storage", "Cookies"], ans: 1 },
            { q: `What is the primary security concern in ${topic}?`, options: ["XSS", "CSRF", "SQL Injection", "All of the above"], ans: 3 }
        ];
    } else {
        return [
            { q: `What is the time complexity of the core algorithm in ${topic}?`, options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"], ans: 2 },
            { q: `What is the time complexity of the most common sorting algorithm in ${topic}?`, options: ["O(n log n)", "O(n^2)", "O(1)", "O(n)"], ans: 0 },
            { q: `How do you implement thread safety in ${topic}?`, options: ["Locks/Mutexes", "Ignoring it", "Global Variables", "SetTimeout"], ans: 0 },
            { q: `Which of the following is an anti-pattern in ${topic}?`, options: ["God Object", "Dependency Injection", "Unit Testing", "CI/CD"], ans: 0 },
            { q: `How do you debug memory leaks in ${topic}?`, options: ["Heap Profiling", "Console Logs", "Restarting Server", "Deleting Variables"], ans: 0 }
        ];
    }
}

function renderQuestion() {
    const totalQ = fetchedQuestions.length;
    if (currentQuestionIndex >= totalQ) currentQuestionIndex = totalQ - 1;
    if (currentQuestionIndex < 0) currentQuestionIndex = 0;
    
    document.getElementById('questionCounter').textContent = `Question ${currentQuestionIndex + 1} / ${totalQ}`;
    document.getElementById('quizProgress').style.width = `${((currentQuestionIndex + 1) / totalQ) * 100}%`;
    
    const qData = fetchedQuestions[currentQuestionIndex];
    if (!qData) return;
    
    document.getElementById('questionText').textContent = qData.q;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = qData.options.map((opt, idx) => {
        const isSelected = userAnswers[currentQuestionIndex] === idx;
        const letter = String.fromCharCode(65 + idx);
        return `
            <button class="option-btn ${isSelected ? 'selected' : ''}" onclick="selectOption(${idx})">
                <div class="option-letter">${letter}</div>
                <div>${opt}</div>
            </button>
        `;
    }).join('');
    
    document.getElementById('btnPrev').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === totalQ - 1) {
        document.getElementById('btnNext').classList.add('hidden');
        document.getElementById('btnSubmit').classList.remove('hidden');
    } else {
        document.getElementById('btnNext').classList.remove('hidden');
        document.getElementById('btnSubmit').classList.add('hidden');
    }
    
    renderQuestionNavigator();
}

function selectOption(idx) {
    userAnswers[currentQuestionIndex] = idx;
    renderQuestion();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    const totalQ = fetchedQuestions.length;
    if (currentQuestionIndex < totalQ - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function markForReview() {
    if (markedForReview.has(currentQuestionIndex)) {
        markedForReview.delete(currentQuestionIndex);
    } else {
        markedForReview.add(currentQuestionIndex);
    }
    renderQuestionNavigator();
}

function renderQuestionNavigator() {
    const totalQ = fetchedQuestions.length;
    const nav = document.getElementById('questionNavigator');
    
    let html = '';
    for (let i = 0; i < totalQ; i++) {
        let classes = ['q-nav-item'];
        if (i === currentQuestionIndex) classes.push('current');
        if (userAnswers[i] !== undefined) classes.push('completed');
        if (markedForReview.has(i)) classes.push('marked');
        
        html += `<div class="${classes.join(' ')}" onclick="jumpToQuestion(${i})">${i + 1}</div>`;
    }
    nav.innerHTML = html;
}

function jumpToQuestion(idx) {
    currentQuestionIndex = idx;
    renderQuestion();
}

function submitAssessment() {
    clearInterval(timerInterval);
    
    const totalQ = fetchedQuestions.length;
    let correct = 0;
    for (let i = 0; i < totalQ; i++) {
        if (userAnswers[i] === fetchedQuestions[i].ans) correct++;
    }
    
    // Scale up to 100
    const score = Math.round((correct / totalQ) * 100);
    
    // Save to AppState (which handles both localStorage and DB fallback)
    const newBest = Math.max(currentAssessment.bestScore || 0, score);
    const newStatus = score >= currentAssessment.passScore ? 'Passed' : 'Failed';
    
    if (typeof AppState !== 'undefined') {
        AppState.updateAssessment(currentAssessment.id, {
            bestScore: newBest,
            status: newStatus,
            isNew: false
        });
    } else {
        currentAssessment.bestScore = newBest;
        currentAssessment.status = newStatus;
        currentAssessment.isNew = false;
        localStorage.setItem('levelup_assessments', JSON.stringify(allAssessments));
    }
    
    // Render Results
    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultPerformance').textContent = score >= 80 ? "Strong Performance" : (score >= 60 ? "Good Effort" : "Needs Improvement");
    
    // Handle Badge Display
    const badgeContainer = document.getElementById('badgeContainer');
    if (score >= currentAssessment.passScore) {
        badgeContainer.classList.remove('hidden');
        document.getElementById('resultBadgeText').textContent = `${currentAssessment.selectedLevel} ${currentAssessment.title.replace(' Basics', '')} Certified`;
    } else {
        badgeContainer.classList.add('hidden');
    }
    
    showView('assessmentResultsView');
}

// Add a function to update the visual state of the radio buttons
function updateLevelSelection() {
    document.querySelectorAll('.level-option').forEach(el => {
        el.style.border = '2px solid transparent';
        el.style.opacity = '0.6';
        el.style.transform = 'scale(0.98)';
    });
    const checked = document.querySelector('input[name="assessmentLevel"]:checked');
    if (checked) {
        const option = checked.closest('.level-option');
        option.style.opacity = '1';
        option.style.transform = 'scale(1)';
        
        if (checked.value === 'Basic') {
            option.style.border = '2px solid var(--success)';
        } else if (checked.value === 'Intermediate') {
            option.style.border = '2px solid #377dff'; // Match icon color
        } else if (checked.value === 'Advance') {
            option.style.border = '2px solid #e94560';
        }
    }
}
