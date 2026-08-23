import re

with open("index.html", "r") as f:
    content = f.read()

# 1. Scale updates in CSS
content = content.replace("body.landing-page {\n            background-color: var(--bg-primary);", "body.landing-page {\n            font-size: 1.1rem;\n            background-color: var(--bg-primary);")
content = content.replace(".hero-title {\n            font-size: 5rem;", ".hero-title {\n            font-size: 6rem;")
content = content.replace(".section-title {\n            font-size: 3rem;", ".section-title {\n            font-size: 3.5rem;")
content = content.replace(".bento-card {\n            background: var(--glass-bg);", ".bento-card {\n            padding: 50px;\n            background: var(--glass-bg);")
content = content.replace("padding: 40px;", "") # Remove old padding from bento-card
content = content.replace(".journey-content {\n            width: 42%;", ".journey-content {\n            padding: 40px;\n            width: 42%;")

# 2. Ecosystem section & Footer replacement
ecosystem_and_footer = """
    <!-- Ecosystem Summary Section -->
    <section class="ecosystem-section" id="ecosystem" style="padding: 120px 20px; max-width: 1200px; margin: 0 auto;">
        <div style="text-align:center; margin-bottom:80px;" class="reveal">
            <span class="section-tag">Complete Overview</span>
            <h2 class="section-title">The LevelUP Ecosystem</h2>
            <p style="color:var(--text-secondary); max-width:700px; margin: 0 auto; font-size:1.1rem;">Explore every tool and feature designed to take you from a curious beginner to a hired professional.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <!-- Categories -->
            <div class="glass-card reveal" style="padding:40px; border-radius:24px;">
                <i data-lucide="book-open" style="color:var(--primary); margin-bottom:20px; width:40px; height:40px;"></i>
                <h3 style="margin-bottom:15px; font-size:1.5rem;">Learning & Skills</h3>
                <ul style="list-style:none; padding:0; margin:0; color:var(--text-secondary); line-height:2.2;">
                    <li><a href="skills.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Skill Library</a></li>
                    <li><a href="skill-details.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Interactive Courses</a></li>
                    <li><a href="learning.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Learning Paths</a></li>
                </ul>
            </div>

            <div class="glass-card reveal" style="padding:40px; border-radius:24px;">
                <i data-lucide="target" style="color:var(--success); margin-bottom:20px; width:40px; height:40px;"></i>
                <h3 style="margin-bottom:15px; font-size:1.5rem;">Assessment</h3>
                <ul style="list-style:none; padding:0; margin:0; color:var(--text-secondary); line-height:2.2;">
                    <li><a href="assessments.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Adaptive Tests</a></li>
                    <li><a href="progress.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Progress Analytics</a></li>
                    <li><a href="recommendations.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">AI Recommendations</a></li>
                </ul>
            </div>

            <div class="glass-card reveal" style="padding:40px; border-radius:24px;">
                <i data-lucide="shield-alert" style="color:var(--danger); margin-bottom:20px; width:40px; height:40px;"></i>
                <h3 style="margin-bottom:15px; font-size:1.5rem;">Prove Your Skills</h3>
                <ul style="list-style:none; padding:0; margin:0; color:var(--text-secondary); line-height:2.2;">
                    <li><a href="bughunting.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Bug Hunting</a></li>
                    <li><a href="bug-details.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Active Bounties</a></li>
                    <li><a href="mock-interviews.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">AI Mock Interviews</a></li>
                </ul>
            </div>

            <div class="glass-card reveal" style="padding:40px; border-radius:24px;">
                <i data-lucide="building-2" style="color:#e0e0e0; margin-bottom:20px; width:40px; height:40px;"></i>
                <h3 style="margin-bottom:15px; font-size:1.5rem;">Enterprise & Jobs</h3>
                <ul style="list-style:none; padding:0; margin:0; color:var(--text-secondary); line-height:2.2;">
                    <li><a href="corporate.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Corporate Portal</a></li>
                    <li><a href="company-details.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Company Profiles</a></li>
                    <li><a href="opportunity-details.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Job Opportunities</a></li>
                </ul>
            </div>

            <div class="glass-card reveal" style="padding:40px; border-radius:24px;">
                <i data-lucide="user" style="color:var(--secondary); margin-bottom:20px; width:40px; height:40px;"></i>
                <h3 style="margin-bottom:15px; font-size:1.5rem;">Your Profile</h3>
                <ul style="list-style:none; padding:0; margin:0; color:var(--text-secondary); line-height:2.2;">
                    <li><a href="dashboard.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Main Dashboard</a></li>
                    <li><a href="profile.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">User Profile</a></li>
                    <li><a href="career-profile.html" style="color:inherit; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='inherit'">Career Profile</a></li>
                </ul>
            </div>
            
            <div class="glass-card reveal" style="padding:40px; border-radius:24px; background: rgba(0, 240, 255, 0.05); border-color: rgba(0, 240, 255, 0.2); display:flex; flex-direction:column; justify-content:center;">
                <i data-lucide="rocket" style="color:var(--primary); margin-bottom:20px; width:40px; height:40px;"></i>
                <h3 style="margin-bottom:15px; font-size:1.5rem;">Ready to Start?</h3>
                <p style="color:var(--text-secondary); margin-bottom: 25px; line-height:1.6;">Join thousands of developers leveling up their careers today.</p>
                <button class="btn-glow primary" onclick="window.location.href='login.html'" style="width:100%; justify-content:center;">Create Account</button>
            </div>
        </div>
    </section>

    <!-- Fat Footer -->
    <footer style="background: rgba(5,5,15,0.9); border-top: 1px solid var(--glass-border); padding: 80px 20px 40px; margin-top: 50px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 60px;">
            <!-- Brand -->
            <div style="grid-column: span 2;">
                <div class="logo" style="font-size:2rem; margin-bottom: 15px;">LevelUP<span style="color:var(--primary)">.AI</span></div>
                <p style="color:var(--text-secondary); font-size: 0.95rem; line-height: 1.6; max-width: 300px; margin-bottom: 25px;">
                    The intelligent platform that tracks your skills, targets your weaknesses, and accelerates your tech career.
                </p>
                <div style="display:flex; gap: 15px;">
                    <a href="#" style="color:var(--text-secondary); font-size:1.4rem; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-secondary)'"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#" style="color:var(--text-secondary); font-size:1.4rem; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-secondary)'"><i class="fa-brands fa-github"></i></a>
                    <a href="#" style="color:var(--text-secondary); font-size:1.4rem; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-secondary)'"><i class="fa-brands fa-discord"></i></a>
                    <a href="#" style="color:var(--text-secondary); font-size:1.4rem; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-secondary)'"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>

            <!-- Product -->
            <div>
                <h4 style="color: #fff; margin-bottom: 20px; font-size: 1.2rem;">Product</h4>
                <ul style="list-style:none; padding:0; margin:0; line-height: 2.2;">
                    <li><a href="assessments.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Adaptive Assessments</a></li>
                    <li><a href="mock-interviews.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Mock Interviews</a></li>
                    <li><a href="bughunting.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Bug Hunting</a></li>
                    <li><a href="recommendations.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">AI Coach</a></li>
                </ul>
            </div>

            <!-- Resources -->
            <div>
                <h4 style="color: #fff; margin-bottom: 20px; font-size: 1.2rem;">Resources</h4>
                <ul style="list-style:none; padding:0; margin:0; line-height: 2.2;">
                    <li><a href="skills.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Skill Library</a></li>
                    <li><a href="learning.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Learning Paths</a></li>
                    <li><a href="#" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Help Center</a></li>
                    <li><a href="#" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">API Documentation</a></li>
                </ul>
            </div>

            <!-- Company -->
            <div>
                <h4 style="color: #fff; margin-bottom: 20px; font-size: 1.2rem;">Company</h4>
                <ul style="list-style:none; padding:0; margin:0; line-height: 2.2;">
                    <li><a href="corporate.html" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">For Enterprise</a></li>
                    <li><a href="#" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">About Us</a></li>
                    <li><a href="#" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Privacy Policy</a></li>
                    <li><a href="#" style="color:var(--text-secondary); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">Terms of Service</a></li>
                </ul>
            </div>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <p style="color:var(--text-muted); font-size:0.9rem; margin:0;">© 2024 LevelUP AI. All rights reserved.</p>
            <div style="display:flex; gap: 20px; color:var(--text-muted); font-size:0.9rem;">
                <span>Designed with precision</span>
                <span>System Status: <span style="color:var(--success);">● All Systems Operational</span></span>
            </div>
        </div>
    </footer>
"""

old_footer_regex = re.compile(r"<!-- Footer -->.*?</script>", re.DOTALL)
content = old_footer_regex.sub(ecosystem_and_footer + "\n\n    <!-- Scripts for animations -->\n    <script>", content)

with open("index.html", "w") as f:
    f.write(content)

print("Updated index.html successfully")
