/**
 * Global App State and Mock Data
 */

// Mock Data
const MOCK_DATA = {
    user: {
        name: "Alex Sharma",
        email: "alex.sharma@example.com",
        college: "ABC Institute of Technology",
        branch: "CSE",
        dob: "2002-05-14",
        streak: 14,
        learningHours: 48,
        completedSkills: 5,
        totalSkillsLearning: 12
    },
    assessments: [
        { id: "a1", title: "Data Structures & Algorithms", category: "Data Structures", difficulty: "Advanced", questions: 20, duration: 30, status: "New", bestScore: null, passScore: 75, isNew: true },
        { id: "a2", title: "HTML & CSS", category: "Web Development", difficulty: "Beginner", questions: 25, duration: 30, status: "New", bestScore: null, passScore: 65, isNew: false },
        { id: "a3", title: "Node.js & Backend Concepts", category: "Web Development", difficulty: "Intermediate", questions: 30, duration: 45, status: "New", bestScore: null, passScore: 70, isNew: false },
        { id: "a4", title: "Machine Learning Fundamentals", category: "AI & Machine Learning", difficulty: "Intermediate", questions: 35, duration: 50, status: "New", bestScore: null, passScore: 70, isNew: true },
        { id: "a5", title: "Python Programming Basics", category: "Programming", difficulty: "Beginner", questions: 20, duration: 20, status: "New", bestScore: null, passScore: 70, isNew: false },
        { id: "a6", title: "SQL & Databases", category: "Data Science", difficulty: "Intermediate", questions: 30, duration: 40, status: "New", bestScore: null, passScore: 70, isNew: false },
        { id: "a7", title: "React Development", category: "Web Development", difficulty: "Intermediate", questions: 30, duration: 45, status: "New", bestScore: null, passScore: 70, isNew: false }
    ],
    skills: [
        {
                "id": "s_web",
                "name": "Advanced Web Development",
                "category": "Frontend",
                "difficulty": "Beginner",
                "subSkills": 15,
                "lectures": 60,
                "hours": 45,
                "progress": 0,
                "icon": "fa-brands fa-html5",
                "desc": "Master modern web development from fundamentals to advanced architectures."
        },
        {
                "id": "s_ml",
                "name": "Data Science & Machine Learning",
                "category": "AI/ML",
                "difficulty": "Intermediate",
                "subSkills": 20,
                "lectures": 70,
                "hours": 55,
                "progress": 0,
                "icon": "fa-solid fa-brain",
                "desc": "Build a strong foundation in data science and implement deep learning models."
        },
        {
                "id": "s_aws",
                "name": "Cloud Architecture (AWS)",
                "category": "Cloud",
                "difficulty": "Intermediate",
                "subSkills": 18,
                "lectures": 60,
                "hours": 50,
                "progress": 0,
                "icon": "fa-brands fa-aws",
                "desc": "Design highly available and scalable architectures on AWS."
        },
        {
                "id": "s_cyber",
                "name": "Cybersecurity Fundamentals",
                "category": "Cyber Security",
                "difficulty": "Intermediate",
                "subSkills": 16,
                "lectures": 60,
                "hours": 40,
                "progress": 0,
                "icon": "fa-solid fa-shield-halved",
                "desc": "Protect systems from advanced threats and learn defensive security."
        },
        {
                "id": "s_fsjs",
                "name": "Full-Stack JavaScript",
                "category": "Programming",
                "difficulty": "Advanced",
                "subSkills": 18,
                "lectures": 70,
                "hours": 60,
                "progress": 0,
                "icon": "fa-brands fa-js",
                "desc": "Build complete web applications with React, Node.js, and databases."
        }
    ],
    notifications: [
        { id: 4, type: "assessment", title: "New Assessment Available", message: "JavaScript Fundamentals is ready for you to take.", read: false, icon: "fa-solid fa-clipboard-check" },
        { id: 5, type: "bug", title: "New Bug Hunt", message: "EduTech Labs just posted a new bounty.", read: false, icon: "fa-solid fa-bug" },
        { id: 1, type: "ai", title: "New AI Recommendation", message: "JavaScript Functions has been recommended for you.", read: true, icon: "fa-solid fa-robot" },
        { id: 2, type: "achievement", title: "Skill Completed", message: "You completed HTML & CSS.", read: true, icon: "fa-solid fa-trophy" },
        { id: 3, type: "streak", title: "Streak Alert", message: "You are currently on a 14-day learning streak.", read: true, icon: "fa-solid fa-fire" }
    ],
    courseContent: {
        "s_web": [
                {
                        "id": "l1",
                        "title": "HTML5 semantic structure",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "CSS fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Flexbox",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "CSS Grid",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Responsive design",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "JavaScript fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "DOM",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Events",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Forms & validation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Fetch API",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "JSON",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Git/GitHub",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "npm",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "ES modules",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "First frontend project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Modern JavaScript",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Promises",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "async/await",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "API integration",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "React fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Components",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Props",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "State",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Hooks",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Forms",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Routing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Context",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Custom Hooks",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Performance basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Testing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "TypeScript fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Vue fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Vue components",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Vue reactivity",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "State management",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Accessibility",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Web performance",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Authentication UI",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Error handling",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Intermediate project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Advanced React architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Rendering strategies",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Performance optimization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Code splitting",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Lazy loading",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Advanced state management",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "SSR/SSG concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Web accessibility",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "Web Workers",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "Advanced browser APIs",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "Design patterns",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l53",
                        "title": "Frontend architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l54",
                        "title": "Monorepos",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l55",
                        "title": "CI/CD",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l56",
                        "title": "Testing strategy",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l57",
                        "title": "Production debugging",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l58",
                        "title": "Monitoring",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l59",
                        "title": "Deployment",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l60",
                        "title": "Final production project",
                        "duration": 15,
                        "completed": false
                }
        ],
        "s_ml": [
                {
                        "id": "l1",
                        "title": "Python fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Variables",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Conditions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "Loops",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Functions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Lists",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Dictionaries",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Sets",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Tuples",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "File handling",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Exceptions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "OOP basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "NumPy",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "Pandas",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "DataFrames",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Data cleaning",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Missing values",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Visualization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Statistics basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "First ML project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Linear regression",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Multiple regression",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Logistic regression",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "KNN",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Decision trees",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Random forests",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Naive Bayes",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "SVM",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Clustering",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "K-Means",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "PCA",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Feature engineering",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Encoding",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Scaling",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "Train/test split",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Cross-validation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Metrics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Confusion matrix",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Precision/recall",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "ROC-AUC",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Hyperparameter tuning",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Pipelines",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Model comparison",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Ensemble learning",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "ML project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Neural-network fundamentals",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Backpropagation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Optimization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Deep learning",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "CNN",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "RNN",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "LSTM",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l53",
                        "title": "Transformers",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l54",
                        "title": "NLP",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l55",
                        "title": "Text preprocessing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l56",
                        "title": "Embeddings",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l57",
                        "title": "Recommendation systems",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l58",
                        "title": "Time-series ML",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l59",
                        "title": "Anomaly detection",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l60",
                        "title": "Explainable AI",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l61",
                        "title": "Model interpretability",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l62",
                        "title": "Imbalanced datasets",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l63",
                        "title": "ML pipelines",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l64",
                        "title": "Experiment tracking",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l65",
                        "title": "Model deployment",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l66",
                        "title": "FastAPI ML serving",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l67",
                        "title": "Docker for ML",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l68",
                        "title": "ML monitoring",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l69",
                        "title": "MLOps",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l70",
                        "title": "End-to-end AI project",
                        "duration": 15,
                        "completed": false
                }
        ],
        "s_aws": [
                {
                        "id": "l1",
                        "title": "Cloud computing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "AWS account",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "IAM",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "Regions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Availability Zones",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "EC2",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "AMI",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "EBS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "S3",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "CloudFront",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "VPC basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Subnets",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "Security Groups",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "Route tables",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "Internet Gateway",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "RDS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "DynamoDB",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Lambda",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "CloudWatch",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "First AWS project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "VPC architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "NAT Gateway",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Load Balancer",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Auto Scaling",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Route 53",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "IAM policies",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "KMS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Secrets Manager",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "SQS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "SNS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "API Gateway",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Lambda architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "ECS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "ECR",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "CloudFormation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Terraform basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Cloud monitoring",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Cost optimization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "High availability",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Multi-tier architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Well-Architected Framework",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Multi-region architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Disaster recovery",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Backup strategies",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Serverless architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Event-driven architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Containers",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "ECS vs EKS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Kubernetes concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "Advanced networking",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "Transit Gateway",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "Hybrid cloud",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l53",
                        "title": "Security architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l54",
                        "title": "Zero-trust concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l55",
                        "title": "Observability",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l56",
                        "title": "Scalability",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l57",
                        "title": "Performance optimization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l58",
                        "title": "FinOps",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l59",
                        "title": "Architecture case studies",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l60",
                        "title": "Final AWS production architecture",
                        "duration": 15,
                        "completed": false
                }
        ],
        "s_cyber": [
                {
                        "id": "l1",
                        "title": "Cybersecurity introduction",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "CIA triad",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Threats",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "Vulnerabilities",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Risk",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Malware",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Phishing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Password security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Authentication",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Authorization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Networking basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "IP",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "TCP/UDP",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "DNS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "HTTP/HTTPS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Firewalls",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "VPN",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Encryption basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Hashing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "Security lab setup",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "OWASP Top 10",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "SQL Injection",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "XSS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "CSRF",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Broken access control",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Authentication flaws",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Session security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Security headers",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "API security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "JWT security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "Network scanning concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Vulnerability assessment",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Logging",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "SIEM concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "Incident response",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Threat modeling",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Secure coding",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Dependency security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Security testing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Web-security project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Advanced web security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "SSRF",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Deserialization risks",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "OAuth security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Advanced API security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Cloud security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Container security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Identity security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Threat hunting",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "Detection engineering",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "Security monitoring",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "Incident investigation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l53",
                        "title": "Digital forensics concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l54",
                        "title": "Red-team methodology",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l55",
                        "title": "Blue-team methodology",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l56",
                        "title": "Zero Trust",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l57",
                        "title": "Security architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l58",
                        "title": "Secure CI/CD",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l59",
                        "title": "Security automation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l60",
                        "title": "Final security assessment project",
                        "duration": 15,
                        "completed": false
                }
        ],
        "s_fsjs": [
                {
                        "id": "l1",
                        "title": "HTML",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "CSS",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "JavaScript",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "DOM",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Events",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "ES6",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Arrays",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Objects",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Functions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Modules",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "npm",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Git",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "GitHub",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "HTTP",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "REST API",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "JSON",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Node.js introduction",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "npm with Node",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Express introduction",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "First full-stack mini project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "React",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Components",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Props",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "State",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Hooks",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Forms",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Routing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "API calls",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Node APIs",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Express routes",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "Middleware",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Controllers",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "MongoDB",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Mongoose",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "CRUD",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Authentication",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "JWT",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Password hashing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Authorization",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Error handling",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Validation",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "File uploads",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Testing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Frontend/backend integration",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Full-stack project",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Advanced React",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "State architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Performance",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Custom Hooks",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "Advanced Express",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "API architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "REST best practices",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l53",
                        "title": "Database indexing",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l54",
                        "title": "Transactions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l55",
                        "title": "Caching",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l56",
                        "title": "Redis",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l57",
                        "title": "WebSockets",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l58",
                        "title": "Real-time applications",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l59",
                        "title": "Rate limiting",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l60",
                        "title": "Security",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l61",
                        "title": "Docker",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l62",
                        "title": "CI/CD",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l63",
                        "title": "Environment management",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l64",
                        "title": "Cloud deployment",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l65",
                        "title": "Logging",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l66",
                        "title": "Monitoring",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l67",
                        "title": "Scalability",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l68",
                        "title": "Microservices concepts",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l69",
                        "title": "System design",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l70",
                        "title": "Production full-stack project",
                        "duration": 15,
                        "completed": false
                }
        ]
,
        "s_devops": [
                {
                        "id": "l1",
                        "title": "DevOps Introduction",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Linux Basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Shell Scripting",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "Git Fundamentals",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "GitHub Workflows",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Networking Basics",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "SSH & SCP",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Web Servers (Nginx)",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Process Management",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Package Managers",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Virtualization",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Vagrant",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "Docker Introduction",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "Containerizing Apps",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "Docker Compose",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Docker Volumes",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Docker Networking",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "CI/CD Concepts",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Jenkins Setup",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "Jenkins Pipelines",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "GitHub Actions",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "GitLab CI",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Automated Testing",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Artifact Repositories",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Ansible Introduction",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Ansible Playbooks",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Configuration Management",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Infrastructure as Code",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Terraform Basics",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Terraform State",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "Terraform Modules",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "AWS EC2 with Terraform",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Prometheus",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Grafana",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "Kubernetes Concepts",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "K8s Architecture",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Pods & Replicasets",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Deployments",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Services & Ingress",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "ConfigMaps & Secrets",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Helm Charts",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "K8s StatefulSets",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "K8s Storage",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Service Mesh (Istio)",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "ArgoCD (GitOps)",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Serverless DevOps",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Security (DevSecOps)",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Vulnerability Scanning",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Secret Management",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "Site Reliability Engineering",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "Incident Response",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "Production Capstone",
                        "duration": 12,
                        "completed": false
                }
        ],
        "s_mobile": [
                {
                        "id": "l1",
                        "title": "Flutter Introduction",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Dart Basics",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Variables & Types",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "Functions in Dart",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "OOP in Dart",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Flutter Setup",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Widgets Intro",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Stateless Widgets",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Stateful Widgets",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Material Design",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Scaffold & Appbar",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Rows & Columns",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "Containers",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "ListView",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "GridView",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Buttons & Inputs",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Form Validation",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Navigation Basics",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Images & Assets",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "Advanced UI",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Custom Widgets",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Animations Intro",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Hero Animations",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Responsive Design",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Themes & Styling",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "State Management Concepts",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Provider Package",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Riverpod Basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "BLoC Pattern",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "HTTP Requests",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "REST APIs in Flutter",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "JSON Parsing",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Async & Await",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Shared Preferences",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "SQLite",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Local Storage",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Firebase Auth",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Cloud Firestore",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Push Notifications",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Camera & Gallery",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Google Maps",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Location Services",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Native Device APIs",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Method Channels",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "App State Persistence",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Advanced Riverpod",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Testing Widgets",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Integration Testing",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l49",
                        "title": "Performance Profiling",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l50",
                        "title": "Memory Leaks",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l51",
                        "title": "App Publishing (Android)",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l52",
                        "title": "App Publishing (iOS)",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l53",
                        "title": "CI/CD for Flutter",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l54",
                        "title": "Final Mobile Project",
                        "duration": 13,
                        "completed": false
                }
        ],
        "s_uiux": [
                {
                        "id": "l1",
                        "title": "Intro to UI/UX",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Design Thinking",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "User Research",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "User Personas",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Empathy Maps",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "User Journeys",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Information Architecture",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Wireframing Basics",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "Figma Introduction",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Figma Tools",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Frames & Shapes",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Typography Basics",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "Color Theory",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "Spacing & Grid Systems",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "Alignment",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "High-Fidelity Design",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Visual Hierarchy",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Accessibility in Design",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Contrast & Legibility",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "UI Components",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Auto Layout in Figma",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Components & Variants",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Design Systems",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Prototyping Basics",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Micro-interactions",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Transitions",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Usability Testing",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "A/B Testing",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Gathering Feedback",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Iterative Design",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "Advanced Figma",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Variables in Figma",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Advanced Prototyping",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Design Handoff",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "Developer Collaboration",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Web vs Mobile Design",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Responsive UI",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Material Design 3",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Apple HIG",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Dark Mode Design",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Data Visualization UI",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Dashboard Design",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Portfolio Building",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Case Studies",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Freelancing in UX",
                        "duration": 10,
                        "completed": false
                }
        ],
        "s_web3": [
                {
                        "id": "l1",
                        "title": "What is Blockchain?",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Cryptography Basics",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Hash Functions",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "Public/Private Keys",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Consensus Mechanisms",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Proof of Work",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Proof of Stake",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Ethereum Introduction",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "EVM Basics",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Wallets (MetaMask)",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Gas Fees",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Transactions",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "Smart Contracts Intro",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "Remix IDE",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "Solidity Basics",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Variables & Types in Solidity",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Functions & Modifiers",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Mappings & Arrays",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Structs & Enums",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "Events & Logs",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Inheritance",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Interfaces",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Error Handling",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "ERC-20 Tokens",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Creating a Token",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "ERC-721 (NFTs)",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Minting NFTs",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Web3.js Introduction",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Ethers.js Introduction",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Frontend Integration",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "Reading Blockchain Data",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Writing Transactions",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Hardhat Setup",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Smart Contract Testing",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "Deploying with Hardhat",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Truffle Framework",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "DeFi Concepts",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Liquidity Pools",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Flash Loans",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Security Vulnerabilities",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Reentrancy Attacks",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Integer Overflow",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Smart Contract Auditing",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Oracles (Chainlink)",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "IPFS Storage",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Layer 2 Solutions",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Polygon",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Final DApp Project",
                        "duration": 13,
                        "completed": false
                }
        ],
        "s_system": [
                {
                        "id": "l1",
                        "title": "What is System Design?",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Client-Server Architecture",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Network Protocols",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "IP & DNS",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Latency vs Throughput",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Vertical vs Horizontal Scaling",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Load Balancing",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "L4 vs L7 Load Balancers",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "CAP Theorem",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "PACELC Theorem",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Databases Intro",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Relational vs NoSQL",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "ACID Properties",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "BASE Properties",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "Indexes",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "Database Sharding",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Partitioning",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Replication",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Leader-Follower",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "Consistent Hashing",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Caching Strategies",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Redis & Memcached",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "CDN (Content Delivery Network)",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Message Queues",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Kafka & RabbitMQ",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Pub/Sub Model",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Event-Driven Architecture",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Microservices vs Monolith",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "API Gateways",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Rate Limiting",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "WebSockets",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Long Polling",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Distributed Consensus",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Paxos & Raft",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "Distributed Locks",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "Two-Phase Commit",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Saga Pattern",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Distributed Tracing",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Fault Tolerance",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Disaster Recovery",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Designing a URL Shortener",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Designing Twitter/X",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Designing WhatsApp",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "Designing Netflix",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Designing Uber",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Designing Amazon",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Designing a Web Crawler",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l48",
                        "title": "Whiteboarding Tips",
                        "duration": 12,
                        "completed": false
                }
        ],
        "s_game": [
                {
                        "id": "l1",
                        "title": "Intro to Game Dev",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l2",
                        "title": "Unity Hub & Interface",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l3",
                        "title": "Game Objects & Components",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l4",
                        "title": "C# Basics for Unity",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l5",
                        "title": "Variables & Functions (C#)",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l6",
                        "title": "Transforms & Vectors",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l7",
                        "title": "Input System",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l8",
                        "title": "Prefabs",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l9",
                        "title": "2D Physics",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l10",
                        "title": "Rigidbodies & Colliders",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l11",
                        "title": "Sprite Rendering",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l12",
                        "title": "Animations in Unity",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l13",
                        "title": "Animator Controller",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l14",
                        "title": "Tilemaps",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l15",
                        "title": "Camera Movement",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l16",
                        "title": "3D Physics",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l17",
                        "title": "Materials & Textures",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l18",
                        "title": "Lighting Basics",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l19",
                        "title": "Post Processing",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l20",
                        "title": "UI System (Canvas)",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l21",
                        "title": "Buttons & Text",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l22",
                        "title": "Game Managers",
                        "duration": 12,
                        "completed": false
                },
                {
                        "id": "l23",
                        "title": "Singletons",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l24",
                        "title": "Audio System",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l25",
                        "title": "Sound Effects & Music",
                        "duration": 17,
                        "completed": false
                },
                {
                        "id": "l26",
                        "title": "Particle Systems",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l27",
                        "title": "Raycasting",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l28",
                        "title": "Coroutines",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l29",
                        "title": "Scene Management",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l30",
                        "title": "Saving Data (PlayerPrefs)",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l31",
                        "title": "Advanced C# Patterns",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l32",
                        "title": "Scriptable Objects",
                        "duration": 13,
                        "completed": false
                },
                {
                        "id": "l33",
                        "title": "Events & Delegates",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l34",
                        "title": "Object Pooling",
                        "duration": 11,
                        "completed": false
                },
                {
                        "id": "l35",
                        "title": "AI Basics",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l36",
                        "title": "NavMesh & Pathfinding",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l37",
                        "title": "Finite State Machines",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l38",
                        "title": "Multiplayer Concepts",
                        "duration": 18,
                        "completed": false
                },
                {
                        "id": "l39",
                        "title": "Photon (PUN 2)",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l40",
                        "title": "Mobile Optimization",
                        "duration": 16,
                        "completed": false
                },
                {
                        "id": "l41",
                        "title": "Draw Calls",
                        "duration": 15,
                        "completed": false
                },
                {
                        "id": "l42",
                        "title": "Asset Bundles",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l43",
                        "title": "Monetization (Ads)",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l44",
                        "title": "In-App Purchases",
                        "duration": 14,
                        "completed": false
                },
                {
                        "id": "l45",
                        "title": "Publishing to Steam",
                        "duration": 19,
                        "completed": false
                },
                {
                        "id": "l46",
                        "title": "Publishing to Play Store",
                        "duration": 10,
                        "completed": false
                },
                {
                        "id": "l47",
                        "title": "Final 3D Game",
                        "duration": 12,
                        "completed": false
                }
        ]

    },
    weeklyActivity: [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 1.0 },
        { day: 'Wed', hours: 3.5 },
        { day: 'Thu', hours: 0.5 },
        { day: 'Fri', hours: 2.0 },
        { day: 'Sat', hours: 4.0 },
        { day: 'Sun', hours: 1.5 }
    ],
    bugHunts: [
        { id: 1, title: "Student Portal Website", company: "EduTech Labs", rewardPool: "₹25,000", difficulty: "Intermediate", category: "Websites", timeRemaining: "4 Days", bugsFound: 12, status: "Active" },
        { id: 2, title: "E-Commerce Website", company: "ShopVerse", rewardPool: "₹50,000", difficulty: "Advanced", category: "E-Commerce", timeRemaining: "7 Days", bugsFound: 27, status: "Active" },
        { id: 3, title: "College Management System", company: "CampusTech", rewardPool: "₹15,000", difficulty: "Beginner", category: "Web Apps", timeRemaining: "10 Days", bugsFound: 8, status: "Active" },
        { id: 4, title: "FinTech Mobile App", company: "PaySmart", rewardPool: "₹75,000", difficulty: "Advanced", category: "FinTech", timeRemaining: "Ending Soon", bugsFound: 45, status: "Ending Soon" },
        { id: 5, title: "SaaS Dashboard", company: "CloudAnalytics", rewardPool: "₹10,000", difficulty: "Beginner", category: "SaaS", timeRemaining: "Closed", bugsFound: 15, status: "Completed" }
    ],
    userBugs: [
        { id: 1, title: "Login Error", website: "EduTech", severity: "High", status: "Under Review", reward: "—" },
        { id: 2, title: "Broken Search", website: "ShopVerse", severity: "Medium", status: "Accepted", reward: "₹2,000" },
        { id: 3, title: "UI Issue", website: "CampusTech", severity: "Low", status: "Duplicate", reward: "₹0" },
        { id: 4, title: "API Timeout", website: "ShopVerse", severity: "High", status: "Accepted", reward: "₹6,500" }
    ],
    companies: [
    {
        "id": 1,
        "name": "TechFlow Innovations",
        "category": "Software Development",
        "type": "Startup",
        "logo": "fa-solid fa-code-branch",
        "roles": [
            "Frontend Developer",
            "Full Stack Engineer"
        ],
        "skills": [
            "React",
            "Node.js",
            "TypeScript",
            "AWS"
        ],
        "description": "TechFlow Innovations is a fast-growing startup revolutionizing how development teams collaborate. We build cutting-edge CI/CD tools that empower developers to ship code faster and safer.",
        "culture": "Fast-paced, Remote-first, High-autonomy",
        "benefits": [
            "Unlimited PTO",
            "Home Office Stipend",
            "Comprehensive Health Coverage"
        ]
    },
    {
        "id": 2,
        "name": "Nexus Data Systems",
        "category": "Data & Analytics",
        "type": "Enterprise",
        "logo": "fa-solid fa-database",
        "roles": [
            "Data Scientist",
            "Data Engineer",
            "Machine Learning Ops"
        ],
        "skills": [
            "Python",
            "SQL",
            "TensorFlow",
            "Spark"
        ],
        "description": "Nexus Data Systems provides enterprise-scale data warehousing and predictive analytics. We help Fortune 500 companies turn their massive datasets into actionable intelligence.",
        "culture": "Analytical, Collaborative, Continuous Learning",
        "benefits": [
            "401k Matching",
            "Tuition Reimbursement",
            "Annual Tech Conference Pass"
        ]
    },
    {
        "id": 3,
        "name": "AeroCloud Solutions",
        "category": "Cloud Infrastructure",
        "type": "Enterprise",
        "logo": "fa-solid fa-cloud",
        "roles": [
            "Cloud Architect",
            "DevOps Engineer"
        ],
        "skills": [
            "AWS",
            "Kubernetes",
            "Docker",
            "Terraform"
        ],
        "description": "AeroCloud Solutions designs and manages highly available, globally distributed cloud infrastructure for mission-critical applications.",
        "culture": "Process-driven, Secure, Global Team",
        "benefits": [
            "Generous Equity",
            "Health & Wellness Allowance",
            "Paid Sabbatical"
        ]
    },
    {
        "id": 4,
        "name": "Cipher Security",
        "category": "Cyber Security",
        "type": "Agency",
        "logo": "fa-solid fa-shield-halved",
        "roles": [
            "Security Analyst",
            "Penetration Tester"
        ],
        "skills": [
            "Network Security",
            "Ethical Hacking",
            "Cryptography",
            "Python"
        ],
        "description": "Cipher is a boutique cybersecurity agency specializing in advanced penetration testing and threat modeling for fintech and healthcare industries.",
        "culture": "Intense, Highly Technical, Mission-driven",
        "benefits": [
            "Top-tier Equipment",
            "Certification Sponsorship (OSCP, CISSP)",
            "Flexible Hours"
        ]
    },
    {
        "id": 5,
        "name": "Lumina Design Studio",
        "category": "Design & UX",
        "type": "Agency",
        "logo": "fa-solid fa-pen-nib",
        "roles": [
            "UI/UX Designer",
            "Frontend Developer"
        ],
        "skills": [
            "Figma",
            "CSS",
            "JavaScript",
            "Design Systems"
        ],
        "description": "Lumina is a creative studio crafting beautiful, highly accessible digital experiences. We believe that great design is the intersection of empathy and technology.",
        "culture": "Creative, Empathetic, Inclusive",
        "benefits": [
            "4-Day Work Week",
            "Mental Health Days",
            "Design Retreats"
        ]
    },
    {
        "id": 6,
        "name": "OmniFin Tech",
        "category": "FinTech",
        "type": "Enterprise",
        "logo": "fa-solid fa-coins",
        "roles": [
            "Backend Engineer",
            "Blockchain Developer"
        ],
        "skills": [
            "Java",
            "Go",
            "Solidity",
            "Microservices"
        ],
        "description": "OmniFin Tech is building the next generation of decentralized financial systems and global payment rails to make banking accessible to everyone.",
        "culture": "Results-oriented, Innovative, Corporate",
        "benefits": [
            "Performance Bonuses",
            "On-site Gym",
            "Free Gourmet Meals"
        ]
    }
],
    interviewHistory: [
        { id: "h1", interviewId: "mi1", title: "Frontend Developer", date: "August 9", score: 84, status: "Completed" },
        { id: "h2", interviewId: "mi4", title: "Python Developer", date: "August 7", score: 88, status: "Completed" },
        { id: "h3", interviewId: "mi8", title: "HR Interview", date: "August 5", score: 79, status: "Completed" },
        { id: "h4", interviewId: "mi3", title: "Software Engineer", date: "August 2", score: 91, status: "Completed" }
    ],
    interviewReadiness: {
        score: 86,
        breakdown: [
            { label: "Technical Skills", score: 90 },
            { label: "Assessment Performance", score: 84 },
            { label: "Mock Interviews", score: 82 },
            { label: "Communication", score: 78 },
            { label: "Consistency", score: 91 }
        ]
    },
    interviewGoal: {
        title: "Complete 3 Mock Interviews This Week",
        progress: 2,
        total: 3
    },
    applications: [
        { id: "app1", company: "LinkedIn", role: "Frontend Intern", match: 92, status: "Interview Invited", nextStep: "Prepare", date: "2026-08-01" },
        { id: "app2", company: "Microsoft", role: "Software Intern", match: 88, status: "Under Review", nextStep: "View", date: "2026-08-05" },
        { id: "app3", company: "Deloitte", role: "Developer Intern", match: 84, status: "Shortlisted", nextStep: "Interview", date: "2026-08-02" },
        { id: "app4", company: "Accenture", role: "Software Intern", match: 81, status: "Applied", nextStep: "Track", date: "2026-08-08" }
    ],
    dailyTasks: {
        completed: 2,
        total: 5,
        tasks: [
            { id: "t1", text: "Complete 1 lecture", done: true },
            { id: "t2", text: "Take 1 assessment", done: true },
            { id: "t3", text: "Practice 1 mock interview", done: false },
            { id: "t4", text: "Review 1 weak skill", done: false },
            { id: "t5", text: "Check corporate matches", done: false }
        ]
    },
};

