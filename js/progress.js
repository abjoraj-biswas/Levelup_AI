/**
 * Progress Analytics Logic
 */

document.addEventListener('AppDataLoaded', () => {
    initProgress();
});

function initProgress() {
    // 1. Populate Skill Progress
    const skillList = document.getElementById('skillProgressList');
    if (skillList) {
        const skills = AppState.getSkills().filter(s => s.progress > 0).sort((a, b) => b.progress - a.progress);
        
        skillList.innerHTML = skills.map(skill => `
            <div>
                <div class="flex justify-between items-center mb-1">
                    <span style="font-weight: 500;">${skill.name}</span>
                    <span class="text-secondary">${skill.progress}%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${skill.progress}%"></div>
                </div>
            </div>
        `).join('');
    }

    // 2. Populate Weekly Chart
    const chart = document.getElementById('weeklyChart');
    if (chart) {
        const weeklyData = MOCK_DATA.weeklyActivity;
        const maxHours = Math.max(...weeklyData.map(d => d.hours), 5); // Minimum 5 for scale
        
        chart.innerHTML = weeklyData.map(day => {
            const heightPercent = (day.hours / maxHours) * 100;
            return `
                <div class="bar-wrapper">
                    <div class="bar" style="height: ${heightPercent}%" data-hours="${day.hours}"></div>
                    <span class="day-label">${day.day}</span>
                </div>
            `;
        }).join('');
    }
}
