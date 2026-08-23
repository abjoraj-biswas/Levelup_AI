import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace .logo CSS
old_css = """        .logo {
            font-family: 'Outfit', sans-serif;
            letter-spacing: -0.02em;
        }"""

new_css = """        .logo {
            font-family: 'Outfit', sans-serif;
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: -0.03em;
            color: #ffffff;
        }
        .logo span {
            color: var(--primary);
        }"""

content = content.replace(old_css, new_css)

with open('index.html', 'w') as f:
    f.write(content)
