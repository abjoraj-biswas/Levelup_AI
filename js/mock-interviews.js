// js/mock-interviews.js

let allInterviews = [];
let currentInterview = null;
let currentMiQuestion = 0;
let miTimerInterval = null;
let miTimeLeft = 0;
let isRecording = false;
let currentAttemptId = null;
let currentQuestions = [];
let mediaStream = null;
let recognition = null;
let transcriptText = "";

document.addEventListener('AppDataLoaded', () => {
    initMockInterviews();
    setupMiFilters();
});

async function initMockInterviews() {
    try {
        const { data, error } = await window.db.from('mockInterviews').select('*');
        if (error) throw error;
        
        allInterviews = data || [];
        
        // Also sync with localStorage for immediate availability
        localStorage.setItem('levelup_mock_interviews', JSON.stringify(allInterviews));
    } catch (err) {
        console.error("Failed to fetch mock interviews from DB:", err);
        // Fallback to localStorage
        const stored = localStorage.getItem('levelup_mock_interviews');
        allInterviews = stored ? JSON.parse(stored) : [];
    }

    renderMiSummaryCards();
    renderMiList();
    renderMiHistory();
}

function renderMiSummaryCards() {
    const completed = allInterviews.filter(i => i.status === 'Completed');
    
    document.getElementById('miAvailable').textContent = allInterviews.length;
    document.getElementById('miCompleted').textContent = completed.length;
    
    let avg = 0;
    if (completed.length > 0) {
        const totalScore = completed.reduce((acc, curr) => acc + (curr.score || 0), 0);
        avg = Math.round(totalScore / completed.length);
    }
    document.getElementById('miAvgScore').textContent = avg + '%';
    
    const readinessData = JSON.parse(localStorage.getItem('levelup_interview_readiness'));
    if(readinessData) {
        document.getElementById('miReadiness').textContent = readinessData.score + '%';
    }
}

function renderMiList() {
    const newGrid = document.getElementById('newMiGrid');
    const allGrid = document.getElementById('allMiGrid');
    
    const search = document.getElementById('miSearch')?.value.toLowerCase() || '';
    const typeF = document.getElementById('miType')?.value || 'all';
    const expF = document.getElementById('miExperience')?.value || 'all';

    let filtered = allInterviews.filter(i => {
        const matchSearch = i.title.toLowerCase().includes(search);
        const matchType = typeF === 'all' ? true : i.type === typeF;
        const matchExp = expF === 'all' ? true : i.experience === expF;
        return matchSearch && matchType && matchExp;
    });

    const newMi = filtered.filter(i => i.isNew);
    
    const renderCard = (i) => `
        <div class="glass-card flex-col" style="padding: 20px; height: 100%;">
            <div class="flex justify-between items-start mb-2">
                <h3 style="font-size: 1.1rem; line-height: 1.3;">${i.title}</h3>
                ${i.isNew ? '<span class="badge" style="background: rgba(0, 229, 255, 0.1); color: var(--primary);">NEW</span>' : ''}
            </div>
            
            <div class="grid-2 gap-2 mb-4 mt-auto text-secondary text-sm">
                <div><i class="fa-solid fa-briefcase text-primary mr-1"></i> ${i.type}</div>
                <div><i class="fa-solid fa-clock text-primary mr-1"></i> ${i.duration} Min</div>
                <div class="col-span-2"><i class="fa-solid fa-star text-warning mr-1"></i> ${i.experience || 'Entry Level'}</div>
            </div>
            
            <button class="btn-${i.status === 'Completed' ? 'outline' : 'primary'} w-100 py-2" onclick="openMiDetail('${i.id}')">
                ${i.status === 'Completed' ? 'Review & Retake' : 'Prepare Interview'}
            </button>
        </div>
    `;

    if (newGrid) {
        newGrid.innerHTML = newMi.length > 0 
            ? newMi.map(renderCard).join('') 
            : '<p class="text-secondary col-span-3">No new mock interviews.</p>';
    }

    if (allGrid) {
        allGrid.innerHTML = filtered.length > 0 
            ? filtered.map(renderCard).join('') 
            : '<p class="text-secondary col-span-3">No mock interviews found.</p>';
    }
}

