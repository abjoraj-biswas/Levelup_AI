import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Add CSS for .line-active
css_addition = """
        .journey-step.line-active .journey-content {
            border-color: var(--primary);
            box-shadow: 0 0 35px rgba(0, 240, 255, 0.2);
            background: rgba(0, 240, 255, 0.04);
            transform: scale(1.03) translateY(0);
        }
"""
content = content.replace(".journey-step.visible .journey-content {\n            opacity: 1;\n            transform: translateY(0);\n        }", ".journey-step.visible .journey-content {\n            opacity: 1;\n            transform: translateY(0);\n        }\n" + css_addition)

# 2. Add Javascript logic
js_addition = """
                // Clamp between 0 and 100
                percentage = Math.max(0, Math.min(100, percentage));
                journeyLineFill.style.height = `${percentage}%`;
                
                // Activate steps when line reaches them
                const journeySteps = document.querySelectorAll('.journey-step');
                journeySteps.forEach(step => {
                    const dot = step.querySelector('.journey-dot');
                    if(dot) {
                        const dotRect = dot.getBoundingClientRect();
                        if (dotRect.top <= (viewportHeight / 2) + 10) {
                            step.classList.add('line-active');
                        } else {
                            step.classList.remove('line-active');
                        }
                    }
                });
"""
content = content.replace("                // Clamp between 0 and 100\n                percentage = Math.max(0, Math.min(100, percentage));\n                journeyLineFill.style.height = `${percentage}%`;", js_addition)

with open('index.html', 'w') as f:
    f.write(content)
