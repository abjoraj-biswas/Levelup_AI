/**
 * Learning Course Player Logic
 */

let courseLectures = [];
let currentLectureIndex = 0;
let currentSkillId = null;

document.addEventListener('AppDataLoaded', () => {
    initLearning();
});

async function initLearning() {
    // 1. Get skill ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    let skillId = urlParams.get('id');
    
    if (!skillId) {
        // Auto-load the first skill if no ID is provided
        const skills = JSON.parse(localStorage.getItem('levelup_skills') || '[]');
        if (skills.length > 0) {
            skillId = skills[0].id;
        } else {
            // Fallback if absolutely no skills are loaded
            window.location.href = 'skills.html';
            return;
        }
    }
    currentSkillId = skillId;
    
    // Set loading state
    document.getElementById('lectureList').innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted)">Loading lectures...</div>';

    let completedIds = [];
    
    try {
        const supabase = window.db;
        if (!supabase) throw new Error("Supabase not initialized");
        
        // 2. Fetch the roadmap items (lectures) for this specific skill
        const { data: items, error: itemsErr } = await supabase
            .from('roadmap_items')
            .select('*')
            .eq('skill_id', skillId)
            .order('order_index', { ascending: true });
            
        if (itemsErr) throw itemsErr;
        if (!items || items.length === 0) throw new Error("No items in DB, fallback to local");
        
        // 3. Fetch user progress (completed lectures) if logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
            const { data: progress } = await supabase
                .from('user_progress')
                .select('completed_lectures')
                .eq('user_id', session.user.id)
                .eq('skill_id', skillId)
                .single();
                
            if (progress && progress.completed_lectures) {
                completedIds = progress.completed_lectures;
            }
        }
        
        if (items && items.length > 0) {
            // 4. Map them to the courseLectures format expected by the UI
            courseLectures = items.map(item => ({
                id: item.id,
                title: item.title,
                duration: item.duration_minutes,
                completed: completedIds.includes(item.id)
            }));
            
            // Also update the UI title to match the skill
            const skills = JSON.parse(localStorage.getItem('levelup_skills') || '[]');
            const skill = skills.find(s => s.id === skillId);
            if (skill) {
                const courseTitle = document.getElementById('courseTitle');
                if(courseTitle) courseTitle.textContent = skill.name;
            }
        } else {
            document.getElementById('lectureList').innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted)">No lectures found for this skill yet.</div>';
            return;
        }
        
    } catch (e) {
        console.error("Failed to fetch dynamic learning data", e);
        // Fallback to our new extensive course content mock data
        const allCourseContent = AppState.getCourseContent();
        if (allCourseContent && allCourseContent[skillId]) {
            courseLectures = allCourseContent[skillId];
        } else {
            console.warn(`No course content found for skill: ${skillId}`);
        }
    }
    
    // Find current active (first not completed)
    const activeIndex = courseLectures.findIndex(l => !l.completed);
    if (activeIndex !== -1) {
        currentLectureIndex = activeIndex;
    } else {
        currentLectureIndex = 0; // default to first
    }
    
    renderLectureList();
    updatePlayerContent();
}

function renderLectureList() {
    const list = document.getElementById('lectureList');
    if (!list) return;

    let completedCount = 0;

    list.innerHTML = courseLectures.map((lecture, index) => {
        let statusClass = '';
        let iconHtml = '';

        if (lecture.completed) {
            statusClass = 'completed';
            iconHtml = '<i class="fa-solid fa-check"></i>';
            completedCount++;
        } else if (index === currentLectureIndex) {
            statusClass = 'active';
            iconHtml = '<i class="fa-solid fa-play"></i>';
        } else if (index > currentLectureIndex && courseLectures[index-1] && !courseLectures[index-1].completed) {
            // Very simple locking: if previous is not completed, this is locked
            statusClass = 'locked';
            iconHtml = '<i class="fa-solid fa-lock"></i>';
        } else {
            iconHtml = ''; // empty circle
        }

        return `
            <div class="lecture-list-item ${statusClass}" onclick="selectLecture(${index})">
                <div class="lecture-icon">${iconHtml}</div>
                <div>
                    <h4 style="font-size: 0.9rem; font-weight: ${index === currentLectureIndex ? '700' : '500'}">${lecture.title}</h4>
                    <p class="text-secondary" style="font-size: 0.75rem;">12:45</p>
                </div>
            </div>
        `;
    }).join('');

    // Update Progress
    const total = courseLectures.length;
    const progress = Math.round((completedCount / total) * 100);
    
    document.getElementById('progressText').textContent = `${completedCount}/${total} Completed`;
    document.getElementById('progressPercent').textContent = `${progress}%`;
    document.getElementById('courseProgressBar').style.width = `${progress}%`;

    // Update Global App State for current skill progress
    if (currentSkillId) {
        AppState.updateSkillProgress(currentSkillId, progress);
    }
}

