import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Replace HTML
old_html = """        <div class="nav-links">
            <a href="#features">Platform</a>
            <a href="#journey">Journey</a>
            <a href="login.html">Bug Hunting</a>
            <a href="login.html">For Enterprise</a>
        </div>"""
new_html = """        <div class="nav-links">
            <a href="#features"><i data-lucide="book-open"></i> Learn</a>
            <a href="#journey"><i data-lucide="dumbbell"></i> Practice</a>
            <a href="login.html"><i data-lucide="shield-alert"></i> Prove</a>
            <a href="login.html"><i data-lucide="network"></i> Network</a>
        </div>"""
content = content.replace(old_html, new_html)

# 2. Replace CSS
old_css_regex = re.compile(r"\s*\.nav-links \{[\s\S]*?\.nav-links a:hover::after \{[\s\S]*?\}")
new_css = """
        .nav-links {
            display: flex;
            gap: 10px;
            background: rgba(255, 255, 255, 0.03);
            padding: 6px;
            border-radius: 50px;
            border: 1px solid var(--glass-border);
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .nav-links a {
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 600;
            padding: 8px 18px;
            border-radius: 40px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            background: transparent;
        }

        .nav-links a i {
            width: 16px;
            height: 16px;
            stroke-width: 2.5;
            transition: all 0.3s ease;
        }

        .nav-links a:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
        }

        .nav-links a:hover i {
            stroke: var(--primary);
            filter: drop-shadow(0 0 8px var(--primary));
            transform: scale(1.1) rotate(-5deg);
        }"""
content = old_css_regex.sub(new_css, content)

with open('index.html', 'w') as f:
    f.write(content)
