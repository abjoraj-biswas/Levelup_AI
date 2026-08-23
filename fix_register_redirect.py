import re

# 1. Modify index.html buttons
with open('index.html', 'r') as f:
    content = f.read()

# Replace Get Started button
old_get_started = """<button class="btn-glow primary" onclick="window.location.href='login.html'">
                Get Started"""
new_get_started = """<button class="btn-glow primary" onclick="window.location.href='login.html?mode=register'">
                Get Started"""
content = content.replace(old_get_started, new_get_started)

# Replace Create Account button
old_create_account = """<button class="btn-glow primary" onclick="window.location.href='login.html'"
                    style="width:100%; justify-content:center;">Create Account</button>"""
new_create_account = """<button class="btn-glow primary" onclick="window.location.href='login.html?mode=register'"
                    style="width:100%; justify-content:center;">Create Account</button>"""
content = content.replace(old_create_account, new_create_account)

with open('index.html', 'w') as f:
    f.write(content)

# 2. Modify login.html
with open('login.html', 'r') as f:
    login_content = f.read()

js_to_add = """
        // Check for mode=register in URL
        document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('mode') === 'register') {
                switchTab('register');
            }
        });
"""

login_content = login_content.replace("        function mockSocialAuth() {", js_to_add + "\n        function mockSocialAuth() {")

with open('login.html', 'w') as f:
    f.write(login_content)

