import os
import re

files_with_tables = [
    'mock-interviews.html',
    'bughunting.html',
    'assessments.html'
]

for filename in files_with_tables:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already wrapped
    if '<div class="table-responsive">' not in content:
        # Simple regex to replace <table ...> ... </table>
        # We need to preserve indentation if possible, but simple replacement is fine.
        # Actually, using regex with DOTALL is better:
        pattern = re.compile(r'(<table.*?>.*?</table>)', re.DOTALL | re.IGNORECASE)
        
        def repl(match):
            return f'<div class="table-responsive">\n{match.group(1)}\n</div>'
            
        new_content = pattern.sub(repl, content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Wrapped tables in {filename}")

