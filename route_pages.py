import re

# 1. learning.html -> add link to Explore Skills
with open('learning.html', 'r') as f:
    html = f.read()
if "Explore All Skills" not in html:
    html = html.replace(
        '<h1 class="mb-1">My Learning Path</h1>',
        '<div class="flex justify-between items-center mb-4"><h1 class="mb-1" style="margin-bottom:0;">My Learning Path</h1><a href="skills.html" class="btn-glow primary">Explore All Skills <i class="fa-solid fa-arrow-right"></i></a></div>'
    )
    with open('learning.html', 'w') as f:
        f.write(html)

# 2. assessments.html -> add links to Mock Interviews & Bug Hunting
with open('assessments.html', 'r') as f:
    html = f.read()
if "Mock Interviews" not in html or "Bug Hunting" not in html or "btn-glow" not in html:
    html = html.replace(
        '<h1 class="mb-1">Assessments</h1>',
        '''<div class="flex justify-between items-center mb-4">
            <h1 class="mb-1" style="margin-bottom:0;">Practice Hub</h1>
            <div style="display:flex; gap:15px;">
                <a href="mock-interviews.html" class="btn-glow primary"><i class="fa-solid fa-video"></i> Mock Interviews</a>
                <a href="bughunting.html" class="btn-glow primary"><i class="fa-solid fa-bug"></i> Bug Hunting</a>
            </div>
        </div>'''
    )
    # Also rename "Assessments" text inside the hub to just Practice or something clean
    html = html.replace('<p class="text-secondary mb-4">Test your knowledge, identify your weak areas and improve your skills.</p>', 
                        '<p class="text-secondary mb-4">Sharpen your skills with assessments, live mock interviews, and real-world bug hunting challenges.</p>')
    with open('assessments.html', 'w') as f:
        f.write(html)

# 3. dashboard.html -> add link to AI Recommendations
with open('dashboard.html', 'r') as f:
    html = f.read()
if "AI Recommendations" not in html or "btn-glow" not in html:
    # Let's put a "Get AI Recommendations" button in the Welcome header
    html = html.replace(
        '<h1 class="mb-1">Welcome back, Alice!</h1>',
        '''<div class="flex justify-between items-center mb-4">
            <h1 class="mb-1" style="margin-bottom:0;">Overview</h1>
            <a href="recommendations.html" class="btn-glow primary"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Recommendations</a>
        </div>'''
    )
    with open('dashboard.html', 'w') as f:
        f.write(html)

print("Hidden pages routed successfully.")
