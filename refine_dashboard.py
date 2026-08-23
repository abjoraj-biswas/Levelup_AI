import re
import glob

# 1. Update dashboard.css
with open('css/dashboard.css', 'r') as f:
    css = f.read()

# Update .card to be sober and professional
css = re.sub(
    r'\.card\s*\{[\s\S]*?\}',
    r'''.card {
    background: rgba(20, 21, 35, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 16px;
    padding: 32px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}''',
    css
)

css = re.sub(
    r'\.card::before\s*\{[\s\S]*?\}',
    r'''.card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
}''',
    css
)

css = re.sub(
    r'\.card:hover\s*\{[\s\S]*?\}',
    r'''.card:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}
.card:hover::before {
    opacity: 1;
}''',
    css
)

# Refine topbar and sidebar background slightly darker/cleaner
css = re.sub(
    r'(\.sidebar\s*\{[\s\S]*?)background: rgba\(10, 11, 26, 0.7\);',
    r'\1background: rgba(8, 9, 20, 0.8);',
    css
)

css = re.sub(
    r'(\.topbar\s*\{[\s\S]*?)background: rgba\(5, 5, 15, 0.6\);',
    r'\1background: rgba(8, 9, 20, 0.7);',
    css
)

# Increase content area padding
css = re.sub(
    r'\.content-area\s*\{[\s\S]*?\}',
    r'''.content-area {
    padding: 40px 50px;
    overflow-y: auto;
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}''',
    css
)

# Better entrance animations
anim_css = '''
/* Staggered Dashboard Load Animation - Cinematic */
@keyframes dashboardFadeInUp {
    0% { opacity: 0; transform: translateY(30px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
}

.content-area > * {
    opacity: 0;
    animation: dashboardFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.content-area > *:nth-child(1) { animation-delay: 0.05s; }
.content-area > *:nth-child(2) { animation-delay: 0.1s; }
.content-area > *:nth-child(3) { animation-delay: 0.15s; }
.content-area > *:nth-child(4) { animation-delay: 0.2s; }
.content-area > *:nth-child(5) { animation-delay: 0.25s; }
.content-area > *:nth-child(6) { animation-delay: 0.3s; }
.content-area > *:nth-child(7) { animation-delay: 0.35s; }
.content-area > *:nth-child(8) { animation-delay: 0.4s; }
.content-area > *:nth-child(9) { animation-delay: 0.45s; }
.content-area > *:nth-child(10) { animation-delay: 0.5s; }
.content-area > *:nth-child(n+11) { animation-delay: 0.6s; }

/* Apply to grid items specifically for deeper staggers */
.grid-2 > *, .grid-3 > *, .grid-4 > * {
    opacity: 0;
    animation: dashboardFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.grid-4 > *:nth-child(1) { animation-delay: 0.1s; }
.grid-4 > *:nth-child(2) { animation-delay: 0.2s; }
.grid-4 > *:nth-child(3) { animation-delay: 0.3s; }
.grid-4 > *:nth-child(4) { animation-delay: 0.4s; }
'''

css = re.sub(r'/\*\s*Staggered Dashboard Load Animation\s*\* /[\s\S]*?(?=\n\n|\Z)', anim_css, css)
# If it didn't replace, append it
if "Cinematic" not in css:
    css = re.sub(r'/\* Staggered Dashboard Load Animation \*/[\s\S]*?(?=\n\n|\Z)', anim_css, css)

with open('css/dashboard.css', 'w') as f:
    f.write(css)

# 2. Strip messy inline styles in internal pages and replace with sober classes
for file in glob.glob('*.html'):
    if file == 'index.html': continue
    
    with open(file, 'r') as f:
        html = f.read()
        
    # Example: assessments.html has .question-card, .option-btn, etc. inline.
    # Instead of deleting them and breaking the UI, we just refine them inside the HTML file
    # or migrate them. We will rewrite the inline style block for assessments if found.
    
    if "question-card" in html:
        # Refine inline styles inside the html file directly by regex replacement
        html = re.sub(
            r'\.question-card\s*\{[\s\S]*?\}',
            r'.question-card { background: rgba(20, 21, 35, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.04); border-radius: 16px; padding: 40px; }',
            html
        )
        html = re.sub(
            r'\.option-btn\s*\{[\s\S]*?\}',
            r'.option-btn { width: 100%; padding: 20px; text-align: left; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; color: var(--text-primary); font-size: 1.1rem; margin-bottom: 15px; transition: all 0.3s ease; display: flex; align-items: center; gap: 15px; }',
            html
        )
        html = re.sub(
            r'\.option-btn:hover\s*\{[\s\S]*?\}',
            r'.option-btn:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); transform: translateX(4px); }',
            html
        )
        html = re.sub(
            r'\.option-btn\.selected\s*\{[\s\S]*?\}',
            r'.option-btn.selected { background: rgba(0, 240, 255, 0.08); border-color: var(--primary); }',
            html
        )
        html = re.sub(
            r'\.score-circle\s*\{[\s\S]*?\}',
            r'.score-circle { width: 160px; height: 160px; border-radius: 50%; border: 4px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 3.5rem; font-weight: 300; font-family: "Outfit", sans-serif; margin: 0 auto 30px; box-shadow: inset 0 0 20px rgba(0,240,255,0.1); }',
            html
        )
        
    # Also standardize .glass-card if it exists inline anywhere
    html = re.sub(
        r'\.glass-card\s*\{[\s\S]*?\}',
        r'.glass-card { background: rgba(20, 21, 35, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.04); border-radius: 16px; padding: 24px; transition: transform 0.4s ease; } .glass-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.08); }',
        html
    )

    with open(file, 'w') as f:
        f.write(html)

print("Dashboard refinement applied.")
