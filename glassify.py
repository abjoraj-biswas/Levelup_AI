import re

with open('index.html', 'r') as f:
    html = f.read()

# Find all style="..." attributes
def add_glass(match):
    style = match.group(1)
    
    # Check if it already has a backdrop-filter
    if 'backdrop-filter' in style:
        return match.group(0)
        
    # If it has a background rgba with low opacity
    if re.search(r'background:\s*rgba\(\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\.\d+\)', style):
        # We append backdrop filter to the style
        style = style.rstrip(';') + '; backdrop-filter: blur(30px) saturate(150%); -webkit-backdrop-filter: blur(30px) saturate(150%);'
        return f'style="{style}"'
    
    return match.group(0)

new_html = re.sub(r'style="([^"]+)"', add_glass, html)

with open('index.html', 'w') as f:
    f.write(new_html)

print("Glassified index.html")
