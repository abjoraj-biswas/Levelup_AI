import re

# 1. Read index.html
with open('index.html', 'r') as f:
    index_content = f.read()

# Extract logo class
logo_pattern = re.compile(r'(\s*\.logo\s*\{[\s\S]*?\}\s*\.logo span\s*\{[\s\S]*?\})')
logo_match = logo_pattern.search(index_content)
logo_css = logo_match.group(1) if logo_match else ""

# Extract btn-glow class
btn_pattern = re.compile(r'(\s*\.btn-glow\s*\{[\s\S]*?\.btn-glow:hover\s*\{[\s\S]*?\})')
btn_match = btn_pattern.search(index_content)
btn_css = btn_match.group(1) if btn_match else ""
# Add btn-glow.primary
btn_primary_pattern = re.compile(r'(\s*\.btn-glow\.primary\s*\{[\s\S]*?\.btn-glow\.primary:hover\s*\{[\s\S]*?\})')
btn_primary_match = btn_primary_pattern.search(index_content)
btn_primary_css = btn_primary_match.group(1) if btn_primary_match else ""

# 2. Read style.css
with open('css/style.css', 'r') as f:
    style_content = f.read()

# Inject --hyper-gradient if not exists
if "--hyper-gradient" not in style_content:
    style_content = style_content.replace(
        "--primary: #00f0ff;",
        "--primary: #00f0ff;\n    --hyper-gradient: linear-gradient(135deg, #00f0ff 0%, #7000ff 100%);"
    )

# Inject logo (replace existing if any)
if ".logo {" in style_content:
    style_content = re.sub(r'\.logo\s*\{[\s\S]*?\}', '', style_content)
    style_content = re.sub(r'\.logo span\s*\{[\s\S]*?\}', '', style_content)

style_content += f"\n/* --- Brand Typography --- */\n{logo_css}\n"

# Inject btn-glow
style_content += f"\n/* --- Interactive Glow Buttons --- */\n{btn_css}\n{btn_primary_css}\n"

with open('css/style.css', 'w') as f:
    f.write(style_content)

# 3. Clean index.html
if logo_match:
    index_content = index_content.replace(logo_match.group(1), "")
if btn_match:
    index_content = index_content.replace(btn_match.group(1), "")
if btn_primary_match:
    index_content = index_content.replace(btn_primary_match.group(1), "")

with open('index.html', 'w') as f:
    f.write(index_content)

print("Styles extracted successfully.")
