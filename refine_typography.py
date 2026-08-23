with open('css/dashboard.css', 'r') as f:
    css = f.read()

typo_css = '''
/* Ultra-Clean Dashboard Typography */
.content-area h1, .content-area h2 {
    font-family: 'Outfit', sans-serif;
    letter-spacing: -0.5px;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 0.5rem;
}
.content-area h3 {
    font-family: 'Outfit', sans-serif;
    letter-spacing: -0.2px;
    font-weight: 600;
    color: #f1f5f9;
}
.content-area p {
    color: #94a3b8;
    font-weight: 400;
    line-height: 1.6;
}
'''

if "Ultra-Clean Dashboard Typography" not in css:
    css = typo_css + "\n" + css

with open('css/dashboard.css', 'w') as f:
    f.write(css)

print("Typography refined.")
