import re

with open('index.html', 'r') as f:
    html = f.read()

# Replace root variables
html = html.replace('--glass-bg: rgba(15, 17, 35, 0.3);', '--glass-bg: rgba(10, 11, 26, 0.3);')
html = html.replace('--glass-border: rgba(0, 240, 255, 0.3);', '--glass-border: rgba(0, 240, 255, 0.1);')

# Replace inline backdrop-filter values
html = html.replace('blur(30px) saturate(150%)', 'blur(50px) saturate(200%) contrast(1.1)')
html = html.replace('blur(40px) saturate(150%)', 'blur(50px) saturate(200%) contrast(1.1)')

# Add inset shadow to specific cards
html = html.replace('box-sizing: border-box;', 'box-sizing: border-box;\n            box-shadow: inset 0 0 30px rgba(0, 240, 255, 0.03), 0 10px 30px rgba(0,0,0,0.4);')
html = html.replace('border-radius: 32px;', 'border-radius: 32px;\n            box-shadow: inset 0 0 30px rgba(0, 240, 255, 0.03), 0 10px 30px rgba(0,0,0,0.4);')
html = html.replace('border-radius: 24px;\n            transition: all 0.4s ease;', 'border-radius: 24px;\n            transition: all 0.4s ease;\n            box-shadow: inset 0 0 30px rgba(0, 240, 255, 0.03), 0 10px 30px rgba(0,0,0,0.4);')

with open('index.html', 'w') as f:
    f.write(html)

print("Liquid glassified index.html")
