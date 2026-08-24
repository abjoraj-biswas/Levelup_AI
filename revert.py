import re

with open('old_login.html', 'r') as f:
    old_content = f.read()

with open('login.html', 'r') as f:
    new_content = f.read()

# Extract old layout
old_layout_match = re.search(r'<div class="auth-layout">(.*?)<!-- Scripts -->', old_content, re.DOTALL)
old_layout = old_layout_match.group(1)

# Extract new CSS
new_css_match = re.search(r'<style>(.*?)</style>', new_content, re.DOTALL)
new_css = new_css_match.group(1)

# Modify old layout to use new inputs
old_layout = old_layout.replace('placeholder="alex@example.com"', 'placeholder="Email Address"')
old_layout = old_layout.replace('placeholder="••••••••"', 'placeholder="Password"')
old_layout = old_layout.replace('placeholder="Create a password"', 'placeholder="Create Password"')
old_layout = old_layout.replace('placeholder="Alex Sharma"', 'placeholder="Full Name"')
old_layout = old_layout.replace('placeholder="alex.sharma"', 'placeholder="Username"')
old_layout = old_layout.replace('style="width: 100%; padding: 14px; font-size: 1.05rem;"', 'style="width: 100%; justify-content: center; padding: 14px; font-size: 1.05rem;"')
old_layout = old_layout.replace('style="width: 100%; padding: 14px; font-size: 1.05rem; margin-top: 10px;"', 'style="width: 100%; justify-content: center; padding: 14px; font-size: 1.05rem; margin-top: 10px;"')

# We need to inject the CSS for auth-brand and auth-layout that supports the split screen
split_css = """
        body {
            overflow: hidden; /* Prevent scrolling on desktop auth page */
            background: #05050f;
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            color: var(--text-primary);
        }
        
        .auth-layout {
            display: flex;
            min-height: 100vh;
        }

        /* Left Side: Branding / Graphic */
        .auth-brand {
            flex: 1;
            background: #030308;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            position: relative;
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            overflow: hidden;
        }

        /* Abstract CSS Art for the brand side */
        .auth-brand::before, .auth-brand::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.5;
            z-index: 0;
            animation: pulseGlow 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }

        .auth-brand::before {
            width: 800px;
            height: 800px;
            background: rgba(0, 240, 255, 0.15);
            top: -200px;
            left: -200px;
        }

        .auth-brand::after {
            width: 600px;
            height: 600px;
            background: rgba(112, 0, 255, 0.15);
            bottom: -100px;
            right: -100px;
            animation-delay: -5s;
        }
        
        @keyframes pulseGlow {
            0% { transform: scale(1) translate(0, 0); opacity: 0.4; }
            50% { opacity: 0.7; }
            100% { transform: scale(1.2) translate(50px, -50px); opacity: 0.4; }
        }

        .brand-content {
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 500px;
        }

        .brand-logo {
            font-size: 3rem;
            margin-bottom: 20px;
            opacity: 0;
            animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .brand-content h2 {
            opacity: 0;
            animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .brand-feature {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255,255,255,0.05);
            padding: 15px 20px;
            border-radius: var(--border-radius-md);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
            text-align: left;
            transform: translateX(-30px);
            opacity: 0;
            animation: slideRightFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
        }

        .brand-feature:hover {
            transform: translateX(5px) !important;
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1);
        }

        .brand-feature:nth-child(3) { animation-delay: 0.3s; }
        .brand-feature:nth-child(4) { animation-delay: 0.4s; }
        .brand-feature:nth-child(5) { animation-delay: 0.5s; }

        /* Right Side: Form */
        .auth-form-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #08080f; /* Dark sleek background */
            padding: 40px;
            position: relative;
        }
        
        .auth-card {
            width: 100%;
            max-width: 480px;
            background: transparent; /* Seamless blend */
            opacity: 0;
            transform: translateY(20px);
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
"""

# Extract the rest of the new CSS (inputs, tabs, buttons, etc)
# Skip the old body, auth-layout, and auth-card stuff from new_css
import re
new_css_filtered = re.sub(r'body \{.*?\}\s*/\* Animated Abstract Background \*/', '', new_css, flags=re.DOTALL)
new_css_filtered = re.sub(r'\.auth-layout \{.*?\/\* Top Actions', '/* Top Actions', new_css_filtered, flags=re.DOTALL)
new_css_filtered = re.sub(r'\/\* The Hyper-realistic Glass Card \*\/\s*\.auth-card \{.*?@keyframes floatUp3D \{.*?\}\s*\.auth-header \{.*?@keyframes fadeInDown \{.*?\}', '', new_css_filtered, flags=re.DOTALL)


final_css = split_css + new_css_filtered

# Replace old css in old content with final css
final_content = re.sub(r'<style>.*?</style>', f'<style>\n{final_css}\n    </style>', old_content, flags=re.DOTALL)
# Replace layout
final_content = final_content.replace(old_layout_match.group(1), old_layout)

with open('login.html', 'w') as f:
    f.write(final_content)