function setupMiFilters() {
    ['miSearch', 'miType', 'miExperience'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener(el.tagName === 'INPUT' ? 'keyup' : 'change', renderMiList);
        }
    });
}

function renderMiHistory() {
    const tbody = document.getElementById('miHistoryBody');
    if (!tbody) return;
    
    const completed = allInterviews.filter(i => i.status === 'Completed').slice(0, 5);
    
    if (completed.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-secondary p-3">No history available yet.</td></tr>';
        return;
    }

    tbody.innerHTML = completed.map(i => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 15px;">${i.title}</td>
            <td style="padding: 15px;" class="text-secondary">${i.type}</td>
            <td style="padding: 15px;" class="text-secondary">Recent</td>
            <td style="padding: 15px;" class="font-weight-bold text-primary">${i.score}%</td>
            <td style="padding: 15px;"><button class="btn-outline" style="padding: 5px 10px; font-size: 0.8rem;" onclick="openMiDetail('${i.id}')">Retake</button></td>
        </tr>
    `).join('');
}

function showMiView(viewId) {
    const views = ['miLibraryView', 'miDetailView', 'miInterfaceView', 'miFeedbackView'];
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

function openMiDetail(id) {
    currentInterview = allInterviews.find(i => i.id === id);
    if (!currentInterview) return;
    
    document.getElementById('miDetailTitle').textContent = currentInterview.title;
    document.getElementById('miDetailType').textContent = currentInterview.type || 'Technical';
    document.getElementById('miDetailExp').textContent = currentInterview.experience || 'Entry Level';
    document.getElementById('miDetailDuration').textContent = currentInterview.duration + ' Minutes';
    // Mocking question count based on duration (1 question per 2.5 mins approx)
    const qCount = Math.floor(currentInterview.duration / 2.5);
    document.getElementById('miDetailQs').textContent = qCount;
    
    showMiView('miDetailView');
}

// ---------------- INTERFACE LOGIC ----------------

const mockMiQuestions = [
    "Tell me about a time you had to optimize a slow-performing web application.",
    "How would you explain the concept of Virtual DOM to a junior developer?",
    "Describe your process for ensuring web accessibility in a new project.",
    "What is your approach to handling state in a large-scale React application?",
    "Tell me about a challenging bug you faced recently and how you resolved it."
];

async function startInterview() {
    try {
        const user = typeof AppState !== 'undefined' ? AppState.getUser() : null;
        if (!user) {
            alert("You must be logged in to start an interview.");
            return;
        }

        // Fetch questions from Supabase for this interview
        const { data: questions, error: qErr } = await window.db
            .from('interview_questions')
            .select('*')
            .eq('interview_id', currentInterview.id)
            .order('question_order', { ascending: true });
        
        if (qErr) {
            console.warn("Could not fetch questions, falling back to mocks.", qErr);
        }

        currentQuestions = (questions && questions.length > 0) ? questions : mockMiQuestions.map((text, idx) => ({
            id: `mock-q-${idx}`,
            question_text: text,
            question_order: idx + 1
        }));

        // Create an attempt in Supabase
        const { data: attempt, error: aErr } = await window.db
            .from('interview_attempts')
            .insert([{
                interview_id: currentInterview.id,
                user_id: user.id,
                status: 'in_progress'
            }])
            .select()
            .single();

        if (aErr) {
            console.warn("Could not insert attempt (RLS restricted?), proceeding locally.", aErr);
            currentAttemptId = `mock-attempt-${Date.now()}`;
        } else {
            currentAttemptId = attempt.id;
        }

        currentMiQuestion = 0;
        miTimeLeft = currentInterview.duration * 60;
        isRecording = false;
        
        document.getElementById('miProgressText').textContent = `Question 1 / ${currentQuestions.length}`;
        document.getElementById('miProgressBar').style.width = `${(1 / currentQuestions.length) * 100}%`;
        document.getElementById('miQuestionText').textContent = `"${currentQuestions[0].question_text || currentQuestions[0]}"`;
        
        resetMiUI();
        await initMediaStream();
        initSpeechRecognition();
        
        transcriptText = "";
        const transcriptBox = document.getElementById('miTranscriptBox');
        if (transcriptBox) transcriptBox.value = "";
        
        showMiView('miInterfaceView');
        
        if (miTimerInterval) clearInterval(miTimerInterval);
        miTimerInterval = setInterval(updateMiTimer, 1000);
        updateMiTimer();

    } catch (e) {
        console.error("Failed to start interview:", e);
        alert("There was an error starting the interview. Please check your connection.");
    }
}

function updateMiTimer() {
    if (miTimeLeft <= 0) {
        clearInterval(miTimerInterval);
        finishInterview();
        return;
    }
    miTimeLeft--;
    const m = Math.floor(miTimeLeft / 60).toString().padStart(2, '0');
    const s = (miTimeLeft % 60).toString().padStart(2, '0');
    document.getElementById('miTimer').textContent = `${m}:${s}`;
}

function resetMiUI() {
    isRecording = false;
    document.getElementById('miRecordingUI').classList.add('hidden');
    document.getElementById('miFinishedUI').classList.add('hidden');
    
    document.getElementById('btnStartAns').classList.remove('hidden');
    document.getElementById('btnPauseAns').classList.add('hidden');
    document.getElementById('btnFinishAns').classList.add('hidden');
    document.getElementById('btnNextQ').classList.add('hidden');
    
    document.getElementById('miStatus').innerHTML = '<span class="recording-dot"></span> LIVE';
}

function startAnswer() {
    isRecording = true;
    document.getElementById('miRecordingUI').classList.remove('hidden');
    document.getElementById('miFinishedUI').classList.add('hidden');
    
    document.getElementById('btnStartAns').classList.add('hidden');
    document.getElementById('btnPauseAns').classList.remove('hidden');
    document.getElementById('btnFinishAns').classList.remove('hidden');
    
    document.getElementById('miStatus').innerHTML = '<span class="recording-dot is-recording"></span> RECORDING';
    
    if (recognition) {
        try { recognition.start(); } catch(e) {}
    }
}

function pauseAnswer() {
    isRecording = false;
    document.getElementById('miRecordingUI').classList.add('hidden');
    
    document.getElementById('btnStartAns').textContent = "Resume Answer";
    document.getElementById('btnStartAns').classList.remove('hidden');
    document.getElementById('btnPauseAns').classList.add('hidden');
    
    document.getElementById('miStatus').innerHTML = '<span class="recording-dot"></span> PAUSED';

    if (recognition) {
        try { recognition.stop(); } catch(e) {}
    }
}

async function finishAnswer() {
    isRecording = false;
    document.getElementById('miRecordingUI').classList.add('hidden');
    
    document.getElementById('btnPauseAns').classList.add('hidden');
    document.getElementById('btnFinishAns').classList.add('hidden');
    document.getElementById('btnStartAns').classList.add('hidden');
    document.getElementById('btnNextQ').classList.add('hidden');
    
    document.getElementById('miStatus').innerHTML = '<span class="recording-dot"></span> EVALUATING';
    
    if (recognition) {
        try { recognition.stop(); } catch(e) {}
    }
    
    const user = typeof AppState !== 'undefined' ? AppState.getUser() : null;
    const currentQ = currentQuestions[currentMiQuestion];
    const qId = currentQ.id;
    
    try {
        // 1. Save transcript answer to interview_answers
        const mockAnswerText = transcriptText.trim() || "No audio detected. (Mock transcription fallback)";
        const { data: answerData, error: ansErr } = await window.db
            .from('interview_answers')
            .insert([{
                attempt_id: currentAttemptId,
                question_id: qId,
                user_id: user?.id,
                answer_text: mockAnswerText
            }])
            .select()
            .single();
        let answerId = `mock-ans-${Date.now()}`;
        if (ansErr) {
            console.warn("Could not insert answer (RLS restricted?), proceeding locally.", ansErr);
        } else if (answerData) {
            answerId = answerData.id;
        }

        // 2. Mock AI Evaluation (would call backend here if available)
        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        const feedbackText = `Good attempt. You covered some points, but could have elaborated more on ${currentQ.question_text ? 'this topic' : 'the core concepts'}.`;
        
        // 3. Save feedback to interview_feedback
        const { error: feedErr } = await window.db
            .from('interview_feedback')
            .insert([{
                answer_id: answerId,
                attempt_id: currentAttemptId,
                score: score,
                feedback_text: feedbackText
            }]);
            
        if (feedErr) {
            console.warn("Could not insert feedback, proceeding locally.", feedErr);
        }

        // 4. Update UI to finished state
        document.getElementById('miFinishedUI').classList.remove('hidden');
        document.getElementById('miStatus').innerHTML = '<span class="recording-dot is-success"></span> COMPLETE';
        document.getElementById('btnNextQ').classList.remove('hidden');
        
        if (currentMiQuestion === currentQuestions.length - 1) {
            document.getElementById('btnNextQ').textContent = "Submit Interview";
        }
    } catch (e) {
        console.error("Failed to process answer:", e);
        alert("Failed to save answer or evaluate. Please try again.");
        document.getElementById('miStatus').innerHTML = '<span class="recording-dot is-error"></span> ERROR';
        document.getElementById('btnFinishAns').classList.remove('hidden');
    }
}

function nextMiQuestion() {
    if (currentMiQuestion < currentQuestions.length - 1) {
        currentMiQuestion++;
        document.getElementById('miProgressText').textContent = `Question ${currentMiQuestion + 1} / ${currentQuestions.length}`;
        document.getElementById('miProgressBar').style.width = `${((currentMiQuestion + 1) / currentQuestions.length) * 100}%`;
        
        const qText = currentQuestions[currentMiQuestion].question_text || currentQuestions[currentMiQuestion];
        document.getElementById('miQuestionText').textContent = `"${qText}"`;
        
        transcriptText = "";
        const transcriptBox = document.getElementById('miTranscriptBox');
        if (transcriptBox) transcriptBox.value = "";
        
        document.getElementById('btnStartAns').textContent = "Start Answer";
        resetMiUI();
    } else {
        finishInterview();
    }
}

async function finishInterview() {
    clearInterval(miTimerInterval);
    stopMediaStream();
    if (recognition) {
        try { recognition.stop(); } catch(e) {}
    }
    
    try {
        // 1. Fetch all feedbacks for this attempt
        const { data: feedbacks, error: fErr } = await window.db
            .from('interview_feedback')
            .select('score, feedback_text')
            .eq('attempt_id', currentAttemptId);
            
        if (fErr) {
            console.warn("Could not fetch feedback (RLS restricted?), proceeding locally.", fErr);
        }
        
        let totalScore = 0;
        let count = 0;
        
        if (feedbacks && feedbacks.length > 0) {
            feedbacks.forEach(f => {
                totalScore += f.score || 0;
                count++;
            });
        }
        
        const finalScore = count > 0 ? Math.round(totalScore / count) : 0;
        
        // 2. Update the attempt in Supabase (don't block on error)
        window.db.from('interview_attempts')
            .update({
                status: 'completed',
                overall_score: finalScore,
                completed_at: new Date().toISOString()
            })
            .eq('id', currentAttemptId)
            .then(({error}) => { if (error) console.warn("Failed to update attempt:", error); });
            
        // 3. Update the mockInterviews table (so the library UI updates)
        window.db.from('mockInterviews')
            .update({
                status: 'Completed',
                score: finalScore,
                isNew: false
            })
            .eq('id', currentInterview.id)
            .then(({error}) => { if (error) console.warn("Failed to update mockInterview:", error); });
            
        // 4. Update local state
        currentInterview.score = finalScore;
        currentInterview.status = 'Completed';
        currentInterview.isNew = false;
        localStorage.setItem('levelup_mock_interviews', JSON.stringify(allInterviews)); // keep local sync for speed
        
        // Mock readiness update (optional sync to DB if user_progress table exists)
        const readinessData = {
            score: Math.min(100, Math.round((finalScore + 74) / 2)),
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('levelup_interview_readiness', JSON.stringify(readinessData));
        
        // Render Results
        document.getElementById('miScoreText').textContent = finalScore;
        
        // Since we are mocking AI, let's inject dynamic strengths/weaknesses based on average
        if (document.getElementById('miStrengthsList')) {
            document.getElementById('miStrengthsList').innerHTML = '<li>Good communication</li><li>Structured answers</li>';
        }
        if (document.getElementById('miWeaknessesList')) {
            document.getElementById('miWeaknessesList').innerHTML = '<li>Need more technical depth</li>';
        }
        
        showMiView('miFeedbackView');
        
    } catch (e) {
        console.error("Failed to finish interview:", e);
        alert("Failed to save final interview score.");
        showMiView('miFeedbackView');
    }
}

// --- Media Stream & Cosmetic Toggles for New UI ---
let isMuted = false;
let isVideoOff = false;

async function initMediaStream() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const videoElement = document.getElementById('userVideoPreview');
        if (videoElement) {
            videoElement.srcObject = mediaStream;
            videoElement.style.display = 'block';
        }
        const pipPlaceholder = document.querySelector('.pip-placeholder');
        if (pipPlaceholder) {
            pipPlaceholder.style.display = 'none';
        }
        
        isMuted = false;
        isVideoOff = false;
        
        const micBtns = document.querySelectorAll('.ctrl-btn[onclick="toggleMute(this)"]');
        micBtns.forEach(btn => {
            btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            btn.style.color = '#fff';
        });
        
        const vidBtns = document.querySelectorAll('.ctrl-btn[onclick="toggleVideo(this)"]');
        vidBtns.forEach(btn => {
            btn.innerHTML = '<i class="fa-solid fa-video"></i>';
            btn.style.color = '#fff';
        });
        
    } catch (e) {
        console.error("Camera/Mic access denied or unavailable", e);
    }
}

function stopMediaStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    const videoElement = document.getElementById('userVideoPreview');
    if (videoElement) {
        videoElement.srcObject = null;
        videoElement.style.display = 'none';
    }
    const pipPlaceholder = document.querySelector('.pip-placeholder');
    if (pipPlaceholder) {
        pipPlaceholder.style.display = 'flex';
        pipPlaceholder.innerHTML = '<i class="fa-solid fa-video-slash text-muted" style="font-size: 3rem;"></i>';
    }
}

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            if (finalTranscript) {
                transcriptText += finalTranscript + ' ';
            }
            
            const transcriptBox = document.getElementById('miTranscriptBox');
            if (transcriptBox) {
                transcriptBox.value = transcriptText + interimTranscript;
                transcriptBox.scrollTop = transcriptBox.scrollHeight;
            }
        };
        
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    } else {
        console.warn("Speech recognition not supported in this browser.");
    }
}

function toggleMute(btn) {
    isMuted = !isMuted;
    
    if (mediaStream) {
        const audioTrack = mediaStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !isMuted;
        }
    }
    
    if (isMuted) {
        btn.innerHTML = '<i class=\"fa-solid fa-microphone-slash text-error\"></i>';
        btn.style.color = 'var(--error)';
    } else {
        btn.innerHTML = '<i class=\"fa-solid fa-microphone\"></i>';
        btn.style.color = '#fff';
    }
}

function toggleVideo(btn) {
    isVideoOff = !isVideoOff;
    const pipPlaceholder = document.querySelector('.pip-placeholder');
    const videoElement = document.getElementById('userVideoPreview');
    
    if (mediaStream) {
        const videoTrack = mediaStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !isVideoOff;
        }
    }
    
    if (isVideoOff) {
        btn.innerHTML = '<i class=\"fa-solid fa-video-slash text-error\"></i>';
        if (videoElement) videoElement.style.display = 'none';
        if (pipPlaceholder) {
            pipPlaceholder.style.display = 'flex';
            pipPlaceholder.innerHTML = '<i class=\"fa-solid fa-video-slash text-muted\" style=\"font-size: 3rem;\"></i>';
        }
    } else {
        btn.innerHTML = '<i class=\"fa-solid fa-video\"></i>';
        btn.style.color = '#fff'; // Reset color
        if (videoElement && mediaStream && mediaStream.getVideoTracks().length > 0) {
             videoElement.style.display = 'block';
             if (pipPlaceholder) pipPlaceholder.style.display = 'none';
        } else {
            // fallback if no camera
            if (pipPlaceholder) {
                pipPlaceholder.style.display = 'flex';
                pipPlaceholder.innerHTML = '<i class=\"fa-solid fa-user\" style=\"font-size: 3rem; color: rgba(255,255,255,0.1);\"></i>';
            }
        }
    }
}
