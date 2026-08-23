/**
 * Skills Logic
 */

document.addEventListener('AppDataLoaded', () => {
    initSkills();
});

function initSkills() {
    const searchInput = document.getElementById('searchSkill');
    const categorySelect = document.getElementById('filterCategory');
    const difficultySelect = document.getElementById('filterDifficulty');
    const sortSelect = document.getElementById('sortSkills');
    const clearBtn = document.getElementById('clearFiltersBtn');
    
    if(!searchInput) return; // Not on skills page

    // Check URL parameters for search query from global search
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if(searchParam) {
        searchInput.value = searchParam;
    }

    // Event Listeners
    searchInput.addEventListener('input', renderSkills);
    categorySelect.addEventListener('change', renderSkills);
    difficultySelect.addEventListener('change', renderSkills);
    sortSelect.addEventListener('change', renderSkills);
    
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = 'All';
        difficultySelect.value = 'All';
        sortSelect.value = 'Recommended';
        renderSkills();
    });

    renderSkills();
}

function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    const emptyState = document.getElementById('emptyState');
    let skills = AppState.getSkills();

    // Filters
    const query = document.getElementById('searchSkill').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    const difficulty = document.getElementById('filterDifficulty').value;
    const sort = document.getElementById('sortSkills').value;

    if (query) {
        skills = skills.filter(s => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query));
    }
    if (category !== 'All') {
        skills = skills.filter(s => s.category === category);
    }
    if (difficulty !== 'All') {
        skills = skills.filter(s => s.difficulty === difficulty);
    }

    // Sort
    if (sort === 'A-Z') {
        skills.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'Popular') {
        // Mock popular sorting (higher hours/lectures)
        skills.sort((a, b) => b.hours - a.hours);
    } else {
        // Recommended (Original Order from mock data)
        // No sort needed, or sort by lowest progress first to recommend learning
        skills.sort((a, b) => a.progress - b.progress);
    }

    // Render
    grid.innerHTML = '';
    
    if (skills.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        grid.innerHTML = skills.map(skill => `
            <div class="glass-card skill-card">
                <div class="flex items-center gap-3 mb-3">
                    <div style="width: 50px; height: 50px; background: rgba(0,240,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--primary)">
                        <i class="${skill.icon}"></i>
                    </div>
                    <div>
                        <h3 style="font-size: 1.2rem;">${skill.name}</h3>
                        <span class="badge primary mt-1" style="display:inline-block">${skill.category}</span>
                    </div>
                </div>
                
                <p class="text-secondary" style="font-size: 0.9rem; flex: 1;">${skill.desc}</p>
                
                <div class="skill-stats">
                    <div><i class="fa-solid fa-signal"></i> ${skill.difficulty}</div>
                    <div><i class="fa-solid fa-list-ul"></i> ${skill.subSkills} Sub-skills</div>
                    <div><i class="fa-solid fa-video"></i> ${skill.lectures} Lectures</div>
                    <div><i class="fa-regular fa-clock"></i> ${skill.hours} Hours</div>
                </div>
                
                <div class="mb-3">
                    <div class="flex justify-between items-center mb-1" style="font-size: 0.8rem;">
                        <span>Progress</span>
                        <span class="text-primary">${skill.progress}%</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${skill.progress}%"></div>
                    </div>
                </div>
                
                <button class="btn-primary" style="width: 100%" onclick="window.location.href='learning.html?id=${skill.id}'">Explore Skill</button>
            </div>
        `).join('');
    }
}
