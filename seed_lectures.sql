-- 1. Create roadmap_items table
DROP TABLE IF EXISTS public.roadmap_items CASCADE;

CREATE TABLE public.roadmap_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add completed_lectures array to user_progress (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_progress' AND column_name='completed_lectures') THEN
        ALTER TABLE public.user_progress ADD COLUMN completed_lectures UUID[] DEFAULT '{}';
    END IF;
END $$;

-- 3. Seed Lectures for the skills
-- Since the skills were created with specific UUIDs in your previous script, we'll use those exact UUIDs!

-- Skill 1: Advanced Web Development (11111111-1111-1111-1111-111111111111)
INSERT INTO public.roadmap_items (skill_id, title, order_index, duration_minutes) VALUES
('11111111-1111-1111-1111-111111111111', 'Modern CSS & Flexbox/Grid', 1, 45),
('11111111-1111-1111-1111-111111111111', 'JavaScript ES6+ Deep Dive', 2, 60),
('11111111-1111-1111-1111-111111111111', 'React Hooks and State Management', 3, 50),
('11111111-1111-1111-1111-111111111111', 'Next.js & Server Side Rendering', 4, 55),
('11111111-1111-1111-1111-111111111111', 'Frontend Performance Optimization', 5, 40);

-- Skill 2: Data Science & Machine Learning (22222222-2222-2222-2222-222222222222)
INSERT INTO public.roadmap_items (skill_id, title, order_index, duration_minutes) VALUES
('22222222-2222-2222-2222-222222222222', 'Introduction to Pandas and NumPy', 1, 40),
('22222222-2222-2222-2222-222222222222', 'Data Cleaning and Preprocessing', 2, 45),
('22222222-2222-2222-2222-222222222222', 'Exploratory Data Analysis (EDA)', 3, 50),
('22222222-2222-2222-2222-222222222222', 'Supervised Learning with scikit-learn', 4, 60),
('22222222-2222-2222-2222-222222222222', 'Neural Networks with TensorFlow', 5, 75);

-- Skill 3: Full-Stack JavaScript (33333333-3333-3333-3333-333333333333)
INSERT INTO public.roadmap_items (skill_id, title, order_index, duration_minutes) VALUES
('33333333-3333-3333-3333-333333333333', 'Node.js Core Concepts', 1, 45),
('33333333-3333-3333-3333-333333333333', 'Express.js and RESTful APIs', 2, 50),
('33333333-3333-3333-3333-333333333333', 'Connecting to Databases (MongoDB/PostgreSQL)', 3, 55),
('33333333-3333-3333-3333-333333333333', 'Authentication and JWTs', 4, 40),
('33333333-3333-3333-3333-333333333333', 'Building the React Frontend', 5, 60),
('33333333-3333-3333-3333-333333333333', 'Connecting React to Express APIs', 6, 45),
('33333333-3333-3333-3333-333333333333', 'State Management for Full Stack', 7, 50),
('33333333-3333-3333-3333-333333333333', 'WebSockets and Real-time Data', 8, 55),
('33333333-3333-3333-3333-333333333333', 'Testing Node.js and React Applications', 9, 60),
('33333333-3333-3333-3333-333333333333', 'Deployment on AWS/Vercel', 10, 45);

-- Skill 4: Cloud Architecture (AWS) (44444444-4444-4444-4444-444444444444)
INSERT INTO public.roadmap_items (skill_id, title, order_index, duration_minutes) VALUES
('44444444-4444-4444-4444-444444444444', 'AWS Identity and Access Management (IAM)', 1, 30),
('44444444-4444-4444-4444-444444444444', 'EC2 and Virtual Machines', 2, 45),
('44444444-4444-4444-4444-444444444444', 'S3 Storage Solutions', 3, 40),
('44444444-4444-4444-4444-444444444444', 'VPC and Networking Basics', 4, 60),
('44444444-4444-4444-4444-444444444444', 'Serverless Architectures with Lambda', 5, 55);

-- Skill 5: Cybersecurity Fundamentals (55555555-5555-5555-5555-555555555555)
INSERT INTO public.roadmap_items (skill_id, title, order_index, duration_minutes) VALUES
('55555555-5555-5555-5555-555555555555', 'Introduction to Information Security', 1, 30),
('55555555-5555-5555-5555-555555555555', 'Network Security and Firewalls', 2, 45),
('55555555-5555-5555-5555-555555555555', 'Cryptography Basics', 3, 50),
('55555555-5555-5555-5555-555555555555', 'Common Web Vulnerabilities (OWASP Top 10)', 4, 60),
('55555555-5555-5555-5555-555555555555', 'Incident Response and Forensics', 5, 45);

-- 4. Enable RLS for roadmap_items
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view roadmap_items." ON public.roadmap_items FOR SELECT USING (true);
