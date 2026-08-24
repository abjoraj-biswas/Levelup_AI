-- Supabase Schema for LevelUp AI

-- 1. Profiles Table (User Data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    college TEXT,
    branch TEXT,
    dob DATE,
    streak INTEGER DEFAULT 0,
    learning_hours INTEGER DEFAULT 0,
    completed_skills INTEGER DEFAULT 0,
    total_skills_learning INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    difficulty TEXT,
    subSkills JSONB, -- Stored as JSON array
    lectures INTEGER,
    hours INTEGER,
    progress INTEGER DEFAULT 0,
    icon TEXT,
    desc TEXT
);

-- 3. Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    difficulty TEXT,
    questions INTEGER,
    duration INTEGER,
    status TEXT,
    bestScore INTEGER,
    passScore INTEGER,
    isNew BOOLEAN
);

-- 4. Projects Table (Bug Hunts)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT,
    rewardPool TEXT,
    difficulty TEXT,
    category TEXT,
    timeRemaining TEXT,
    bugsFound INTEGER DEFAULT 0,
    status TEXT
);

-- 5. Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    type TEXT,
    logo TEXT,
    roles JSONB, -- Array of strings
    skills JSONB, -- Array of strings
    description TEXT,
    culture TEXT,
    benefits JSONB -- Array of strings
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Allow public read access to non-sensitive data
CREATE POLICY "Allow public read access to skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to assessments" ON public.assessments FOR SELECT USING (true);
CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to companies" ON public.companies FOR SELECT USING (true);

-- Allow users to only read/update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
