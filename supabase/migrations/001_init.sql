-- 001_init.sql
-- Supabase PostgreSQL database schema initialization

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free',          -- 'free' | 'pro' | 'annual'
  plan_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. CVs Table
CREATE TABLE public.cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,               -- "Ali'nin Google CV'si"
  slug TEXT UNIQUE,                  -- "ali-google" -> /cv/ali-google
  target_company TEXT,               -- "Google" (şirkete özel link için)
  data JSONB NOT NULL,               -- Tüm CV verisi (deneyim, eğitim, vb.)
  template TEXT DEFAULT 'modern',    -- CV şablon adı
  is_public BOOLEAN DEFAULT FALSE,   -- Link aktif mi?
  link_expires_at TIMESTAMPTZ,       -- 7 gün sonra -> upgrade sayfasına yönlendir
  pdf_url TEXT,                      -- Supabase Storage'daki PDF linki
  pdf_expires_at TIMESTAMPTZ,        -- PDF 7 günde silinir (free plan)
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for CVs
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their CVs" ON public.cvs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public CVs are viewable" ON public.cvs
  FOR SELECT USING (is_public = true);

-- 3. CV Views (Link view logs)
CREATE TABLE public.cv_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cv_id UUID REFERENCES public.cvs(id) ON DELETE CASCADE NOT NULL,
  viewer_ip TEXT,
  viewer_country TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for CV Views
ALTER TABLE public.cv_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a view" ON public.cv_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "CV owners can read views" ON public.cv_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.cvs
      WHERE public.cvs.id = cv_id AND public.cvs.user_id = auth.uid()
    )
  );

-- 4. Subscriptions Table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT,
  status TEXT,                       -- 'active' | 'canceled' | 'past_due'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- 5. Trigger to automatically create profile for new auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
