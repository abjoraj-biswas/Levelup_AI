/**
 * Bug Hunting Logic
 */

document.addEventListener('AppDataLoaded', () => {
    initBugHunting();
});

function initBugHunting() {
    renderBugHunts();
    renderUserBugs();
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    const duration = 2000; // 2 seconds
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || 0);
        
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            let current = easeProgress * target;
            
            let formatted;
            if (decimals === 0) {
                // If it's a whole number, random fluctuations will just be rounding correctly
                formatted = Math.floor(current).toLocaleString();
            } else {
                formatted = current.toFixed(decimals);
            }
            
            counter.innerText = formatted;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (decimals === 0) {
                    counter.innerText = target.toLocaleString();
                } else {
                    counter.innerText = target.toFixed(decimals);
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

function renderBugHunts() {
    const container = document.getElementById('bugHuntsContainer');
    if(!container) return;

    const categoryFilter = document.getElementById('filterCategory').value;
    const difficultyFilter = document.getElementById('filterDifficulty').value;
    const rewardFilter = document.getElementById('filterReward').value;
    const statusFilter = document.getElementById('filterStatus').value;

    let hunts = AppState.getBugHunts();

    // Apply Filters
    if (categoryFilter !== 'All') {
        hunts = hunts.filter(h => h.category === categoryFilter);
    }
    if (difficultyFilter !== 'All') {
        hunts = hunts.filter(h => h.difficulty === difficultyFilter);
    }
    if (statusFilter !== 'All') {
        hunts = hunts.filter(h => h.status === statusFilter);
    }
    if (rewardFilter !== 'All') {
        hunts = hunts.filter(h => {
            // Rough parsing of reward pool string like "₹25,000"
            const amount = parseInt(h.rewardPool.replace(/[^0-9]/g, ''));
            if(rewardFilter === 'Under5k') return amount < 5000;
            if(rewardFilter === '5kto10k') return amount >= 5000 && amount <= 10000;
            if(rewardFilter === '10kto25k') return amount > 10000 && amount <= 25000;
            if(rewardFilter === 'Over25k') return amount > 25000;
            return true;
        });
    }

    if (hunts.length === 0) {
        container.innerHTML = '<div style="grid-column: span 3; text-align: center; padding: 40px;" class="text-muted">No bug hunts match your filters.</div>';
        return;
    }

    container.innerHTML = hunts.map(hunt => {
        let statusClass = 'status-dot';
        if(hunt.status === 'Ending Soon') statusClass += ' ending';
        if(hunt.status === 'Completed') statusClass += ' closed';

        return `
            <div class="glass-card bug-hunt-card" style="padding: 25px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 style="font-size: 1.2rem; line-height: 1.3;">${hunt.title}</h3>
                        <div class="badge">${hunt.difficulty}</div>
                    </div>
                    <p class="text-secondary mb-3">${hunt.company}</p>
                    
                    <div class="grid-2 mb-4" style="gap: 15px;">
                        <div>
                            <p class="text-secondary" style="font-size:0.8rem;">Reward Pool</p>
                            <p style="font-weight: 600; color: var(--success);">${hunt.rewardPool}</p>
                        </div>
                        <div>
                            <p class="text-secondary" style="font-size:0.8rem;">Time Left</p>
                            <p style="font-weight: 600;">${hunt.timeRemaining}</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="flex justify-between items-center mb-3 text-secondary" style="font-size: 0.9rem;">
                        <span><i class="fa-solid fa-bug"></i> ${hunt.bugsFound} Bugs Found</span>
                        <span><span class="${statusClass}"></span> ${hunt.status}</span>
                    </div>
                    <button class="btn-primary w-full" onclick="window.location.href='bug-details.html?id=${hunt.id}'">View Bug Hunt</button>
                </div>
            </div>
        `;
    }).join('');
}

window.filterHunts = function() {
    renderBugHunts();
}

function renderUserBugs() {
    const table = document.getElementById('userBugsTable');
    if(!table) return;

    const bugs = AppState.getUserBugs();
    
    if(bugs.length === 0) {
        table.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No bug reports submitted yet.</td></tr>';
        return;
    }

    table.innerHTML = bugs.map(bug => {
        let statusBadge = '';
        if(bug.status === 'Accepted') statusBadge = `<span class="badge" style="background: rgba(0, 255, 136, 0.1); color: var(--success); border: none;">${bug.status}</span>`;
        else if(bug.status === 'Duplicate' || bug.status === 'Rejected') statusBadge = `<span class="badge" style="background: rgba(255, 51, 102, 0.1); color: var(--danger); border: none;">${bug.status}</span>`;
        else statusBadge = `<span class="badge" style="background: rgba(255, 184, 0, 0.1); color: var(--warning); border: none;">${bug.status}</span>`;

        return `
            <tr>
                <td style="font-weight: 500;">${bug.title}</td>
                <td class="text-secondary">${bug.website}</td>
                <td>${bug.severity}</td>
                <td>${statusBadge}</td>
                <td style="color: var(--success); font-weight: 600;">${bug.reward}</td>
            </tr>
        `;
    }).join('');
}

window.submitBugReport = function() {
    // Collect form data
    const title = document.getElementById('bugTitle').value.trim();
    const type = document.getElementById('bugType').value;
    const severity = document.getElementById('bugSeverity').value;
    
    if(!title) {
        showToast("Please enter a bug title", "warning");
        return;
    }

    // Add to state
    AppState.addUserBug({
        id: Date.now(),
        title: title,
        website: "Student Portal Website", // Hardcoded for demo
        severity: severity,
        status: "Submitted",
        reward: "—"
    });

    closeAllModals();
    showToast("✓ Bug report submitted successfully", "success");
    
    // Clear form
    document.getElementById('bugTitle').value = '';
    
    // Rerender table if on the bughunting page
    if(document.getElementById('userBugsTable')) {
        renderUserBugs();
    }
}
