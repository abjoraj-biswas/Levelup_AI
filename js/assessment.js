/**
 * Assessment Logic
 */

const mockQuestions = [
    {
        q: "What is a JavaScript function?",
        options: [
            "A reusable block of code that performs a specific task",
            "A variable that holds multiple values",
            "A styling element in HTML",
            "A database querying method"
        ],
        answer: 0
    },
    {
        q: "Which keyword is used to declare an asynchronous function?",
        options: [
            "defer",
            "async",
            "await",
            "promise"
        ],
        answer: 1
    },
    {
        q: "What does 'const' do in JavaScript?",
        options: [
            "Declares a variable that can be changed anywhere",
            "Declares a block-scoped variable that cannot be reassigned",
            "Creates a constant loop",
            "Defines a CSS constant"
        ],
        answer: 1
    },
    {
        q: "What is a closure?",
        options: [
            "A way to close a browser window",
            "A function having access to the parent scope, even after the parent function has closed",
            "A method to close a database connection",
            "A tag in HTML"
        ],
        answer: 1
    },
    {
        q: "Which method is used to parse a JSON string?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(mockQuestions.length).fill(null);

function startAssessment() {
    document.getElementById('introScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    const question = mockQuestions[currentQuestionIndex];
    
    // Update Header
    document.getElementById('questionCounter').textContent = `Question ${currentQuestionIndex + 1} of ${mockQuestions.length}`;
    document.getElementById('assessmentProgress').style.width = `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%`;
    
    // Update Question text
    document.getElementById('questionText').textContent = question.q;
    
    // Update Options
    const optionsContainer = document.getElementById('optionsContainer');
    const labels = ['A', 'B', 'C', 'D'];
    
    optionsContainer.innerHTML = question.options.map((opt, i) => {
        const isSelected = userAnswers[currentQuestionIndex] === i ? 'selected' : '';
        return `
            <button class="option-btn ${isSelected}" onclick="selectOption(${i})">
                <div class="option-letter">${labels[i]}</div>
                <div>${opt}</div>
            </button>
        `;
    }).join('');

    // Update Buttons
    document.getElementById('prevQuestionBtn').disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === mockQuestions.length - 1) {
        document.getElementById('nextQuestionBtn').classList.add('hidden');
        document.getElementById('submitAssessmentBtn').classList.remove('hidden');
    } else {
        document.getElementById('nextQuestionBtn').classList.remove('hidden');
        document.getElementById('submitAssessmentBtn').classList.add('hidden');
    }
}

window.selectOption = function(index) {
    userAnswers[currentQuestionIndex] = index;
    renderQuestion();
}

window.nextQuestion = function() {
    if(userAnswers[currentQuestionIndex] === null) {
        showToast("Please select an answer", "warning");
        return;
    }
    if (currentQuestionIndex < mockQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

window.prevQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

window.submitAssessment = function() {
    if(userAnswers[currentQuestionIndex] === null) {
        showToast("Please select an answer", "warning");
        return;
    }
    
    // Calculate Score
    let correct = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === mockQuestions[i].answer) correct++;
    });
    
    // Switch to Results (For mock purposes, hardcoding the 82% display in HTML, 
    // but we can animate it or update it dynamically)
    
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    showToast("Assessment Submitted!", "success");
    
    // Update Notification mock
    AppState.markNotificationRead(2); // Mock: updating some notification
    
    // Mock save achievement
    localStorage.setItem('levelup_assessment_done', 'true');
}

/**
 * Mock Interviews Logic
 */

let currentMockInterview = null;
let miCurrentQuestionIndex = 0;
let miAnswers = [];
let miTimerInterval = null;
let miTimeRemaining = 0; // in seconds

document.addEventListener('AppDataLoaded', () => {
    initMockInterviews();
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function initMockInterviews() {
    renderMockHubStats();
    renderRecommendedCard();
    renderMockInterviews();
    renderInterviewHistory();
}

function renderMockHubStats() {
    const history = AppState.getInterviewHistory() || [];
    const readiness = AppState.getInterviewReadiness() || { score: 0, breakdown: [] };
    const goal = AppState.getInterviewGoal() || { title: "", progress: 0, total: 1 };

    let completed = history.length;
    let avg = completed > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / completed) : 0;
    let best = completed > 0 ? Math.max(...history.map(h => h.score)) : 0;

    const elComp = document.getElementById('miStatCompleted');
    if(elComp) elComp.textContent = completed;
    const elAvg = document.getElementById('miStatAvg');
    if(elAvg) elAvg.textContent = avg + '%';
    const elBest = document.getElementById('miStatBest');
    if(elBest) elBest.textContent = best + '%';
    const elRead = document.getElementById('miStatReadiness');
    if(elRead) elRead.textContent = readiness.score + '%';

    // Readiness Breakdown
    const elReadScore = document.getElementById('miReadinessScore');
    if(elReadScore) elReadScore.textContent = readiness.score + '%';
    const rbEl = document.getElementById('miReadinessBreakdown');
    if(rbEl) {
        rbEl.innerHTML = readiness.breakdown.map(b => `
            <div class="flex justify-between mb-1">
                <span>${b.label}</span>
                <span class="text-primary">${b.score}%</span>
            </div>
            <div class="progress-container mb-3" style="height: 4px;">
                <div class="progress-bar" style="width: ${b.score}%;"></div>
            </div>
        `).join('');
    }

    // Goals
    const elGoalTitle = document.getElementById('miGoalTitle');
    if(elGoalTitle) elGoalTitle.textContent = goal.title;
    const elGoalText = document.getElementById('miGoalText');
    if(elGoalText) elGoalText.textContent = `${goal.progress} / ${goal.total}`;
    const elGoalProgress = document.getElementById('miGoalProgress');
    if(elGoalProgress) elGoalProgress.style.width = `${(goal.progress / goal.total) * 100}%`;
}

function renderRecommendedCard() {
    const mis = AppState.getMockInterviews();
    // Pick the highest match
    const recommended = mis.reduce((prev, curr) => (prev.match > curr.match) ? prev : curr, mis[0]);
    if(!recommended) return;

    const rcEl = document.getElementById('miRecommendedCard');
    if(rcEl) {
        rcEl.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-primary" style="font-size: 1.5rem;">Recommended For You</h3>
                <span class="badge" style="background: rgba(0, 255, 136, 0.2); color: var(--success); font-size: 1rem;"><i class="fa-solid fa-bolt"></i> ${recommended.match}% Match</span>
            </div>
            <h2 class="mb-2">${recommended.title}</h2>
            <p class="text-secondary mb-4" style="font-size: 1rem;">Based on your recent progress in Frontend Development and React.</p>
            <div class="flex gap-4 mb-4 text-secondary">
                <span><i class="fa-solid fa-clipboard-question mr-1"></i> ${recommended.questionsCount} Questions</span>
                <span><i class="fa-regular fa-clock mr-1"></i> ${recommended.duration} Mins</span>
                <span><i class="fa-solid fa-layer-group mr-1"></i> ${recommended.difficulty}</span>
            </div>
            <button class="btn-primary" onclick="openMockDetails('${recommended.id}')" style="font-size: 1.1rem; padding: 12px 30px;">View Details</button>
        `;
    }
}

function filterMockInterviews() {
    renderMockInterviews();
}

function renderMockInterviews() {
    const standardGrid = document.getElementById('miGrid');
    const companyGrid = document.getElementById('miCompanyGrid');
    if(!standardGrid || !companyGrid) return;

    const typeFilter = document.getElementById('miTypeFilter').value;
    const diffFilter = document.getElementById('miDiffFilter').value;
    const sortFilter = document.getElementById('miSortFilter') ? document.getElementById('miSortFilter').value : 'Highest Match';
    
    let interviews = AppState.getMockInterviews();

    if (typeFilter !== 'All') {
        interviews = interviews.filter(i => i.category === typeFilter || i.category.includes(typeFilter));
    }
    if (diffFilter !== 'All') {
        interviews = interviews.filter(i => i.difficulty === diffFilter);
    }

    if (sortFilter === 'Highest Match' || sortFilter === 'Recommended') {
        interviews.sort((a, b) => b.match - a.match);
    } else if (sortFilter === 'Most Popular') {
        interviews.sort((a, b) => b.questionsCount - a.questionsCount); // arbitrary mock sort
    }

    const standardInterviews = interviews.filter(i => i.category !== 'Company Specific');
    const companyInterviews = interviews.filter(i => i.category === 'Company Specific');

    const renderCard = (i) => `
        <div class="interview-card glass-card">
            <div>
                <div class="flex justify-between items-start mb-1">
                    <h3 style="font-size: 1.2rem;">${i.title}</h3>
                    <span class="text-success font-weight-bold" style="font-size: 0.9rem;">${i.match}%</span>
                </div>
                <div class="flex gap-2 mb-3 mt-2">
                    <span class="badge" style="background: rgba(0,240,255,0.1); color: var(--primary);">${i.difficulty}</span>
                    <span class="badge" style="background: rgba(255,255,255,0.05);">${i.category}</span>
                </div>
                
                <p class="text-secondary mb-3" style="font-size: 0.9rem;">
                    <i class="fa-solid fa-clipboard-question mr-1"></i> ${i.questionsCount} Qs &nbsp;&bull;&nbsp; 
                    <i class="fa-regular fa-clock mr-1"></i> ${i.duration} Mins
                </p>
                
                <div class="mb-4">
                    <p class="text-secondary mb-1" style="font-size: 0.8rem;">Skills:</p>
                    <div class="flex flex-wrap gap-1">
                        ${i.skills.slice(0, 3).map(s => `<span class="badge" style="font-size: 0.75rem;">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <button class="btn-outline w-100" onclick="openMockDetails('${i.id}')">View Details</button>
        </div>
    `;

    if (standardInterviews.length === 0) {
        standardGrid.innerHTML = '<div style="grid-column: span 100%; text-align: center; padding: 20px;" class="text-muted">No interviews match.</div>';
    } else {
        standardGrid.innerHTML = standardInterviews.map(renderCard).join('');
    }

    if (companyInterviews.length === 0) {
        companyGrid.innerHTML = '<div style="grid-column: span 100%; text-align: center; padding: 20px;" class="text-muted">No company interviews match.</div>';
    } else {
        companyGrid.innerHTML = companyInterviews.map(renderCard).join('');
    }
}

function renderInterviewHistory() {
    const tbody = document.getElementById('miHistoryBody');
    if(!tbody) return;

    const history = AppState.getInterviewHistory() || [];
    
    if (history.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No mock interviews completed yet.</td></tr>';
        return;
    }

    tbody.innerHTML = history.map(h => `
        <tr>
            <td style="font-weight: 500;">${h.title}</td>
            <td class="text-secondary">${h.date}</td>
            <td style="text-align: right;" class="text-success font-weight-bold">${h.score}%</td>
            <td><span class="badge" style="background: rgba(0, 255, 136, 0.1); color: var(--success);">${h.status}</span></td>
            <td style="text-align: right;">
                <button class="btn-outline" style="padding: 5px 10px; font-size: 0.8rem;" onclick="showToast('Loading result...', 'info')">View</button>
            </td>
        </tr>
    `).join('');
}

function openMockDetails(id) {
    const mis = AppState.getMockInterviews();
    const interview = mis.find(i => i.id === id);
    if(!interview) return;

    document.getElementById('miModalTitle').textContent = interview.title;
    document.getElementById('miModalType').textContent = interview.category;
    document.getElementById('miModalDiff').textContent = interview.difficulty;
    document.getElementById('miModalQs').textContent = interview.questionsCount;
    document.getElementById('miModalTime').textContent = interview.duration + " Mins";
    document.getElementById('miModalMatch').textContent = interview.match + "%";
    
    document.getElementById('miModalSkills').innerHTML = interview.skills.map(s => `<span class="badge">${s}</span>`).join('');
    
    const startBtn = document.getElementById('miModalStartBtn');
    startBtn.onclick = () => {
        document.getElementById('miDetailsModal').style.display = 'none';
        miBeginPreparation(interview.id);
    };

    document.getElementById('miDetailsModal').style.display = 'flex';
}

function miBeginPreparation(id) {
    const mis = AppState.getMockInterviews();
    currentMockInterview = mis.find(i => i.id === id);
    if(!currentMockInterview) return;

    document.getElementById('assessmentTabs').classList.add('hidden');
    document.getElementById('mockInterviewsTab').classList.add('hidden');
    document.getElementById('assessmentsTab').classList.add('hidden');
    document.getElementById('miResultsView').classList.add('hidden');
    
    document.getElementById('miPrepTitle').textContent = currentMockInterview.title;
    document.getElementById('miPrepQuestions').textContent = currentMockInterview.questionsCount + " Questions";
    document.getElementById('miPrepTime').textContent = currentMockInterview.duration + " Minutes";

    document.getElementById('miPrepScreen').classList.remove('hidden');
}

function miBeginExecution() {
    if(!currentMockInterview) return;

    // Reset state
    miCurrentQuestionIndex = 0;
    miAnswers = new Array(currentMockInterview.questionsCount).fill("");
    miTimeRemaining = currentMockInterview.duration * 60;
    
    // UI Transitions
    document.getElementById('miPrepScreen').classList.add('hidden');
    document.getElementById('miExecutionView').classList.remove('hidden');

    document.getElementById('miExecTitle').textContent = currentMockInterview.title;
    
    miUpdateUI();
    miStartTimer();
}

function miStartTimer() {
    clearInterval(miTimerInterval);
    miUpdateTimerUI();
    miTimerInterval = setInterval(() => {
        miTimeRemaining--;
        if (miTimeRemaining <= 0) {
            clearInterval(miTimerInterval);
            showToast("Time's up! Submitting interview automatically.", "warning");
            miShowSubmitModal();
        } else {
            miUpdateTimerUI();
        }
    }, 1000);
}

function miUpdateTimerUI() {
    const m = Math.floor(miTimeRemaining / 60);
    const s = miTimeRemaining % 60;
    document.getElementById('miExecTimer').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function miUpdateUI() {
    const qCount = currentMockInterview.questionsCount;
    document.getElementById('miExecCounter').textContent = `Question ${miCurrentQuestionIndex + 1} / ${qCount}`;
    
    const progressPct = ((miCurrentQuestionIndex) / qCount) * 100;
    document.getElementById('miExecProgress').style.width = `${progressPct}%`;
    
    const questionData = currentMockInterview.questions[miCurrentQuestionIndex] || { text: "Placeholder question.", type: "text" };
    document.getElementById('miExecQuestion').textContent = `"${questionData.text}"`;
    
    // Switch between Code and Text Editor based on question type
    if(questionData.type === 'coding') {
        document.getElementById('miExecQType').textContent = "Coding Assessment";
        document.getElementById('miTextAnswerWrapper').classList.add('hidden');
        document.getElementById('miCodeAnswerWrapper').classList.remove('hidden');
        document.getElementById('miCodeResult').classList.add('hidden');
        const codeInput = document.getElementById('miCodeAnswer');
        codeInput.value = miAnswers[miCurrentQuestionIndex] || "";
    } else {
        document.getElementById('miExecQType').textContent = (questionData.type === 'hr' || questionData.type === 'behavioral') ? "Behavioral Question" : "Technical Question";
        document.getElementById('miCodeAnswerWrapper').classList.add('hidden');
        document.getElementById('miTextAnswerWrapper').classList.remove('hidden');
        const answerInput = document.getElementById('miExecAnswer');
        answerInput.value = miAnswers[miCurrentQuestionIndex] || "";
    }

    document.getElementById('miPrevBtn').disabled = (miCurrentQuestionIndex === 0);
    
    if (miCurrentQuestionIndex === qCount - 1) {
        document.getElementById('miNextBtn').classList.add('hidden');
        document.getElementById('miSubmitBtn').classList.remove('hidden');
    } else {
        document.getElementById('miNextBtn').classList.remove('hidden');
        document.getElementById('miSubmitBtn').classList.add('hidden');
    }

    miRenderQuestionNav();
}

function miRenderQuestionNav() {
    const nav = document.getElementById('miQuestionNav');
    if(!nav) return;

    const qCount = currentMockInterview.questionsCount;
    let html = '';
    for(let i=0; i<qCount; i++) {
        let classes = 'q-nav-dot';
        if(i === miCurrentQuestionIndex) classes += ' active';
        else if(miAnswers[i] && miAnswers[i].trim() !== '') classes += ' answered';
        html += `<div class="${classes}" onclick="miJumpToQuestion(${i})">${i+1}</div>`;
    }
    nav.innerHTML = html;
}

function miJumpToQuestion(index) {
    miSaveCurrentAnswer();
    miCurrentQuestionIndex = index;
    miUpdateUI();
}

function miSaveCurrentAnswer() {
    const questionData = currentMockInterview.questions[miCurrentQuestionIndex] || { type: "text" };
    if(questionData.type === 'coding') {
        miAnswers[miCurrentQuestionIndex] = document.getElementById('miCodeAnswer').value;
    } else {
        miAnswers[miCurrentQuestionIndex] = document.getElementById('miExecAnswer').value;
    }
}

function miMockRunCode() {
    showToast("Running code...", "info");
    setTimeout(() => {
        document.getElementById('miCodeResult').classList.remove('hidden');
        showToast("Tests passed successfully!", "success");
    }, 1000);
}

function miNextQuestion() {
    miSaveCurrentAnswer();
    if (miCurrentQuestionIndex < currentMockInterview.questionsCount - 1) {
        miCurrentQuestionIndex++;
        miUpdateUI();
    }
}

function miPrevQuestion() {
    miSaveCurrentAnswer();
    if (miCurrentQuestionIndex > 0) {
        miCurrentQuestionIndex--;
        miUpdateUI();
    }
}

function miShowSubmitModal() {
    miSaveCurrentAnswer();
    document.getElementById('submitInterviewModal').style.display = 'flex';
}

function miFinishInterview() {
    clearInterval(miTimerInterval);
    document.getElementById('submitInterviewModal').style.display = 'none';
    
    // Calculate Score Breakdowns
    const overallScore = Math.floor(Math.random() * 15) + 75; // 75 - 90
    const techScore = Math.min(100, overallScore + Math.floor(Math.random() * 10));
    const commScore = Math.max(60, overallScore - Math.floor(Math.random() * 10));
    const probScore = Math.min(100, overallScore + Math.floor(Math.random() * 5));
    const behavScore = overallScore;

    // Add to history
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    AppState.addInterviewHistory({
        id: 'h_' + Date.now(),
        interviewId: currentMockInterview.id,
        title: currentMockInterview.title,
        date: dateStr,
        score: overallScore,
        status: 'Completed'
    });
    
    // Add Notification
    AppState.addNotification({
        id: Date.now(),
        type: 'interview',
        title: 'Interview Completed',
        message: `You completed the ${currentMockInterview.title} with a score of ${overallScore}%.`,
        read: false,
        icon: 'fa-solid fa-microphone'
    });

    renderInterviewHistory();
    renderMockHubStats();
    
    // Show results view
    document.getElementById('miExecutionView').classList.add('hidden');
    document.getElementById('miResultsView').classList.remove('hidden');
    
    // Update Results UI
    document.getElementById('miResultOverall').textContent = overallScore;
    document.getElementById('miResultPrevScore').textContent = Math.max(0, overallScore - 4);
    
    // Breakdowns
    const bdHtml = `
        <div class="flex justify-between mb-1"><span>Technical & Coding</span> <span class="text-primary">${techScore}%</span></div>
        <div class="progress-container mb-3"><div class="progress-bar" style="width: ${techScore}%"></div></div>
        
        <div class="flex justify-between mb-1"><span>Problem Solving</span> <span class="text-primary">${probScore}%</span></div>
        <div class="progress-container mb-3"><div class="progress-bar" style="width: ${probScore}%"></div></div>

        <div class="flex justify-between mb-1"><span>Communication</span> <span class="text-primary">${commScore}%</span></div>
        <div class="progress-container mb-3"><div class="progress-bar" style="width: ${commScore}%"></div></div>
        
        <div class="flex justify-between mb-1"><span>Behavioral & HR</span> <span class="text-primary">${behavScore}%</span></div>
        <div class="progress-container"><div class="progress-bar" style="width: ${behavScore}%"></div></div>
    `;
    document.getElementById('miResultBreakdownArea').innerHTML = bdHtml;

    // Strong / Weak Areas
    const skills = currentMockInterview.skills;
    if(skills.length > 0) {
        document.getElementById('miStrongAreasList').innerHTML = `<li class="mb-2"><i class="fa-solid fa-check mr-2"></i> ${skills[0]} fundamentals</li>
        <li class="mb-2"><i class="fa-solid fa-check mr-2"></i> Technical explanations</li>`;
        
        if(skills.length > 1) {
            document.getElementById('miWeakAreasList').innerHTML = `<li class="mb-2"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Advanced ${skills[1]} concepts</li>
            <li class="mb-2"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Using STAR method</li>`;
        }
    }

    window.scrollTo(0, 0);
}

