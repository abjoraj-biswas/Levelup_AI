with open('index.html', 'r') as f:
    content = f.read()

# 1. Update the HTML structure of the nav to center the links and remove icons
old_nav_html = """    <nav class="landing-nav">
        <div class="logo">LevelUP<span style="color:var(--primary)">.AI</span></div>
        <div class="nav-links hidden-mobile">
            <a href="#"><i data-lucide="home"></i> Home</a>
            <a href="#features"><i data-lucide="layout"></i> Platform</a>
            <a href="#journey"><i data-lucide="map"></i> Journey</a>
            <a href="#ecosystem"><i data-lucide="component"></i> Ecosystem</a>
        </div>
        <div style="display:flex; align-items:center; gap: 15px;">
            <a href="login.html"
                style="color:var(--text-primary); text-decoration:none; font-weight:500; font-size:0.95rem;">Log in</a>
            <button class="btn-glow primary" onclick="window.location.href='login.html'">
                Get Started
                <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
        </div>
    </nav>"""

new_nav_html = """    <nav class="landing-nav">
        <div class="logo" style="flex: 1;">LevelUP<span style="color:var(--primary)">.AI</span></div>
        <div class="nav-links hidden-mobile">
            <a href="#">Home</a>
            <a href="#features">Platform</a>
            <a href="#journey">Journey</a>
            <a href="#ecosystem">Ecosystem</a>
        </div>
        <div style="flex: 1; display:flex; justify-content: flex-end; align-items:center; gap: 15px;">
            <a href="login.html"
                style="color:var(--text-primary); text-decoration:none; font-weight:500; font-size:0.95rem;">Log in</a>
            <button class="btn-glow primary" onclick="window.location.href='login.html'">
                Get Started
                <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
        </div>
    </nav>"""

content = content.replace(old_nav_html, new_nav_html)

# 2. Update the CSS for .nav-links a to remove icon styles and adjust padding
import re
# We need to remove the `.nav-links a i` and `.nav-links a:hover i` styles from the CSS block.
css_to_remove = r"""
        \.nav-links a i \{
            width: 16px;
            height: 16px;
            stroke-width: 2\.5;
            transition: all 0\.3s ease;
        \}"""
content = re.sub(css_to_remove, "", content)

css_to_remove_2 = r"""
        \.nav-links a:hover i \{
            stroke: var\(--primary\);
            filter: drop-shadow\(0 0 8px var\(--primary\)\);
            transform: scale\(1\.1\) rotate\(-5deg\);
        \}"""
content = re.sub(css_to_remove_2, "", content)

with open('index.html', 'w') as f:
    f.write(content)