// Initialize State
async function initApp() {
    if (window.db) {
        try {
            // Wait for all major data points concurrently
            const [skillsRes, compRes, projRes, roadmapRes, assessRes, mockRes] = await Promise.all([
                window.db.from('skills').select('*').order('id'),
                window.db.from('companies').select('*').order('id'),
                window.db.from('projects').select('*').order('id'),
                window.db.from('roadmap_items').select('*'),
                window.db.from('assessments').select('*').order('id'),
                window.db.from('mockInterviews').select('*').order('id')
            ]);
            
            // Check auth state for profile
            let userProfile = null;
            if (window.Auth) {
                const currentUser = await window.Auth.getUser();
                if (currentUser) {
                    // Fetch their specific profile
                    const { data: profile } = await window.db.from('profiles').select('*').eq('id', currentUser.id).single();
                    if (profile) userProfile = profile;
                }
            }

            // Sync with local storage / MOCK_DATA
            // (Skills are now mapped and fetched via fetchDynamicData below)
            if (compRes.data && compRes.data.length > 0) MOCK_DATA.companies = compRes.data;
            // Removed bugHunts overwrite from projects table as bug hunts use bug_bounties
            
            if (roadmapRes.data && roadmapRes.data.length > 0) {
                const cc = {};
                roadmapRes.data.forEach(item => {
                    if(!cc[item.skill_id]) cc[item.skill_id] = [];
                    cc[item.skill_id].push(item);
                });
                if (cc["s1"]) localStorage.setItem('levelup_course_js', JSON.stringify(cc["s1"]));
            }

            if (assessRes.data && assessRes.data.length > 0) localStorage.setItem('levelup_assessments', JSON.stringify(assessRes.data));
            if (mockRes.data && mockRes.data.length > 0) localStorage.setItem('levelup_mock_interviews', JSON.stringify(mockRes.data));
            // Removed: Let fetchDynamicData handle the profile merging correctly so it doesn't overwrite local fields (college, branch, dob)

        } catch(e) {
            console.error("Failed to load live data from Supabase", e);
        }
    }

    // Fallbacks if data missing (e.g. user not logged in or fetch failed)
    if (!localStorage.getItem('levelup_user')) {
        localStorage.setItem('levelup_user', JSON.stringify(MOCK_DATA.user));
    }
    
    // Force overwrite local cache with clean mock data (only 5 skills) so old cached extra skills are deleted
    localStorage.setItem('levelup_skills', JSON.stringify(MOCK_DATA.skills));
    
    // Force reset notifications for the new update
    localStorage.setItem('levelup_notifications', JSON.stringify(MOCK_DATA.notifications));

    // Also save the entire new course content payload to localStorage
    localStorage.setItem('levelup_courseContent', JSON.stringify(MOCK_DATA.courseContent));
    if (!localStorage.getItem('levelup_user_bugs')) {
        localStorage.setItem('levelup_user_bugs', JSON.stringify(MOCK_DATA.userBugs));
    }
    if (!localStorage.getItem('levelup_career_profile')) {
        localStorage.setItem('levelup_career_profile', JSON.stringify(MOCK_DATA.careerProfile));
    }
    
    // Force overwrite local cache with clean mock data so old cached extra assessments are deleted
    localStorage.setItem('levelup_assessments', JSON.stringify(MOCK_DATA.assessments));
    if (!localStorage.getItem('levelup_mock_interviews')) {
        localStorage.setItem('levelup_mock_interviews', JSON.stringify(MOCK_DATA.mockInterviews));
    }
    if (!localStorage.getItem('levelup_interview_history')) {
        localStorage.setItem('levelup_interview_history', JSON.stringify(MOCK_DATA.interviewHistory));
    }
    if (!localStorage.getItem('levelup_applications')) {
        localStorage.setItem('levelup_applications', JSON.stringify(MOCK_DATA.applications));
    }
    if (!localStorage.getItem('levelup_daily_tasks')) {
        localStorage.setItem('levelup_daily_tasks', JSON.stringify(MOCK_DATA.dailyTasks));
    }

    if (!localStorage.getItem('levelup_interview_readiness')) {
        localStorage.setItem('levelup_interview_readiness', JSON.stringify(MOCK_DATA.interviewReadiness));
    }
    if (!localStorage.getItem('levelup_interview_goal')) {
        localStorage.setItem('levelup_interview_goal', JSON.stringify(MOCK_DATA.interviewGoal));
    }

    // Setup global UI components
    setupModals();
    setupAIChat();
    updateGlobalUI();
    setupThemeToggle();

    // Inject Lucide script for icons
    if (!document.getElementById('lucide-script')) {
        const script = document.createElement('script');
        script.id = 'lucide-script';
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => { if(window.lucide) lucide.createIcons(); };
        document.body.appendChild(script);
    } else if(window.lucide) {
        lucide.createIcons();
    }
    
    // Fetch Dynamic Data from Supabase if available
    if (window.supabase) {
        // Trigger UI IMMEDIATELY with local/mock data to eliminate latency
        document.dispatchEvent(new Event('AppDataLoaded'));
        
        // Fetch fresh data in the background and re-render
        fetchDynamicData().then(() => {
            document.dispatchEvent(new Event('AppDataLoaded'));
        }).catch(err => {
            console.error("Supabase fetch failed:", err);
        });
    } else {
        // Trigger UI scripts to render with mock data
        document.dispatchEvent(new Event('AppDataLoaded'));
    }
}

