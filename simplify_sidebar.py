import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    if file == 'index.html' or file == 'login.html':
        continue
        
    with open(file, 'r') as f:
        html = f.read()
        
    # Determine which tab should be active
    active_overview = " active" if file == 'dashboard.html' else ""
    active_learning = " active" if file in ['learning.html', 'skills.html', 'skill-details.html'] else ""
    active_practice = " active" if file in ['assessments.html', 'mock-interviews.html', 'bughunting.html'] else ""
    active_career = " active" if file in ['corporate.html', 'opportunity-details.html', 'company-details.html'] else ""
    
    new_sidebar = f'''<nav class="sidebar-nav">
                <a href="dashboard.html" class="nav-item{active_overview}">
                    <i class="fa-solid fa-house"></i> Overview
                </a>
                <a href="learning.html" class="nav-item{active_learning}">
                    <i class="fa-solid fa-book-open"></i> Learning
                </a>
                <a href="assessments.html" class="nav-item{active_practice}">
                    <i class="fa-solid fa-clipboard-check"></i> Practice
                </a>
                <a href="corporate.html" class="nav-item{active_career}">
                    <i class="fa-solid fa-handshake"></i> Career
                </a>
            </nav>'''
            
    # Replace everything between <nav class="sidebar-nav"> and </nav>
    html = re.sub(r'<nav class="sidebar-nav">[\s\S]*?</nav>', new_sidebar, html)
    
    with open(file, 'w') as f:
        f.write(html)

print("Sidebar simplified successfully.")
