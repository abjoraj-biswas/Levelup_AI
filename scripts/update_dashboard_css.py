import re

with open('css/dashboard.css', 'r') as f:
    content = f.read()

# Make sidebar glassmorphic
content = re.sub(
    r'\.sidebar\s*\{[\s\S]*?\}',
    r'''.sidebar {
    width: var(--sidebar-width);
    background: rgba(10, 11, 26, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    border-right: 1px solid var(--glass-border, rgba(255,255,255,0.05));
    display: flex;
    flex-direction: column;
    transition: var(--transition-normal);
    z-index: 100;
}''',
    content
)

# Make topbar glassmorphic
content = re.sub(
    r'\.topbar\s*\{[\s\S]*?\}',
    r'''.topbar {
    height: var(--topbar-height);
    background: rgba(5, 5, 15, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: sticky;
    top: 0;
    z-index: 90;
    border-bottom: 1px solid var(--glass-border, rgba(255,255,255,0.05));
}''',
    content
)

# Update cards to bento style
content = re.sub(
    r'\.card\s*\{[\s\S]*?\}',
    r'''.card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.05));
    border-radius: 24px;
    padding: 24px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}
.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
    pointer-events: none;
}''',
    content
)

content = re.sub(
    r'\.card:hover\s*\{[\s\S]*?\}',
    r'''.card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.05);
}''',
    content
)

with open('css/dashboard.css', 'w') as f:
    f.write(content)

print("dashboard.css updated successfully.")