// Supabase Data Fetching
async function fetchDynamicData() {
    try {
        const supabase = window.db;
        if(!supabase) throw new Error("Supabase client not initialized");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        // 1. Fetch Skills 
        const { data: skills, error: skillsErr } = await supabase.from('skills').select('*');
        if (!skillsErr && skills && skills.length > 0) {
            const dynamicSkills = skills.map((s) => ({
                id: s.id,
                name: s.name,
                category: s.category,
                difficulty: s.difficulty,
                subSkills: s.subSkills || 5, 
                lectures: s.lectures || 10,
                hours: s.hours || 0,
                progress: s.progress || 0,
                icon: s.icon || "fa-solid fa-code",
                desc: s.desc || ""
            }));
            localStorage.setItem('levelup_skills', JSON.stringify(dynamicSkills));
        }

        // 2. Fetch Companies 
        const { data: companies, error: compErr } = await supabase.from('companies').select('*');
        if (!compErr && companies && companies.length > 0) {
            const dynamicCompanies = companies.map(c => {
                let iconClass = c.logo || "fa-solid fa-building";
                if (!c.logo) {
                    const lowerName = (c.name || "").toLowerCase();
                    if (lowerName.includes("microsoft")) iconClass = "fa-brands fa-microsoft";
                    else if (lowerName.includes("google")) iconClass = "fa-brands fa-google";
                    else if (lowerName.includes("apple")) iconClass = "fa-brands fa-apple";
                    else if (lowerName.includes("amazon")) iconClass = "fa-brands fa-aws";
                    else if (lowerName.includes("meta") || lowerName.includes("facebook")) iconClass = "fa-brands fa-meta";
                    else if (lowerName.includes("linkedin")) iconClass = "fa-brands fa-linkedin";
                    else if (lowerName.includes("tata") || lowerName.includes("tcs")) iconClass = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3x-Xihii0MqNDSL0ASS7ZUp36dmpawKSZJHryuYQT6Q&s=10";
                }
                return {
                    id: c.id,
                    name: c.name,
                    category: c.category,
                    type: c.type || "Enterprise",
                    logo: iconClass,
                    description: c.description,
                    culture: c.culture,
                    benefits: c.benefits || [],
                    roles: c.roles || ["Software Engineer", "Data Scientist", "Cloud Architect"],
                    skills: c.skills || ["React", "Python", "AWS", "SQL"]
                };
            });
            localStorage.setItem('levelup_companies', JSON.stringify(dynamicCompanies));
        }

        // 3. Fetch Bug Bounties (mapped to 'projects' in SQL)
        const { data: bugs, error: bugsErr } = await supabase.from('projects').select('*');
        if (!bugsErr && bugs && bugs.length > 0) {
            const dynamicBugs = bugs.map(b => ({
                id: b.id,
                title: b.title,
                company: b.company || "Unknown Company",
                rewardPool: b.rewardPool || "₹0",
                difficulty: b.difficulty || "Medium",
                category: b.category || "Security",
                timeRemaining: b.timeRemaining || "Active",
                bugsFound: b.bugsFound || 0,
                status: b.status || "Active"
            }));
            localStorage.setItem('levelup_bugHunts', JSON.stringify(dynamicBugs));
        }
        
        // 4. Fetch Auth Profile
        if (session && session.user) {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            if (profile) {
                const userState = AppState.getUser() || MOCK_DATA.user;
                userState.name = profile.name || userState.name || 'User';
                userState.email = profile.email || userState.email || 'user@example.com';
                userState.learningHours = profile.learning_hours ?? userState.learningHours ?? 0;
                userState.streak = profile.streak ?? userState.streak ?? 0;
                userState.completedSkills = profile.completed_skills ?? userState.completedSkills ?? 0;
                userState.totalSkillsLearning = profile.total_skills_learning ?? userState.totalSkillsLearning ?? 0;
                localStorage.setItem('levelup_user', JSON.stringify(userState));
            }
        }
        
        // Ensure UI updates if state changed
        updateGlobalUI();
        
    } catch (e) {
        console.error("Error in fetchDynamicData:", e);
    }
}

