import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()
        
    # Upgrade all btn-primary to btn-glow primary
    content = re.sub(r'class="(.*?)btn-primary(.*?)"', r'class="\1btn-glow primary\2"', content)
    
    # Strip inline styles from logo
    # Specifically: <div class="logo" style="...">LevelUP<span style="...">.AI</span></div>
    # to <div class="logo">LevelUP<span>.AI</span></div>
    
    # First, handle the outer logo div
    content = re.sub(r'<div class="logo"[^>]*>LevelUP<span[^>]*>\.AI</span></div>', r'<div class="logo">LevelUP<span>.AI</span></div>', content)
    
    with open(file, 'w') as f:
        f.write(content)

print("Global HTML updates completed.")
