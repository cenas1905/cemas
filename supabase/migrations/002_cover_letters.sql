-- 002_cover_letters.sql
-- Create cover_letters table for storing scraped company info and AI generated cover letters

CREATE TABLE public.cover_letters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  cv_id UUID REFERENCES public.cvs(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  company_website TEXT,
  job_title TEXT NOT NULL,
  company_info TEXT,                 -- Apify ile çekilen şirket özet bilgisi
  content TEXT NOT NULL,              -- AI tarafından yazılan mektup (markdown)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;

-- Policy
CREATE POLICY "Users own their cover_letters" ON public.cover_letters
  FOR ALL USING (auth.uid() = user_id);