function updatePlayerContent() {
    const lecture = courseLectures[currentLectureIndex];
    if(!lecture) return;

    document.getElementById('lectureTitle').textContent = lecture.title;
    
    // Button States
    document.getElementById('prevLectureBtn').disabled = currentLectureIndex === 0;
    if(currentLectureIndex === 0) document.getElementById('prevLectureBtn').style.opacity = '0.5';
    else document.getElementById('prevLectureBtn').style.opacity = '1';
    
    const nextBtn = document.getElementById('nextLectureBtn');
    nextBtn.disabled = currentLectureIndex === courseLectures.length - 1;
    if(currentLectureIndex === courseLectures.length - 1) nextBtn.style.opacity = '0.5';
    else nextBtn.style.opacity = '1';

    const completeBtn = document.getElementById('markCompleteBtn');
    if (lecture.completed) {
        completeBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Completed';
        completeBtn.style.background = 'var(--success)';
        completeBtn.style.color = '#000';
    } else {
        completeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Mark as Complete';
        completeBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--secondary))';
        completeBtn.style.color = 'white';
    }
}

window.selectLecture = function(index) {
    const lectureItem = document.querySelectorAll('.lecture-list-item')[index];
    if (lectureItem && lectureItem.classList.contains('locked')) {
        showToast("Complete previous lectures to unlock this one.", "warning");
        return;
    }
    currentLectureIndex = index;
    renderLectureList();
    updatePlayerContent();
}

window.nextLecture = function() {
    if (currentLectureIndex < courseLectures.length - 1) {
        selectLecture(currentLectureIndex + 1);
    }
}

window.prevLecture = function() {
    if (currentLectureIndex > 0) {
        selectLecture(currentLectureIndex - 1);
    }
}

window.markLectureComplete = async function() {
    const lecture = courseLectures[currentLectureIndex];
    if (!lecture.completed) {
        lecture.completed = true;
        
        const completedIds = courseLectures.filter(l => l.completed).map(l => l.id);
        
        try {
            const supabase = window.db;
            if (supabase) {
                const { data: { session } } = await supabase.auth.getSession();
                if (session && session.user && currentSkillId) {
                    await supabase
                        .from('user_progress')
                        .upsert({ 
                            user_id: session.user.id, 
                            skill_id: currentSkillId, 
                            completed_lectures: completedIds 
                        }, { onConflict: 'user_id, skill_id' });
                }
            }
        } catch (e) {
            console.error("Failed to save progress to Supabase", e);
        }

        // Save to local storage fallback
        const allCourseContent = AppState.getCourseContent();
        if (allCourseContent && currentSkillId) {
            allCourseContent[currentSkillId] = courseLectures;
            localStorage.setItem('levelup_courseContent', JSON.stringify(allCourseContent));
        }
        showToast("Lecture marked as complete!");
        
        renderLectureList();
        updatePlayerContent();

        // Auto move to next if exists
        setTimeout(() => {
            if (currentLectureIndex < courseLectures.length - 1) {
                nextLecture();
            } else {
                showToast("Course completed! Take an assessment.", "success");
            }
        }, 1500);
    }
}

window.switchTab = function(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    document.getElementById('tab-overview').classList.add('hidden');
    document.getElementById('tab-notes').classList.add('hidden');
    document.getElementById('tab-resources').classList.add('hidden');
    
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
}
