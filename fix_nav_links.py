with open('index.html', 'r') as f:
    content = f.read()

old_html = """        <div class="nav-links hidden-mobile">
            <a href="#features"><i data-lucide="book-open"></i> Learn</a>
            <a href="#journey"><i data-lucide="dumbbell"></i> Practice</a>
            <a href="login.html"><i data-lucide="shield-alert"></i> Prove</a>
            <a href="login.html"><i data-lucide="network"></i> Network</a>
        </div>"""

new_html = """        <div class="nav-links hidden-mobile">
            <a href="#"><i data-lucide="home"></i> Home</a>
            <a href="#features"><i data-lucide="layout"></i> Platform</a>
            <a href="#journey"><i data-lucide="map"></i> Journey</a>
            <a href="#ecosystem"><i data-lucide="component"></i> Ecosystem</a>
        </div>"""

content = content.replace(old_html, new_html)

with open('index.html', 'w') as f:
    f.write(content)
