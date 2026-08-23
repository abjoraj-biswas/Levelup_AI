/**
 * Dashboard Logic
 */

document.addEventListener('AppDataLoaded', () => {
    initDashboard();
});

function initDashboard() {
    const user = AppState.getUser();
    const skills = AppState.getSkills();

    // 1. Populate Stats
    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="glass-card stat-card">
                <div class="stat-info">
                    <p>Skills Learning</p>
                    <h3>${user.totalSkillsLearning ?? '-'}</h3>
                    <div class="trend up"><i class="fa-solid fa-arrow-up"></i> 2 this week</div>
                </div>
                <div class="stat-icon"><i class="fa-solid fa-book-open"></i></div>
            </div>
            
            <div class="glass-card stat-card">
                <div class="stat-info">
                    <p>Completed Skills</p>
                    <h3>${user.completedSkills ?? '-'}</h3>
                    <div class="trend up"><i class="fa-solid fa-arrow-up"></i> 1 this month</div>
                </div>
                <div class="stat-icon" style="background: rgba(0, 255, 136, 0.1); color: var(--success)"><i class="fa-solid fa-certificate"></i></div>
            </div>
            
            <div class="glass-card stat-card">
                <div class="stat-info">
                    <p>Learning Hours</p>
                    <h3>${user.learningHours ?? '-'}h</h3>
                    <div class="trend up"><i class="fa-solid fa-arrow-up"></i> 12h this week</div>
                </div>
                <div class="stat-icon" style="background: rgba(112, 0, 255, 0.1); color: var(--secondary)"><i class="fa-regular fa-clock"></i></div>
            </div>
            
            <div class="glass-card stat-card">
                <div class="stat-info">
                    <p>Current Streak</p>
                    <h3>${user.streak ?? '-'} Days</h3>
                    <div class="trend up"><i class="fa-solid fa-fire"></i> Keep it up!</div>
                </div>
                <div class="stat-icon" style="background: rgba(255, 184, 0, 0.1); color: var(--warning)"><i class="fa-solid fa-fire"></i></div>
            </div>
        `;
    }

    // 2. Populate Continue Learning
    const learningList = document.getElementById('continueLearningList');
    if (learningList) {
        // Filter skills that are in progress (progress > 0 and < 100)
        let inProgress = skills.filter(s => s.progress > 0 && s.progress < 100).sort((a,b) => b.progress - a.progress);
        
        // If none in progress, just show top 3
        if(inProgress.length === 0) {
            inProgress = skills.slice(0, 3);
        } else {
            inProgress = inProgress.slice(0, 3); // Max 3 items
        }

        learningList.innerHTML = inProgress.map((skill, index) => {
            const completedLectures = Math.floor((skill.progress / 100) * skill.lectures);
            return `
                <div class="glass-card liquid-glass-card" style="padding: 20px; display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden; z-index: 1;">
                    <div style="flex: 1; position: relative; z-index: 2;">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="${skill.icon}" style="color: var(--primary); font-size: 1.2rem;"></i>
                            <h3 style="font-size: 1.1rem;">${skill.name}</h3>
                            <span class="badge primary">${skill.category}</span>
                        </div>
                        <p class="text-secondary mb-2" style="font-size: 0.9rem;">Lectures: ${completedLectures} / ${skill.lectures}</p>
                        
                        <div class="flex items-center gap-2">
                            <div class="progress-container" style="flex: 1;">
                                <div class="progress-bar" id="prog-bar-${index}" style="width: 0%;"></div>
                            </div>
                            <span style="font-size: 0.8rem; font-weight: bold; width: 40px; text-align: right;">${skill.progress}%</span>
                        </div>
                    </div>
                    <div style="margin-left: 20px; position: relative; z-index: 2;">
                        <button class="btn-outline" onclick="window.location.href='learning.html'">Continue</button>
                    </div>
                </div>
            `;
        }).join('');

        // Animate progress bars after a slight delay
        setTimeout(() => {
            inProgress.forEach((skill, index) => {
                const bar = document.getElementById(`prog-bar-${index}`);
                if(bar) bar.style.width = `${skill.progress}%`;
            });
        }, 100);
    }

    // 3. Populate New Assessments
    const newAssessmentsList = document.getElementById('newAssessmentsList');
    if (newAssessmentsList) {
        const assessments = AppState.getAssessments() || [];
        const newAssessments = assessments.filter(a => a.isNew).slice(0, 2);
        
        if (newAssessments.length === 0) {
            newAssessmentsList.innerHTML = '<p class="text-secondary text-center p-3">No new assessments available.</p>';
        } else {
            newAssessmentsList.innerHTML = newAssessments.map(a => `
                <div class="glass-card" style="padding: 15px;">
                    <div class="flex justify-between items-center mb-1">
                        <h3 style="font-size: 1rem;">${a.title}</h3>
                        <span class="badge" style="background: rgba(0, 229, 255, 0.1); color: var(--primary);">NEW</span>
                    </div>
                    <div class="flex items-center gap-3 text-secondary mb-2" style="font-size: 0.85rem;">
                        <span><i class="fa-solid fa-list-ul"></i> ${a.category}</span>
                        <span><i class="fa-solid fa-layer-group"></i> ${a.difficulty}</span>
                    </div>
                    <button class="btn-outline w-100" style="padding: 8px;" onclick="window.location.href='assessments.html'">Start Assessment</button>
                </div>
            `).join('');
        }
    }

    // 4. Populate New Mock Interviews
    const newMockInterviewsList = document.getElementById('newMockInterviewsList');
    if (newMockInterviewsList) {
        const interviews = JSON.parse(localStorage.getItem('levelup_mock_interviews')) || [];
        const newInterviews = interviews.filter(i => i.isNew).slice(0, 2);
        
        if (newInterviews.length === 0) {
            newMockInterviewsList.innerHTML = '<p class="text-secondary text-center p-3">No new mock interviews available.</p>';
        } else {
            newMockInterviewsList.innerHTML = newInterviews.map(i => `
                <div class="glass-card" style="padding: 15px;">
                    <div class="flex justify-between items-center mb-1">
                        <h3 style="font-size: 1rem;">${i.title}</h3>
                        <span class="badge" style="background: rgba(0, 229, 255, 0.1); color: var(--primary);">NEW</span>
                    </div>
                    <div class="flex items-center gap-3 text-secondary mb-2" style="font-size: 0.85rem;">
                        <span><i class="fa-solid fa-briefcase"></i> ${i.type}</span>
                        <span><i class="fa-solid fa-clock"></i> ${i.duration} Min</span>
                    </div>
                    <button class="btn-outline w-100" style="padding: 8px;" onclick="window.location.href='mock-interviews.html'">Start Interview</button>
                </div>
            `).join('');
        }
    }

    // 5. Populate Recent Performance
    const recentPerformanceList = document.getElementById('recentPerformanceList');
    if (recentPerformanceList) {
        recentPerformanceList.innerHTML = `
            <div class="glass-card flex justify-between items-center" style="padding: 15px;">
                <div class="flex items-center gap-3">
                    <div class="stat-icon" style="width: 40px; height: 40px; font-size: 1rem;"><i class="fa-solid fa-clipboard-check"></i></div>
                    <div>
                        <h4 style="font-size: 0.9rem;">Latest Assessment</h4>
                        <span class="text-secondary" style="font-size: 0.8rem;">JavaScript Fundamentals</span>
                    </div>
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; color: #00ffaa;">82%</div>
            </div>
            <div class="glass-card flex justify-between items-center" style="padding: 15px;">
                <div class="flex items-center gap-3">
                    <div class="stat-icon" style="width: 40px; height: 40px; font-size: 1rem;"><i class="fa-solid fa-video"></i></div>
                    <div>
                        <h4 style="font-size: 0.9rem;">Latest Mock Interview</h4>
                        <span class="text-secondary" style="font-size: 0.8rem;">Frontend Developer</span>
                    </div>
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--primary);">78%</div>
            </div>
        `;
    }

    // 6. Populate Interview Readiness
    const readinessScore = document.getElementById('readinessScore');
    const readinessBar = document.getElementById('readinessBar');
    if (readinessScore && readinessBar) {
        const readinessData = JSON.parse(localStorage.getItem('levelup_interview_readiness'));
        if(readinessData) {
            readinessScore.textContent = readinessData.score + '%';
            setTimeout(() => {
                readinessBar.style.width = readinessData.score + '%';
            }, 300);
        }
    }

    // 7. Update Avatar Initial
    const topAvatar = document.getElementById('topAvatar');
    if(topAvatar && user.name) {
        topAvatar.textContent = user.name.charAt(0).toUpperCase();
    }
    
    // Mark dashboard as initialized to prevent re-triggering entrance animations on background data syncs
    document.body.classList.add('dashboard-initialized');
}
