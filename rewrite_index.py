html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LevelUP.AI - Build Your Future</title>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --navy: #0B132B;
            --navy-light: #1A2542;
            --green: #5A9E2F;
            --green-hover: #4A8525;
            --bg-gradient: linear-gradient(135deg, #FFF0E0 0%, #E8F5E9 50%, #D0ECE7 100%);
            --white: #FFFFFF;
            --gray-light: #F4F6F8;
            --gray-text: #637381;
            --border: #E5E8EB;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
            background: var(--bg-gradient);
            color: var(--navy);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }

        /* Typography */
        h1, h2, h3, h4 {
            color: var(--navy);
            line-height: 1.2;
            letter-spacing: -0.02em;
        }
        
        .hero-title {
            font-size: 5rem;
            font-weight: 700;
            margin-bottom: 24px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: var(--navy-light);
            max-width: 700px;
            margin: 0 auto 40px;
        }

        .section-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 16px;
        }

        .section-subtitle {
            font-size: 1.1rem;
            color: var(--gray-text);
            margin-bottom: 48px;
        }

        /* Header */
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--green);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .logo span { color: var(--navy); }

        nav {
            display: flex;
            gap: 32px;
            align-items: center;
        }

        nav a {
            text-decoration: none;
            color: var(--navy-light);
            font-weight: 500;
            font-size: 1rem;
            transition: color 0.2s;
        }

        nav a:hover {
            color: var(--green);
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 100px;
            font-weight: 600;
            text-decoration: none;
            font-size: 1rem;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
        }

        .btn-black {
            background: var(--navy);
            color: var(--white);
        }
        .btn-black:hover {
            background: #000;
        }

        .btn-outline {
            border: 1px solid var(--border);
            color: var(--navy);
            background: var(--white);
        }
        .btn-outline:hover {
            border-color: var(--navy);
        }

        .btn-green {
            background: var(--green);
            color: var(--white);
        }
        .btn-green:hover {
            background: var(--green-hover);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(90, 158, 47, 0.2);
        }

        /* Hero Section */
        .hero {
            padding: 180px 20px 100px;
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .hero-actions {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 80px;
        }

        .hero-illustration {
            background: var(--white);
            border-radius: 24px;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        /* Sections */
        .section-white {
            background: var(--white);
            padding: 100px 20px;
        }

        .section-gray {
            background: var(--gray-light);
            padding: 100px 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Cards */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
        }

        .grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
        }

        .feature-card {
            background: var(--white);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 40px;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.06);
            border-color: var(--green);
        }

        .feature-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: rgba(90, 158, 47, 0.1);
            color: var(--green);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }

        /* Stats */
        .stat-card {
            text-align: center;
            padding: 30px;
            border-right: 1px solid var(--border);
        }
        .stat-card:last-child { border-right: none; }
        .stat-number {
            font-size: 3.5rem;
            font-weight: 700;
            color: var(--green);
            margin-bottom: 8px;
        }
        
        /* Footer */
        footer {
            background: var(--white);
            border-top: 1px solid var(--border);
            padding: 80px 20px 40px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto 60px;
        }

        .footer-col h4 {
            font-size: 1.1rem;
            margin-bottom: 24px;
            color: var(--navy);
        }

        .footer-col ul {
            list-style: none;
        }

        .footer-col ul li {
            margin-bottom: 12px;
        }

        .footer-col ul li a {
            color: var(--gray-text);
            text-decoration: none;
            transition: color 0.2s;
        }
        .footer-col ul li a:hover {
            color: var(--green);
        }

        @media (max-width: 900px) {
            .hero-title { font-size: 3.5rem; }
            .grid-2, .grid-4, .footer-grid { grid-template-columns: 1fr; }
            .stat-card { border-right: none; border-bottom: 1px solid var(--border); }
            nav { display: none; } /* Mobile menu simplified */
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header>
        <a href="index.html" class="logo">LevelUP<span>.AI</span></a>
        <nav>
            <a href="#features">Features</a>
            <a href="#impact">Impact</a>
            <a href="#ecosystem">Ecosystem</a>
            <a href="login.html" class="btn btn-outline" style="margin-left: 20px;">Public Map</a>
            <a href="login.html" class="btn btn-black">Admin Portal</a>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <h1 class="hero-title">Claim your rights,<br>build your future</h1>
        <p class="hero-subtitle">Take control of your civic life by discovering welfare schemes you qualify for and ensuring your grievances are heard securely.</p>
        
        <div class="hero-actions">
            <a href="login.html" class="btn btn-outline">Browse Schemes</a>
            <a href="login.html" class="btn btn-green">Report Grievance</a>
        </div>

        <!-- Abstract Illustration matching the wireframe aesthetic -->
        <div class="hero-illustration">
            <div style="text-align:center; color: var(--green);">
                <i data-lucide="building" style="width: 80px; height: 80px; stroke-width: 1;"></i>
                <p style="margin-top: 10px; font-weight: 600; font-size: 0.9rem;">ENTERPRISE</p>
            </div>
            <div style="text-align:center; color: var(--navy-light);">
                <i data-lucide="users" style="width: 60px; height: 60px; stroke-width: 1;"></i>
                <p style="margin-top: 10px; font-weight: 600; font-size: 0.9rem;">COMMUNITY</p>
            </div>
            <div style="text-align:center; color: var(--green);">
                <i data-lucide="tree-pine" style="width: 80px; height: 80px; stroke-width: 1;"></i>
                <p style="margin-top: 10px; font-weight: 600; font-size: 0.9rem;">WELLNESS</p>
            </div>
        </div>
    </section>

    <!-- Features / Steps -->
    <section class="section-white" id="features">
        <div class="container">
            <div style="text-align: center; margin-bottom: 60px;">
                <h2 class="section-title">Engineered for Transparency</h2>
                <p class="section-subtitle">A civic platform designed for accountability and rapid resolution.</p>
            </div>

            <div class="grid-2">
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="file-check-2"></i></div>
                    <h3>Eligibility Verification</h3>
                    <p style="color:var(--gray-text); margin-top:12px;">Instantly check your eligibility for hundreds of government and local welfare schemes using our adaptive matching engine.</p>
                    <a href="login.html" style="color:var(--green); text-decoration:none; font-weight:600; display:inline-block; margin-top:20px;">Learn more &rarr;</a>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="shield-alert"></i></div>
                    <h3>Secure Grievance Reporting</h3>
                    <p style="color:var(--gray-text); margin-top:12px;">File reports and track civic issues with end-to-end encryption. Your identity remains protected while authorities take action.</p>
                    <a href="login.html" style="color:var(--green); text-decoration:none; font-weight:600; display:inline-block; margin-top:20px;">Learn more &rarr;</a>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="line-chart"></i></div>
                    <h3>Public Data Map</h3>
                    <p style="color:var(--gray-text); margin-top:12px;">Visualize resolution rates, active grievances, and welfare distribution in your district via our real-time geographic portal.</p>
                    <a href="login.html" style="color:var(--green); text-decoration:none; font-weight:600; display:inline-block; margin-top:20px;">Learn more &rarr;</a>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="building-2"></i></div>
                    <h3>Department Portal</h3>
                    <p style="color:var(--gray-text); margin-top:12px;">Dedicated interfaces for municipal workers and government officials to resolve tickets and manage scheme disbursements.</p>
                    <a href="login.html" style="color:var(--green); text-decoration:none; font-weight:600; display:inline-block; margin-top:20px;">Learn more &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Impact Stats -->
    <section class="section-gray" id="impact">
        <div class="container">
            <div class="grid-4" style="background:var(--white); border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.03); border:1px solid var(--border);">
                <div class="stat-card">
                    <div class="stat-number">12k+</div>
                    <div style="color:var(--navy-light); font-weight:500;">Citizens Assisted</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">850+</div>
                    <div style="color:var(--navy-light); font-weight:500;">Issues Resolved</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">95%</div>
                    <div style="color:var(--navy-light); font-weight:500;">Resolution Rate</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">40+</div>
                    <div style="color:var(--navy-light); font-weight:500;">Active Schemes</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Ecosystem -->
    <section class="section-white" id="ecosystem">
        <div class="container">
            <h2 class="section-title" style="text-align:center;">Our Services</h2>
            <p class="section-subtitle" style="text-align:center; max-width:600px; margin: 0 auto 60px;">Comprehensive tools to bridge the gap between citizens and administration.</p>

            <div class="grid-2">
                <!-- Service 1 -->
                <div style="display:flex; gap:20px; padding:30px; background:var(--gray-light); border-radius:16px;">
                    <div style="width:60px; height:60px; border-radius:50%; background:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i data-lucide="file-text" style="color:var(--navy);"></i>
                    </div>
                    <div>
                        <h3 style="margin-bottom:8px;">Scheme Enrollment</h3>
                        <p style="color:var(--gray-text); margin-bottom:16px;">Step-by-step guidance for applying to welfare schemes without intermediaries.</p>
                        <a href="login.html" style="color:var(--navy); font-weight:600; text-decoration:none;">Apply Now &rarr;</a>
                    </div>
                </div>

                <!-- Service 2 -->
                <div style="display:flex; gap:20px; padding:30px; background:var(--gray-light); border-radius:16px;">
                    <div style="width:60px; height:60px; border-radius:50%; background:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i data-lucide="alert-triangle" style="color:var(--navy);"></i>
                    </div>
                    <div>
                        <h3 style="margin-bottom:8px;">Grievance Redressal</h3>
                        <p style="color:var(--gray-text); margin-bottom:16px;">Log complaints regarding water, electricity, roads, and track their status in real-time.</p>
                        <a href="login.html" style="color:var(--navy); font-weight:600; text-decoration:none;">Lodge Complaint &rarr;</a>
                    </div>
                </div>
                
                <!-- Service 3 -->
                <div style="display:flex; gap:20px; padding:30px; background:var(--gray-light); border-radius:16px;">
                    <div style="width:60px; height:60px; border-radius:50%; background:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i data-lucide="map" style="color:var(--navy);"></i>
                    </div>
                    <div>
                        <h3 style="margin-bottom:8px;">Local Mapping</h3>
                        <p style="color:var(--gray-text); margin-bottom:16px;">Interactive map showing locations of ongoing civil works, healthcare centers, and camps.</p>
                        <a href="login.html" style="color:var(--navy); font-weight:600; text-decoration:none;">View Map &rarr;</a>
                    </div>
                </div>

                <!-- Service 4 -->
                <div style="display:flex; gap:20px; padding:30px; background:var(--gray-light); border-radius:16px;">
                    <div style="width:60px; height:60px; border-radius:50%; background:var(--white); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i data-lucide="users" style="color:var(--navy);"></i>
                    </div>
                    <div>
                        <h3 style="margin-bottom:8px;">Community Forum</h3>
                        <p style="color:var(--gray-text); margin-bottom:16px;">Connect with local representatives and community leaders to discuss neighborhood issues.</p>
                        <a href="login.html" style="color:var(--navy); font-weight:600; text-decoration:none;">Join Discussion &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-grid">
            <div class="footer-col" style="grid-column: span 2;">
                <div class="logo" style="margin-bottom:16px;">LevelUP<span>.AI</span></div>
                <p style="color:var(--gray-text); max-width:300px; margin-bottom:24px;">
                    Empowering citizens through transparency, accessibility, and efficient civic management.
                </p>
                <div style="display:flex; gap:16px;">
                    <a href="#" style="color:var(--navy);"><i data-lucide="twitter"></i></a>
                    <a href="#" style="color:var(--navy);"><i data-lucide="linkedin"></i></a>
                    <a href="#" style="color:var(--navy);"><i data-lucide="facebook"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Services</h4>
                <ul>
                    <li><a href="login.html">Find Schemes</a></li>
                    <li><a href="login.html">Report Issue</a></li>
                    <li><a href="login.html">Public Map</a></li>
                    <li><a href="login.html">Admin Portal</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </div>
        <div class="container" style="border-top: 1px solid var(--border); padding-top: 24px; display:flex; justify-content:space-between; align-items:center; color:var(--gray-text); font-size:0.9rem;">
            <p>&copy; 2024 LevelUP.AI platform. Inspired by JanSuvidha.</p>
            <p>System Status: <span style="color:var(--green); font-weight:600;">Operational</span></p>
        </div>
    </footer>

    <script>
        // Initialize lucide icons
        lucide.createIcons();
    </script>
</body>
</html>
"""

with open("index.html", "w") as f:
    f.write(html_content)

print("Updated index.html to match JanSuvidha aesthetic and fixed auth routing")
