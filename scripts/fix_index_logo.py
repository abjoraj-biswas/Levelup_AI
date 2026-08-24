with open('index.html', 'r') as f:
    content = f.read()

# Restore flex:1 to the nav logo in index.html
content = content.replace(
    '<nav class="landing-nav">\n        <div class="logo">LevelUP<span>.AI</span></div>',
    '<nav class="landing-nav">\n        <div class="logo" style="flex: 1;">LevelUP<span>.AI</span></div>'
)

with open('index.html', 'w') as f:
    f.write(content)
