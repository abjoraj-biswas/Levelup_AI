with open('dashboard.html', 'r') as f:
    html = f.read()

# We need to remove the two massive grid-2 blocks containing New Assessments, New Mock Interviews, Recent Performance, and Interview Readiness.
# We will use string manipulation to cut them out safely.

# The first block to cut starts with <!-- New Dashboard Sections --> and ends with the closing div of Interview Readiness block.
start_idx = html.find('<!-- New Dashboard Sections -->')
end_idx = html.find('<!-- Scripts -->')

if start_idx != -1 and end_idx != -1:
    # We want to keep everything up to start_idx, and everything from the closing </div> of the content area.
    # Actually, we can just find the end of the last grid-2 block.
    # Let's use a regex to strip out those specific sections
    import re
    # Remove the New Assessments & Mock Interviews block
    html = re.sub(r'<!-- New Dashboard Sections -->[\s\S]*?<!-- Recent Performance -->', '<!-- Recent Performance -->', html)
    # Remove the Recent Performance & Interview Readiness block
    html = re.sub(r'<div class="grid-2 mb-4">\s*<!-- Recent Performance -->[\s\S]*?</div>\s*</div>\s*</div>', '</div>', html)
    
    # Just to be completely safe, let's just do a direct string replace for the huge blocks since we know exactly what they look like.
    pass

# Safer approach:
with open('dashboard.html', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '<!-- New Dashboard Sections -->' in line:
        skip = True
    if skip and '<!-- Scripts -->' in line:
        skip = False
        # Add the closing tags that we skipped over
        new_lines.append('            </div>\n')
        new_lines.append('        </main>\n')
        new_lines.append('    </div>\n\n')
        
    if not skip:
        new_lines.append(line)

with open('dashboard.html', 'w') as f:
    f.writelines(new_lines)

print("Dashboard simplified.")
