-- Supabase Profile Trigger (Bulletproof)
-- Run this in the Supabase SQL Editor.

-- 1. Create the profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  college TEXT,
  branch TEXT,
  dob DATE,
  streak INTEGER DEFAULT 0,
  learning_hours INTEGER DEFAULT 0,
  completed_skills INTEGER DEFAULT 0,
  total_skills_learning INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies safely (using DO block to ignore if they already exist)
DO $$
BEGIN
    BEGIN
        CREATE POLICY "Users can view their own profile" 
        ON public.profiles FOR SELECT USING (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN null; END;

    BEGIN
        CREATE POLICY "Users can update their own profile" 
        ON public.profiles FOR UPDATE USING (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN null; END;

    BEGIN
        CREATE POLICY "Users can insert their own profile" 
        ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN null; END;
END
$$;

-- 4. Create the Bulletproof Trigger Function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- We wrap the insert in an exception block so that if ANYTHING goes wrong 
  -- (e.g. missing columns, constraints), it DOES NOT block the user from signing up.
  BEGIN
    INSERT INTO public.profiles (id, email, name, learning_hours, streak, completed_skills, total_skills_learning)
    VALUES (
      NEW.id,
      COALESCE(NEW.email, 'unknown@example.com'),
      COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
      0,
      0,
      0,
      0
    )
    ON CONFLICT (id) DO UPDATE SET 
      email = EXCLUDED.email,
      name = COALESCE(public.profiles.name, EXCLUDED.name);
  EXCEPTION WHEN OTHERS THEN
    -- Silently catch the error and allow the auth signup to succeed.
    -- You can view this in Postgres Logs later if needed.
    RAISE LOG 'Trigger profile insertion failed: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Attach the Trigger to Auth Users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
