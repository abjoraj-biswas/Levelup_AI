-- ==========================================
-- LevelUp.AI Supabase Database Initialization
-- ==========================================

-- 1. Clean up existing tables to prevent "already exists" errors
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.opportunities CASCADE;
DROP TABLE IF EXISTS public.bug_bounties CASCADE;
DROP TABLE IF EXISTS public.skills CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 2. Create Tables
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'student',
    learning_hours INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    duration_hours INTEGER NOT NULL,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'in_progress', -- 'in_progress' or 'completed'
    progress_percentage INTEGER DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, skill_id)
);

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    industry TEXT,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    job_type TEXT NOT NULL,
    salary_range TEXT,
    location TEXT,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.bug_bounties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    reward_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. Setup Row Level Security (RLS)
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bug_bounties ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read profiles, but users can only update their own.
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Skills, Companies, Opportunities, Bug Bounties: Publicly readable
CREATE POLICY "Skills are publicly viewable." ON public.skills FOR SELECT USING (true);
CREATE POLICY "Companies are publicly viewable." ON public.companies FOR SELECT USING (true);
CREATE POLICY "Opportunities are publicly viewable." ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Bug bounties are publicly viewable." ON public.bug_bounties FOR SELECT USING (true);

-- User Progress: Users can only read/write their own progress
CREATE POLICY "Users can view own progress." ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress." ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress." ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================
-- 3. Seed Dummy Data
-- ==========================================

-- Insert dummy Skills
INSERT INTO public.skills (id, title, category, difficulty, duration_hours, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Advanced Web Development', 'Frontend', 'Advanced', 40, 'Master modern frontend frameworks like React and Vue.'),
('22222222-2222-2222-2222-222222222222', 'Data Science & Machine Learning', 'AI/ML', 'Intermediate', 60, 'Learn Python, pandas, scikit-learn, and neural networks.'),
('33333333-3333-3333-3333-333333333333', 'Full-Stack JavaScript', 'Backend', 'Intermediate', 50, 'Build full-stack applications with Node.js, Express, and React.'),
('44444444-4444-4444-4444-444444444444', 'Cloud Architecture (AWS)', 'Cloud', 'Advanced', 35, 'Learn how to deploy scalable applications using AWS.'),
('55555555-5555-5555-5555-555555555555', 'Cybersecurity Fundamentals', 'Cyber Security', 'Beginner', 20, 'Learn the basics of network security and ethical hacking.');

-- Insert dummy Companies
INSERT INTO public.companies (id, name, industry, description) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Microsoft', 'Technology', 'Leading technology company building Windows, Azure, and Office.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Google', 'Technology', 'Multinational tech company specializing in internet-related services.'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Amazon', 'E-commerce & Cloud', 'E-commerce giant and provider of AWS cloud computing.');

-- Insert dummy Opportunities (Jobs)
INSERT INTO public.opportunities (company_id, title, job_type, salary_range, location) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Frontend Developer', 'Full-time', '$120k - $150k', 'Seattle, WA'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Machine Learning Engineer', 'Full-time', '$140k - $180k', 'Mountain View, CA'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Cloud Architect', 'Full-time', '$130k - $170k', 'Seattle, WA');

-- Insert dummy Bug Bounties
INSERT INTO public.bug_bounties (company_id, title, severity, reward_amount) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'XSS Vulnerability in Search API', 'High', 5000),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Auth Bypass in Teams Desktop', 'Critical', 15000),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Information Disclosure in S3 Buckets', 'High', 8000);

-- ==========================================
-- 4. Set up Auth Trigger for new users
-- ==========================================
-- Automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists (so script is idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
