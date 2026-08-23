with open('index.html', 'r') as f:
    content = f.read()

script_to_add = """
        // Smooth scroll for Navigation Links using Lenis
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('href');
                if(target.startsWith('#')) {
                    e.preventDefault();
                    if(target === '#') {
                        lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                    } else {
                        // For ecosystem, scroll slightly more to center it
                        const offset = target === '#ecosystem' ? -50 : -80; 
                        lenis.scrollTo(target, { duration: 1.5, offset: offset, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                    }
                }
            });
        });
"""

content = content.replace("        });\n    </script>\n</body>", "        });\n" + script_to_add + "    </script>\n</body>")

with open('index.html', 'w') as f:
    f.write(content)
