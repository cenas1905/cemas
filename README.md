# CVio — AI Özgeçmiş & Kariyer Koçu

Bu proje, Next.js 16 (App Router), Tailwind CSS, shadcn/ui, Supabase, Stripe, Claude/Gemini AI ve Apify entegrasyonu ile geliştirilmiş yapay zeka destekli bir CV oluşturucu ve kariyer koçu uygulamasıdır.

---

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin:

1. **Bağımlılıkları Kurun:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Çevre Değişkenlerini Tanımlayın:**
   Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri kendi anahtarlarınızla doldurun. (.env.local şablonu aşağıda verilmiştir).

3. **Yerel Test Kullanıcısı Oluşturun:**
   Supabase veritabanınızda e-posta doğrulaması gerektirmeyen, doğrudan giriş yapabileceğiniz hazır bir test kullanıcısı oluşturmak için aşağıdaki komutu çalıştırın:
   ```bash
   node scripts/create_test_user.js
   ```

4. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak test kullanıcısı ile giriş yapabilirsiniz:
   * **E-posta:** `test_dev_user@example.com`
   * **Şifre:** `Password123!`

---

## 🗄️ Supabase SQL Kurulum Şeması (SQL Editor)

Uygulamanın çalışması için Supabase Dashboard'daki **SQL Editor** alanında aşağıdaki sorguları sırayla çalıştırın.

```sql
-- 1. PROFILLER TABLOSU
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free',          -- 'free' | 'pro' | 'annual'
  plan_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CV'LER TABLOSU
CREATE TABLE cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  target_company TEXT,
  data JSONB NOT NULL,
  template TEXT DEFAULT 'modern',
  is_public BOOLEAN DEFAULT FALSE,
  link_expires_at TIMESTAMPTZ,
  pdf_url TEXT,
  pdf_expires_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GÖRÜNTÜLENME LOGLARI
CREATE TABLE cv_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewer_country TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. STRIPE ABONELIKLER
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT,
  status TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar sadece kendi CV'lerini yönetebilir" ON cvs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Kamuya açık CV'ler herkes tarafından görüntülenebilir" ON cvs
  FOR SELECT USING (is_public = true);

-- 6. OTOMATIK PROFIL TETIKLEYICISI (AUTO PROFILE CREATION)
-- Yeni bir kullanıcı kaydolduğunda otomatik olarak profil kaydı oluşturur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, plan)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 🔑 Çevre Değişkenleri (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe Configuration (Test Mode veya Production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...

# Yapay Zeka Sağlayıcıları
# Gemini API Key (Birincil sağlayıcı)
GEMINI_API_KEY=AIzaSy...
# Anthropic API Key (Yedek sağlayıcı)
ANTHROPIC_API_KEY=sk-ant-...

# Apify Token (LinkedIn Import & Scraper)
APIFY_TOKEN=apify_api_...

# App URL Configuration
NEXT_PUBLIC_URL=http://localhost:3000
```

---

## 🚀 Üretime (Production) Sunma & Yayına Alma (Vercel)

Uygulamayı tamamen internete açıp paylaşmak için:

1. **GitHub Deposu Oluşturun:**
   Proje dosyalarını kendi GitHub hesabınıza yükleyin:
   ```bash
   git init
   git add .
   git commit -m "feat: first release ready"
   git remote add origin <github-depo-url>
   git push -u origin main
   ```

2. **Vercel'e Bağlayın:**
   * [Vercel](https://vercel.com) hesabınıza gidin.
   * **Add New > Project** seçeneğiyle GitHub deponuzu bağlayın.
   * **Environment Variables** bölümüne yukarıdaki `.env.local` değişkenlerini ekleyin.
   * `NEXT_PUBLIC_URL` değişkenini Vercel'in size vereceği canlı URL (`https://projeadi.vercel.app`) ile güncelleyin.
   * **Deploy** butonuna tıklayın. Uygulamanız birkaç dakika içinde canlıya alınacaktır.

3. **Stripe Webhook Yapılandırması (Canlıda):**
   * Canlı ortama geçtiğinizde, Stripe Dashboard üzerinde yeni bir Webhook URL'si tanımlayın: `https://projeadi.vercel.app/api/stripe/webhook`
   * Dinlenecek olayları seçin: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
   * Vercel'deki `STRIPE_WEBHOOK_SECRET` değerini yeni webhook sırrı ile güncelleyin.
