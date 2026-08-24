import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Add Lenis CSS
lenis_css = """
        /* Lenis Smooth Scroll Setup */
        html.lenis, html.lenis body {
            height: auto;
        }
        .lenis.lenis-smooth {
            scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
            overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
            overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
            pointer-events: none;
        }
"""
content = content.replace("/* Typography Enhancements */", lenis_css + "\n        /* Typography Enhancements */")


# 2. Enhance Reveal Animation (3D Flip & Scale)
old_reveal = """        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }"""
        
new_reveal = """        .reveal {
            opacity: 0;
            transform: perspective(1000px) rotateX(15deg) translateY(50px) scale(0.95);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
            transform-style: preserve-3d;
            will-change: transform, opacity;
        }

        .reveal.active {
            opacity: 1;
            transform: perspective(1000px) rotateX(0) translateY(0) scale(1);
        }"""
content = content.replace(old_reveal, new_reveal)


# 3. Add Lenis Library Link
lenis_script_tag = '    <script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>'
content = content.replace('    <script src="https://unpkg.com/lucide@latest"></script>', '    <script src="https://unpkg.com/lucide@latest"></script>\n' + lenis_script_tag)


# 4. Initialize Lenis in Javascript
lenis_init = """        // Initialize Lenis for Butter-Smooth Scrolling
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        // Add parallax to Hero Visual
        lenis.on('scroll', (e) => {
            const scrollY = window.scrollY;
            if(heroVisual) {
                heroVisual.style.transform = `perspective(1500px) translateY(${scrollY * 0.2}px)`; // Only Y translation, preserving 3D hover via mousemove
            }
        });
"""
content = content.replace('        lucide.createIcons();', '        lucide.createIcons();\n\n' + lenis_init)

# Fix mousemove override on parallax
mouse_move_old = """            heroVisual.style.transform = `perspective(1500px) rotateY(${x}deg) rotateX(${y}deg)`;"""
mouse_move_new = """            const scrollY = window.scrollY;
            heroVisual.style.transform = `perspective(1500px) rotateY(${x}deg) rotateX(${y}deg) translateY(${scrollY * 0.2}px)`;"""
content = content.replace(mouse_move_old, mouse_move_new)


with open('index.html', 'w') as f:
    f.write(content)
