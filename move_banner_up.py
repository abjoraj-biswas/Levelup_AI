import re

with open('dashboard.html', 'r') as f:
    html = f.read()

# 1. Extract the Quick Tip Banner block
banner_pattern = r'\s*<!-- Quick Tip Banner -->\s*<div class="glass-card.*?</button>\s*</div>'
match = re.search(banner_pattern, html, flags=re.DOTALL)
if match:
    banner_html = match.group(0)
    # Remove it from the bottom
    html = html.replace(banner_html, '')
    
    # Adjust margin classes on the banner (change mt-2 to mb-4 to give space above the stats grid)
    banner_html = banner_html.replace('class="glass-card mt-2"', 'class="glass-card mb-4"')
    
    # Insert it right before <!-- Statistics Grid -->
    html = html.replace('<!-- Statistics Grid -->', banner_html + '\n\n                <!-- Statistics Grid -->')
    
    with open('dashboard.html', 'w') as f:
        f.write(html)
    print("Banner moved up successfully.")
else:
    print("Could not find banner pattern.")
