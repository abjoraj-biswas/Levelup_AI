/**
 * Corporate Matches Logic
 */

document.addEventListener('AppDataLoaded', () => {
    if(document.getElementById('companiesContainer')) {
        initCorporate();
    }
});

function initCorporate() {
    renderCompanies();
}

function renderCompanies() {
    const container = document.getElementById('companiesContainer');
    if(!container) return;

    const industryFilter = document.getElementById('filterIndustry').value;
    const typeFilter = document.getElementById('filterType').value;
    const skillFilter = document.getElementById('filterSkill').value;

    let allCompanies = AppState.getCompanies();
    
    // Deduplicate companies by name
    let companies = [];
    const seen = new Set();
    for (const c of allCompanies) {
        if (!seen.has(c.name)) {
            seen.add(c.name);
            companies.push(c);
        }
    }

    // Apply Filters
    if (industryFilter !== 'All') {
        companies = companies.filter(c => c.category === industryFilter || (c.category.includes(industryFilter)));
    }
    if (typeFilter !== 'All') {
        companies = companies.filter(c => c.type === typeFilter);
    }
    if (skillFilter !== 'All') {
        companies = companies.filter(c => c.skills.includes(skillFilter));
    }

    if (companies.length === 0) {
        container.innerHTML = '<div style="grid-column: span 3; text-align: center; padding: 40px;" class="text-muted">No companies match your filters.</div>';
        return;
    }

    // Generate deterministic match score based on company name (between 65 and 98)
    const getMatchScore = (company) => {
        const hash = company.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return 65 + (hash % 34);
    };

    container.innerHTML = companies.map(company => {
        const matchScore = getMatchScore(company);
        let scoreClass = 'text-primary';
        if(matchScore >= 90) scoreClass = 'text-success';
        else if(matchScore >= 80) scoreClass = 'text-warning';
        else if(matchScore < 70) scoreClass = 'text-muted';

        return `
            <div class="glass-card company-card" style="padding: 25px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;" onclick="window.location.href='company-details.html?id=${company.id}'">
                <div>
                    <div class="flex justify-between items-center mb-3">
                        <div style="width: 50px; height: 50px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #333; overflow: hidden; padding: 5px;">
                            ${company.logo.startsWith('http') ? `<img src="${company.logo}" style="width: 100%; height: 100%; object-fit: contain;">` : `<i class="${company.logo}"></i>`}
                        </div>
                        <div class="badge" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); display: flex; align-items: center; gap: 6px; padding: 6px 12px;">
                            <i class="fa-solid fa-bolt ${scoreClass}"></i> ${matchScore}% Match
                        </div>
                    </div>
                    
                    <h3 class="mb-1" style="font-size: 1.3rem;">${company.name}</h3>
                    <p class="text-secondary mb-3" style="font-size: 0.9rem;">${company.category}</p>
                    
                    <div class="mb-3">
                        <p class="text-secondary mb-1" style="font-size: 0.8rem;">Looking For</p>
                        <p style="font-size: 0.9rem;">${company.roles.slice(0,2).join(', ')}${company.roles.length > 2 ? '...' : ''}</p>
                    </div>
                </div>
                
                <div>
                    <div class="flex flex-wrap gap-1 mt-3 pt-3" style="border-top: 1px solid var(--border);">
                        ${company.skills.slice(0,3).map(skill => `<span class="badge" style="font-size: 0.75rem;">${skill}</span>`).join('')}
                        ${company.skills.length > 3 ? `<span class="badge" style="font-size: 0.75rem;">+${company.skills.length - 3}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.filterCompanies = function() {
    renderCompanies();
}
