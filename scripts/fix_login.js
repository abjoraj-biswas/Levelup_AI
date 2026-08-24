const fs = require('fs');

const content = fs.readFileSync('login.html', 'utf8');

const missingBlock = `</script>

    <div class="auth-layout">
        
        <!-- Left Branding Area (Hidden on Mobile) -->
        <div class="auth-brand">
            <div class="brand-content">
                <div class="logo brand-logo" style="font-weight: 900; letter-spacing: 1px;">LevelUP<span style="color: #00e5ff;">.AI</span></div>
                <h2 class="mb-4 text-gradient">Your Career, Supercharged.</h2>
                
                <div class="brand-feature">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0, 240, 255, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div>
                        <h4 style="font-size: 1rem;">Personalized AI Coach</h4>
                        <p class="text-secondary" style="font-size: 0.85rem;">Get tailored learning recommendations.</p>
                    </div>
                </div>

                <div class="brand-feature">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(112, 0, 255, 0.1); color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                        <h4 style="font-size: 1rem;">Smart Tracking</h4>
                        <p class="text-secondary" style="font-size: 0.85rem;">Monitor your progress across all skills.</p>
                    </div>
                </div>

                <div class="brand-feature">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0, 255, 136, 0.1); color: var(--success); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                        <i class="fa-solid fa-briefcase"></i>
                    </div>
                    <div>
                        <h4 style="font-size: 1rem;">Career Ready</h4>
                        <p class="text-secondary" style="font-size: 0.85rem;">Build a portfolio of verified competencies.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Form Area -->
        <div class="auth-form-container">
            <div class="top-actions">
                <button class="theme-toggle-btn auth-theme-btn" title="Toggle Theme"></button>
                <a href="index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i> Home</a>
            </div>
            
            <div class="auth-card">
                <div class="auth-tabs" data-active="login" id="authTabsContainer">
                    <div class="auth-tab-indicator"></div>
                    <div class="auth-tab active" onclick="switchTab('login')" id="tab-login">Sign In</div>
                    <div class="auth-tab" onclick="switchTab('register')" id="tab-register">Create Account</div>
                </div>

                <!-- Login Form -->
                <div id="form-login" class="form-section active">
                    <div class="stagger-item">
`;

// Find where the script ends
const scriptEndMatch = "        document.body.classList.add('light-mode');\n    }";

const parts = content.split(scriptEndMatch);

if (parts.length === 2) {
    const fixedContent = parts[0] + scriptEndMatch + "\n" + missingBlock + parts[1].trimStart();
    fs.writeFileSync('login.html', fixedContent, 'utf8');
    console.log("Fixed login.html");
} else {
    console.log("Could not split properly");
}
