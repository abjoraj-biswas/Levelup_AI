import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace any of the restricted page links with login.html
pages = [
    'assessments', 'progress', 'recommendations', 
    'bughunting', 'bug-details', 'mock-interviews', 
    'corporate', 'company-details', 'opportunity-details', 
    'dashboard', 'profile', 'career-profile', 
    'skills', 'skill-details', 'learning'
]

pattern = r'href="(' + '|'.join(pages) + r')\.html"'
content = re.sub(pattern, 'href="login.html"', content)

with open('index.html', 'w') as f:
    f.write(content)
print("Links updated successfully.")
