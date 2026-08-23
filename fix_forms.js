const fs = require('fs');

const content = fs.readFileSync('login.html', 'utf8');

const formsBlock = `                <!-- Login Form -->
                <div id="form-login" class="form-section active">
                    <div class="stagger-item">
                        <h2 class="mb-1">Welcome Back</h2>
                        <p class="text-secondary mb-4" style="font-size: 0.95rem;">Enter your credentials to access your dashboard.</p>
                    </div>

                    <form onsubmit="handleAuth(event, 'login')">
                        <div class="input-group stagger-item">
                            <label>Email Address</label>
                            <div class="input-wrapper">
                                <i class="fa-regular fa-envelope icon"></i>
                                <input type="email" placeholder="alex@example.com" required>
                            </div>
                        </div>

                        <div class="input-group stagger-item">
                            <label>Password</label>
                            <div class="input-wrapper">
                                <i class="fa-solid fa-lock icon"></i>
                                <input type="password" id="loginPass" placeholder="••••••••" required>
                                <button type="button" class="password-toggle" onclick="togglePassword('loginPass')">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div class="form-options stagger-item">
                            <label class="checkbox-container">
                                <input type="checkbox" checked>
                                Remember me
                            </label>
                            <a href="#" class="forgot-link">Forgot Password?</a>
                        </div>

                        <button type="submit" class="btn-primary stagger-item" style="width: 100%; padding: 14px; font-size: 1.05rem;">
                            Sign In to Account
                        </button>
                    </form>
                </div>

                <!-- Register Form -->
                <div id="form-register" class="form-section">
                    <div class="stagger-item">
                        <h2 class="mb-1">Start Your Journey</h2>
                        <p class="text-secondary mb-4" style="font-size: 0.95rem;">Create an account to level up your skills.</p>
                    </div>

                    <form onsubmit="handleAuth(event, 'register')">
                        <div class="grid-2 stagger-item" style="gap: 15px; grid-template-columns: 1fr 1fr; margin-bottom: 0;">
                            <div class="input-group" style="margin-bottom: 15px;">
                                <label>Full Name</label>
                                <div class="input-wrapper">
                                    <i class="fa-regular fa-id-card icon"></i>
                                    <input type="text" placeholder="Alex Sharma" required>
                                </div>
                            </div>
                            <div class="input-group" style="margin-bottom: 15px;">
                                <label>Username</label>
                                <div class="input-wrapper">
                                    <i class="fa-solid fa-at icon"></i>
                                    <input type="text" placeholder="alex.sharma" required>
                                </div>
                            </div>
                        </div>

                        <div class="input-group stagger-item" style="margin-bottom: 15px;">
                            <label>Email Address</label>
                            <div class="input-wrapper">
                                <i class="fa-regular fa-envelope icon"></i>
                                <input type="email" placeholder="alex@example.com" required>
                            </div>
                        </div>

                        <div class="input-group stagger-item" style="margin-bottom: 15px;">
                            <label>Password</label>
                            <div class="input-wrapper">
                                <i class="fa-solid fa-lock icon"></i>
                                <input type="password" id="regPass" placeholder="Create a password" required>
                                <button type="button" class="password-toggle" onclick="togglePassword('regPass')">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="btn-primary stagger-item" style="width: 100%; padding: 14px; font-size: 1.05rem; margin-top: 10px;">
                            Create Account
                        </button>
                    </form>
                </div>`;

const startIdx = content.indexOf('                <!-- Login Form -->');
const endIdx = content.indexOf('                <div class="divider stagger-item" style="animation-delay: 0.4s;">Or continue with</div>');

if (startIdx !== -1 && endIdx !== -1) {
    const fixedContent = content.substring(0, startIdx) + formsBlock + '\n\n' + content.substring(endIdx);
    fs.writeFileSync('login.html', fixedContent, 'utf8');
    console.log("Fixed forms in login.html");
} else {
    console.log("Could not find delimiters");
}
