import re

with open('dashboard.html', 'r') as f:
    html = f.read()

# 1. Extract and remove the old block
# It starts at <!-- Daily Recommendation --> and ends at the closing </div> of that flex container (before </div></div> of the header)
old_block_pattern = r'<!-- Daily Recommendation -->\s*<div class="glass-card flex items-center gap-3"[^>]*>.*?</div>\s*</div>\s*</div>'

html = re.sub(old_block_pattern, '', html, flags=re.DOTALL)

# 2. Design the new beautiful banner
new_banner = """
                <!-- Quick Tip Banner -->
                <div class="glass-card mt-2" style="padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(90deg, rgba(255,184,0,0.05) 0%, rgba(15,17,35,0.4) 100%); border-left: 4px solid var(--warning);">
                    <div class="flex items-center gap-4">
                        <div style="font-size: 2.2rem; color: var(--warning); filter: drop-shadow(0 0 15px rgba(255,184,0,0.4));">
                            <i class="fa-solid fa-lightbulb"></i>
                        </div>
                        <div>
                            <h3 style="font-size: 1.1rem; color: #fff; margin-bottom: 5px;">JavaScript Journey</h3>
                            <p class="text-secondary" style="font-size: 0.95rem; margin: 0;">You're making great progress! Jump right back in where you left off.</p>
                        </div>
                    </div>
                    <button class="btn-glow primary" style="padding: 10px 25px; font-weight: 600;" onclick="window.location.href='learning.html'">Resume Now <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i></button>
                </div>
"""

# 3. Insert it at the bottom of the content area
# Find the end of the grid-2 block. The HTML structure is:
#                 </div> <!-- end of grid-2 -->
#                 
#             </div> <!-- end of content-area -->
#         </main>
# We can just replace '            </div>\n        </main>' with the banner + '            </div>\n        </main>'

html = html.replace(
    '            </div>\n        </main>',
    new_banner + '\n            </div>\n        </main>'
)

with open('dashboard.html', 'w') as f:
    f.write(html)

print("Banner moved successfully.")
