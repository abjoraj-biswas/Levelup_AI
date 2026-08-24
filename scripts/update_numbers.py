import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace inline styles with class
content = re.sub(
    r'<h1 style="color:var\(--glass-border\); font-size:3rem; margin:0 0 10px 0; line-height:1;">(\d{2})</h1>',
    r'<h1 class="step-number">\1</h1>',
    content
)

# Add CSS for .step-number
css = """
        .step-number {
            font-size: 5rem;
            font-weight: 900;
            margin: 0 0 10px 0;
            line-height: 1;
            background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            display: inline-block;
            letter-spacing: -0.05em;
        }

        .journey-step.line-active .step-number {
            background: var(--hyper-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.5));
            transform: scale(1.15) translateX(5px);
        }
"""
content = content.replace("/* Journey Timeline */", css + "\n        /* Journey Timeline */")

with open('index.html', 'w') as f:
    f.write(content)