// State Accessors
const AppState = {
    getCourseContent: () => JSON.parse(localStorage.getItem('levelup_courseContent')) || MOCK_DATA.courseContent,
    getUser: () => JSON.parse(localStorage.getItem('levelup_user')),
    setUser: (user) => {
        localStorage.setItem('levelup_user', JSON.stringify(user));
        if (window.db && user.id) {
            window.db.from('profiles')
                .update(user)
                .eq('id', user.id)
                .then(({error}) => { if (error) console.error("Failed to update profile", error) });
        }
    },
    
    getSkills: () => JSON.parse(localStorage.getItem('levelup_skills')),
    updateSkillProgress: (skillId, progress) => {
        const skills = AppState.getSkills();
        const skill = skills.find(s => s.id === skillId);
        if(skill) {
            skill.progress = progress;
            localStorage.setItem('levelup_skills', JSON.stringify(skills));
            
            if (window.db) {
                window.db.from('skills')
                    .update({ progress: progress })
                    .eq('id', skillId)
                    .then(({error}) => { if (error) console.error("Failed to update skill progress", error) });
            }
        }
    },
    
    getNotifications: () => JSON.parse(localStorage.getItem('levelup_notifications')),
    markNotificationRead: (id) => {
        const notifs = AppState.getNotifications();
        const notif = notifs.find(n => n.id === id);
        if(notif) notif.read = true;
        localStorage.setItem('levelup_notifications', JSON.stringify(notifs));
        updateGlobalUI();
    },
    markAllNotificationsRead: () => {
        const notifs = AppState.getNotifications();
        notifs.forEach(n => n.read = true);
        localStorage.setItem('levelup_notifications', JSON.stringify(notifs));
        updateGlobalUI();
    },
    
    
    // Assessments & Interviews
    getAssessments: () => JSON.parse(localStorage.getItem('levelup_assessments')),
    updateAssessment: (id, updates) => {
        const items = AppState.getAssessments();
        const item = items.find(i => i.id === id);
        if(item) { 
            Object.assign(item, updates); 
            localStorage.setItem('levelup_assessments', JSON.stringify(items)); 
            
            if (window.db) {
                window.db.from('assessments')
                    .update(updates)
                    .eq('id', id)
                    .then(({error}) => { if (error) console.error("Failed to update assessment", error) });
            }
        }
    },
    getMockInterviews: () => JSON.parse(localStorage.getItem('levelup_mock_interviews')),
    updateMockInterview: (miId, updates) => {
        const mis = AppState.getMockInterviews();
        const index = mis.findIndex(m => m.id === miId);
        if(index !== -1) {
            mis[index] = { ...mis[index], ...updates };
            localStorage.setItem('levelup_mock_interviews', JSON.stringify(mis));
            
            if (window.db) {
                window.db.from('mockInterviews')
                    .update(updates)
                    .eq('id', miId)
                    .then(({error}) => { if (error) console.error("Failed to update mock interview", error) });
            }
        }
    },
    
    getInterviewHistory: () => JSON.parse(localStorage.getItem('levelup_interview_history')),
    addInterviewHistory: (historyObj) => {
        const history = AppState.getInterviewHistory() || [];
        history.unshift(historyObj); // Add to front
        localStorage.setItem('levelup_interview_history', JSON.stringify(history));
    },

    getInterviewReadiness: () => JSON.parse(localStorage.getItem('levelup_interview_readiness')),
    getInterviewGoal: () => JSON.parse(localStorage.getItem('levelup_interview_goal')),
    
    getApplications: () => JSON.parse(localStorage.getItem('levelup_applications')),
    addApplication: (app) => {
        const apps = AppState.getApplications();
        apps.unshift(app);
        localStorage.setItem('levelup_applications', JSON.stringify(apps));
    },
    updateApplication: (id, updates) => {
        const apps = AppState.getApplications();
        const app = apps.find(a => a.id === id);
        if(app) { Object.assign(app, updates); localStorage.setItem('levelup_applications', JSON.stringify(apps)); }
    },
    
    // Daily Tasks
    getDailyTasks: () => JSON.parse(localStorage.getItem('levelup_daily_tasks')),
    updateDailyTask: (id, done) => {
        const state = AppState.getDailyTasks();
        const task = state.tasks.find(t => t.id === id);
        if(task) { 
            task.done = done; 
            state.completed = state.tasks.filter(t => t.done).length;
            localStorage.setItem('levelup_daily_tasks', JSON.stringify(state)); 
        }
    },
    
    // Notifications Enhancement
    addNotification: (notif) => {
        const notifs = AppState.getNotifications();
        notifs.unshift(notif);
        localStorage.setItem('levelup_notifications', JSON.stringify(notifs));
        updateGlobalUI();
    },

    // Bug Hunting
    getBugHunts: () => {
        const cached = JSON.parse(localStorage.getItem('levelup_bugHunts'));
        if (cached && cached.length > 0 && cached[0].title && cached[0].title !== 'null' && cached[0].title !== 'undefined') {
            return cached;
        }
        return MOCK_DATA.bugHunts;
    },
    getUserBugs: () => JSON.parse(localStorage.getItem('levelup_user_bugs')),
    addUserBug: (bug) => {
        const bugs = AppState.getUserBugs();
        bugs.unshift(bug);
        localStorage.setItem('levelup_user_bugs', JSON.stringify(bugs));
    },
    
    // Corporate Matches
    getCompanies: () => {
        const cached = JSON.parse(localStorage.getItem('levelup_companies'));
        if (cached && cached.length > 0 && cached[0].logo.includes('/')) {
            localStorage.setItem('levelup_companies', JSON.stringify(MOCK_DATA.companies));
            return MOCK_DATA.companies;
        }
        return cached || MOCK_DATA.companies;
    },
    getCareerProfile: () => JSON.parse(localStorage.getItem('levelup_career_profile')),
    updateCareerProfile: (data) => {
        const profile = { ...AppState.getCareerProfile(), ...data };
        localStorage.setItem('levelup_career_profile', JSON.stringify(profile));
    }
};

// Global UI Updates
function updateGlobalUI() {
    // Update username in topbar
    const userNameEls = document.querySelectorAll('.user-name');
    const user = AppState.getUser();
    if(user) {
        userNameEls.forEach(el => el.textContent = user.name);
    }
    
    // Update notification dot
    const notifDot = document.querySelector('.notification-dot');
    if(notifDot) {
        const unreadCount = AppState.getNotifications().filter(n => !n.read).length;
        if(unreadCount > 0) {
            notifDot.style.display = 'block';
        } else {
            notifDot.style.display = 'none';
        }
    }
}

// Toast System
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-check-circle" style="color: var(--success)"></i>' : '<i class="fa-solid fa-info-circle"></i>';
    
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modal System
function setupModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeBtns = document.querySelectorAll('.close-btn, [data-close-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.classList.remove('active');
    });
}

// AI Chat System
function setupAIChat() {
    // Add chat HTML if not exists
    if(!document.querySelector('.ai-chat-btn') && !document.querySelector('.landing-page')) {
        const chatHTML = `
            <button class="ai-chat-btn" onclick="toggleChat()">
                <i class="fa-solid fa-robot"></i>
            </button>
            <div class="chat-window" id="aiChatWindow">
                <div class="chat-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-robot" style="color: var(--primary)"></i>
                        <strong>Level Up AI</strong>
                    </div>
                    <button class="close-btn" onclick="toggleChat()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message ai">Hey! I'm your learning assistant. What would you like to learn today?</div>
                </div>
                <div class="chat-input">
                    <input type="text" id="chatInputText" placeholder="Ask something..." onkeypress="handleChatKey(event)">
                    <button onclick="sendChatMessage()"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
}

window.toggleChat = function() {
    const chat = document.getElementById('aiChatWindow');
    if(chat) {
        chat.classList.toggle('active');
        if(chat.classList.contains('active')) {
            document.getElementById('chatInputText').focus();
        }
    }
}

window.sendChatMessage = function() {
    const input = document.getElementById('chatInputText');
    const text = input.value.trim();
    if(text) {
        const messages = document.getElementById('chatMessages');
        // Add User Message
        messages.innerHTML += `<div class="message user">${text}</div>`;
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
        
        // Simulate typing delay
        setTimeout(() => {
            const aiResponses = [
                "Sure! Let's break it down step by step.",
                "That's a great question. You can find more about this in the JavaScript course.",
                "I recommend practicing Data Structures next.",
                "Keep going, you're making great progress!"
            ];
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            messages.innerHTML += `<div class="message ai">${response}</div>`;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }
}

window.handleChatKey = function(e) {
    if(e.key === 'Enter') sendChatMessage();
}

// Global Search Simulator
window.handleGlobalSearch = function(e) {
    if(e.key === 'Enter') {
        const query = e.target.value.trim();
        if(query) {
            showToast(`Searching for: ${query}`);
            setTimeout(() => {
                window.location.href = 'skills.html?search=' + encodeURIComponent(query);
            }, 800);
        }
    }
}

// Theme Toggle System
function setupThemeToggle() {
    // Check local storage for theme
    const isLightMode = localStorage.getItem('levelup_theme') === 'light';
    if (isLightMode) {
        document.body.classList.add('light-mode');
    }

    // Function to handle the actual theme toggling logic
    const handleToggle = () => {
        const body = document.body;

        // Inject a temporary stylesheet that forces smooth transitions on ALL elements.
        // Using double rAF ensures the transition starts before the style is removed —
        // once a CSS transition begins, it runs to completion even if the rule is gone.
        const style = document.createElement('style');
        style.id = '__theme-transition__';
        style.textContent = `
            *, *::before, *::after {
                transition:
                    background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                    color            0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color     0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow       0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    fill             0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
        `;
        document.head.appendChild(style);

        // Toggle theme immediately — the injected transitions catch it
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('levelup_theme', isLight ? 'light' : 'dark');

        // Update icons
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.innerHTML = isLight
                ? '<i class="fa-solid fa-moon" id="themeIcon"></i>'
                : '<i class="fa-solid fa-sun" id="themeIcon"></i>';
        });

        // Double rAF: remove the style after the transition has already started.
        // The browser will let running transitions finish naturally.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                style.remove();
            });
        });
    };

    // 1. Bind to any existing theme toggle buttons (e.g., the ones in the topbar)
    const existingBtns = document.querySelectorAll('.theme-toggle-btn');
    if (existingBtns.length > 0) {
        existingBtns.forEach(btn => {
            btn.innerHTML = isLightMode ? '<i class="fa-solid fa-moon" id="themeIcon"></i>' : '<i class="fa-solid fa-sun" id="themeIcon"></i>';
            btn.onclick = handleToggle;
        });
    } else {
        // 2. Fallback for pages without standard topbar (skip landing and auth pages)
        if (!document.querySelector('.landing-page') && !document.querySelector('.auth-container')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'theme-toggle-btn';
            toggleBtn.style.position = 'fixed';
            toggleBtn.style.bottom = '80px';
            toggleBtn.style.right = '20px';
            toggleBtn.style.zIndex = '1000';
            toggleBtn.innerHTML = isLightMode ? '<i class="fa-solid fa-moon" id="themeIcon"></i>' : '<i class="fa-solid fa-sun" id="themeIcon"></i>';
            toggleBtn.onclick = handleToggle;
            document.body.appendChild(toggleBtn);
        }
    }
    // Global Keyboard Shortcut: Alt+T (Windows) / Option+T (Mac)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            handleToggle();
        }
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', initApp);
