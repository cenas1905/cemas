# 🚀 AI Özgeçmiş & Kariyer Koçu — Tam Proje Dökümanı
### Claude Code için Hazırlanmış — Teknik Bilgi Gerekmez

---

## 📌 CLAUDE CODE'A NOT

Bu dökümanı baştan sona oku. Sonra aşağıdaki teknoloji stack'ini ve mimariyi birebir uygula. Kullanıcı teknik bilgiye sahip değil; her karar bu döküman içinde verilmiştir. Senden beklenen şey, bu dökümanı okuyup uygulamayı sıfırdan çalışır hale getirmektir.

---

## 🎯 Ürün Özeti

**Ürün Adı:** CVio (ya da başka bir isim önerilebilir)

**Ne yapar?**
Kullanıcılar LinkedIn profillerini yapıştırarak ya da manuel olarak bilgilerini girerek yapay zeka destekli, profesyonel CV'ler oluştururlar. Oluşturduktan sonra:
1. PDF olarak indirebilirler (ücretsiz, 7 gün geçerli)
2. Kalıcı, paylaşılabilir bir bağlantı alabilirler (Pro plan gerektirir)

**En Büyük Özellik — LinkedIn Paylaşım Linki:**
Kullanıcı CV'sini oluşturduktan sonra şu formatta bir link alır:
`https://cvio.app/cv/kullanici-adi-google`

Bu linki LinkedIn profiline, e-postasına, her yere ekleyebilir. **Ama dikkat:** Link 7 gün sonra Pro plan yoksa başka bir sayfaya yönlendirir (ödeme/upgrade sayfası). Bu sayede kullanıcı linki paylaştıktan sonra geri döndüğünde Pro almak zorunda hisseder — çünkü artık linki değiştiremez, zaten göndermiş.

---

## 💡 İş Modeli & Monetizasyon Mantığı

```
FREE PLAN
├── CV oluştur (sınırsız taslak)
├── PDF indir (7 gün boyunca, sonra silinir)
├── 1 adet CV şablonu
└── LinkedIn'den import (Apify ile, sınırlı)

PRO PLAN — Aylık $9.99 / Yıllık $79
├── Kalıcı paylaşım linki (asla sona ermez)
├── Şirkete özel CV linki (örn: /cv/ali-google, /cv/ali-amazon)
├── Tüm şablonlar
├── Sınırsız PDF indirme
├── AI kariyer koçu sohbeti
└── LinkedIn import sınırsız

GROWTH HOOK (Büyüme Kancası):
Kullanıcı "google.com/jobs için başvur" butonuna tıklayınca
şirkete özel link oluşturulur → linki CV'ne yapıştır → linki gönder →
7 gün sonra link ölür → kullanıcı Pro almak zorunda çünkü
linki zaten gönderdi ve geri alamaz.
```

---

## 🛠️ Teknoloji Stack (Kesinlikle Bunları Kullan)

### Frontend
- **Next.js 14** (App Router) — React tabanlı, modern web framework
- **Tailwind CSS** — Hızlı ve güzel UI için
- **shadcn/ui** — Hazır, profesyonel UI bileşenleri
- **Framer Motion** — Animasyonlar için

### Backend & Veritabanı
- **Supabase** — Veritabanı + Auth + Dosya depolama (ücretsiz tier yeterli başlangıç için)
  - PostgreSQL veritabanı (500MB ücretsiz)
  - Auth (50.000 kullanıcıya kadar ücretsiz)
  - Storage (1GB ücretsiz — PDF'ler için)
  - Edge Functions (500K/ay ücretsiz)

### Ödeme
- **Stripe** — Abonelik ödemeleri için (Pro plan)

### AI
- **Anthropic Claude API** (claude-sonnet-4-20250514) — CV yazma, iyileştirme, kariyer koçu

### LinkedIn Import
- **Apify** — LinkedIn profil verisi çekme
  - Actor: `automation-lab/linkedin-profile-scraper`
  - Fiyat: ~$0.003/profil (kullanıcı başına tek seferlik)
  - Free plan: $5 kredi = ~1.600 profil ücretsiz başlangıç
  - API ile entegrasyon: Apify REST API token ile çağrılır

### PDF Oluşturma
- **Puppeteer** veya **react-pdf** — CV'yi PDF'e çevirme

### Deploy
- **Vercel** — Ücretsiz tier başlangıç için yeterli

---

## 📁 Proje Klasör Yapısı

```
cvio/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── cv/
│   │   │   ├── new/page.tsx          ← CV oluşturma sayfası
│   │   │   ├── [id]/edit/page.tsx    ← CV düzenleme
│   │   │   └── [id]/preview/page.tsx ← CV önizleme
│   │   └── settings/page.tsx
│   ├── cv/
│   │   └── [slug]/page.tsx           ← Paylaşılabilir CV linki (PUBLIC)
│   ├── upgrade/page.tsx              ← Ödeme/Pro sayfası
│   ├── api/
│   │   ├── cv/
│   │   │   ├── create/route.ts
│   │   │   ├── generate-pdf/route.ts
│   │   │   └── generate-link/route.ts
│   │   ├── ai/
│   │   │   ├── improve-cv/route.ts
│   │   │   └── career-coach/route.ts
│   │   ├── linkedin/
│   │   │   └── import/route.ts       ← Apify entegrasyonu
│   │   └── stripe/
│   │       └── webhook/route.ts
│   └── page.tsx                      ← Landing page
├── components/
│   ├── cv-builder/
│   │   ├── CVForm.tsx
│   │   ├── CVPreview.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── LinkedInImport.tsx
│   ├── shared/
│   └── ui/
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── apify.ts                      ← Apify client
│   ├── claude.ts                     ← Anthropic client
│   └── pdf.ts
└── supabase/
    └── migrations/
        └── 001_init.sql
```

---

## 🗄️ Veritabanı Şeması (Supabase PostgreSQL)

```sql
-- Kullanıcılar (Supabase Auth otomatik oluşturur, biz sadece profil ekleriz)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  plan TEXT DEFAULT 'free',          -- 'free' | 'pro' | 'annual'
  plan_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CV'ler
CREATE TABLE cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,               -- "Ali'nin Google CV'si"
  slug TEXT UNIQUE,                  -- "ali-google" → /cv/ali-google
  target_company TEXT,               -- "Google" (şirkete özel link için)
  data JSONB NOT NULL,               -- Tüm CV verisi (deneyim, eğitim, vb.)
  template TEXT DEFAULT 'modern',    -- CV şablon adı
  is_public BOOLEAN DEFAULT FALSE,   -- Link aktif mi?
  link_expires_at TIMESTAMPTZ,       -- 7 gün sonra → upgrade sayfasına yönlendir
  pdf_url TEXT,                      -- Supabase Storage'daki PDF linki
  pdf_expires_at TIMESTAMPTZ,        -- PDF 7 günde silinir (free plan)
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link görüntüleme logları
CREATE TABLE cv_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewer_country TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe abonelikler
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT,
  status TEXT,                       -- 'active' | 'canceled' | 'past_due'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) — Kullanıcılar sadece kendi verilerine erişebilsin
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their CVs" ON cvs
  FOR ALL USING (auth.uid() = user_id);

-- Public CV'ler herkese açık
CREATE POLICY "Public CVs are viewable" ON cvs
  FOR SELECT USING (is_public = true);
```

---

## 🔗 LinkedIn Import — Apify Entegrasyonu

**Kullanılacak Actor:** `automation-lab/linkedin-profile-scraper`
**Alternatif (daha ucuz):** `supreme_coder/linkedin-profile-scraper` ($3/1K profil)

```typescript
// lib/apify.ts
const APIFY_TOKEN = process.env.APIFY_TOKEN;

export async function importLinkedInProfile(linkedinUrl: string) {
  // 1. Apify'a iş gönder
  const runResponse = await fetch(
    `https://api.apify.com/v2/acts/automation-lab~linkedin-profile-scraper/runs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIFY_TOKEN}`
      },
      body: JSON.stringify({
        startUrls: [{ url: linkedinUrl }]
      })
    }
  );
  
  const run = await runResponse.json();
  const runId = run.data.id;
  
  // 2. Sonucu bekle (polling)
  let result = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const statusRes = await fetch(
      `https://api.apify.com/v2/acts/automation-lab~linkedin-profile-scraper/runs/${runId}`,
      { headers: { 'Authorization': `Bearer ${APIFY_TOKEN}` } }
    );
    const status = await statusRes.json();
    if (status.data.status === 'SUCCEEDED') {
      // 3. Veriyi çek
      const dataRes = await fetch(
        `https://api.apify.com/v2/datasets/${status.data.defaultDatasetId}/items`,
        { headers: { 'Authorization': `Bearer ${APIFY_TOKEN}` } }
      );
      const data = await dataRes.json();
      result = data[0];
      break;
    }
  }
  
  // 4. LinkedIn verisini CV formatına dönüştür
  return mapLinkedInToCV(result);
}

function mapLinkedInToCV(profile: any) {
  return {
    personal: {
      fullName: profile.fullName,
      headline: profile.headline,
      location: profile.location,
      email: profile.email,
      linkedin: profile.linkedinUrl,
      summary: profile.about,
      photo: profile.profilePicture
    },
    experience: profile.positions?.map((pos: any) => ({
      title: pos.title,
      company: pos.companyName,
      startDate: pos.startDate,
      endDate: pos.endDate,
      current: pos.isCurrent,
      description: pos.description,
      location: pos.location
    })),
    education: profile.educations?.map((edu: any) => ({
      school: edu.schoolName,
      degree: edu.degreeName,
      field: edu.fieldOfStudy,
      startYear: edu.startDate?.year,
      endYear: edu.endDate?.year
    })),
    skills: profile.skills?.map((s: any) => s.name),
    certifications: profile.certifications?.map((c: any) => ({
      name: c.name,
      issuer: c.authority,
      date: c.date
    }))
  };
}
```

---

## 🤖 AI Entegrasyonu — Claude API

```typescript
// lib/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// CV'yi AI ile iyileştir
export async function improveCV(cvData: any, targetCompany?: string) {
  const prompt = targetCompany
    ? `Bu CV'yi ${targetCompany} şirketine başvuru için optimize et. ATS sistemlerini geç, şirketin değerleriyle uyumlu hale getir.`
    : `Bu CV'yi genel iş başvuruları için optimize et. Güçlü fiiller kullan, başarıları ölçülebilir hale getir.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `${prompt}\n\nCV Verisi:\n${JSON.stringify(cvData, null, 2)}\n\nSadece JSON formatında iyileştirilmiş CV'yi döndür.`
    }]
  });

  return JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}');
}

// Kariyer koçu sohbeti
export async function careerCoach(message: string, cvData: any) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: `Sen deneyimli bir kariyer koçusun. Kullanıcının CV'si şu: ${JSON.stringify(cvData)}. Onlara iş arama, müzakere ve kariyerleri hakkında kişiselleştirilmiş tavsiyeler ver.`,
    messages: [{ role: 'user', content: message }]
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}
```

---

## 🔗 Paylaşılabilir Link Sistemi (En Kritik Özellik)

```typescript
// app/api/cv/generate-link/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { cvId, targetCompany } = await req.json();
  
  // Kullanıcıyı doğrula
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  
  // Plan kontrol
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, plan_expires_at')
    .eq('id', user.id)
    .single();
  
  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';
  
  // Slug oluştur: ali-google, ali-amazon, vb.
  const userName = user.email?.split('@')[0] || 'user';
  const companySlug = targetCompany
    ? `-${targetCompany.toLowerCase().replace(/\s/g, '-')}`
    : '';
  const slug = `${userName}${companySlug}-${Date.now().toString(36)}`;
  
  // Link süresi: Free = 7 gün, Pro = Sonsuz
  const linkExpiresAt = isPro
    ? null
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  await supabase
    .from('cvs')
    .update({
      slug,
      is_public: true,
      link_expires_at: linkExpiresAt,
      target_company: targetCompany
    })
    .eq('id', cvId)
    .eq('user_id', user.id);
  
  return Response.json({
    link: `${process.env.NEXT_PUBLIC_URL}/cv/${slug}`,
    expiresAt: linkExpiresAt,
    isPermanent: isPro
  });
}
```

```typescript
// app/cv/[slug]/page.tsx — Paylaşılabilir CV sayfası
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PublicCVPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: cv } = await supabase
    .from('cvs')
    .select('*, profiles(full_name, plan)')
    .eq('slug', params.slug)
    .eq('is_public', true)
    .single();
  
  if (!cv) {
    redirect('/404');
  }
  
  // Link süresi dolmuş mu? → Upgrade sayfasına yönlendir
  if (cv.link_expires_at && new Date(cv.link_expires_at) < new Date()) {
    redirect(`/upgrade?expired=true&slug=${params.slug}`);
  }
  
  // Görüntüleme sayısını artır
  await supabase.from('cv_views').insert({
    cv_id: cv.id,
    viewed_at: new Date().toISOString()
  });
  
  // CV'yi render et
  return <CVPublicView cv={cv} />;
}
```

---

## ⏰ PDF Temizleme (Otomatik)

```typescript
// app/api/cron/cleanup-pdfs/route.ts
// Vercel Cron Job — Her gün çalışır

export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  
  // 7 günü geçmiş PDF'leri bul
  const { data: expiredCVs } = await supabase
    .from('cvs')
    .select('id, pdf_url, user_id')
    .lt('pdf_expires_at', new Date().toISOString())
    .not('pdf_url', 'is', null);
  
  for (const cv of expiredCVs || []) {
    // Supabase Storage'dan sil
    const fileName = cv.pdf_url.split('/').pop();
    await supabase.storage.from('pdfs').remove([`${cv.user_id}/${fileName}`]);
    
    // Veritabanından temizle
    await supabase
      .from('cvs')
      .update({ pdf_url: null })
      .eq('id', cv.id);
  }
  
  return Response.json({ cleaned: expiredCVs?.length });
}
```

```json
// vercel.json — Cron job tanımı
{
  "crons": [
    {
      "path": "/api/cron/cleanup-pdfs",
      "schedule": "0 2 * * *"
    }
  ]
}
```

---

## 💳 Stripe Entegrasyonu

**Planlar:**
- `price_pro_monthly` → $9.99/ay
- `price_pro_annual` → $79/yıl ($6.58/ay)

```typescript
// app/api/stripe/create-checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { priceId, userId, returnUrl } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId },
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: returnUrl || `${process.env.NEXT_PUBLIC_URL}/upgrade`
  });
  
  return Response.json({ url: session.url });
}
```

```typescript
// app/api/stripe/webhook/route.ts
// Stripe olaylarını dinle → Supabase'i güncelle

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();
  
  const event = stripe.webhooks.constructEvent(
    body, sig, process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  if (event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata.userId;
    
    await supabase.from('profiles').update({
      plan: 'pro',
      plan_expires_at: new Date(sub.current_period_end * 1000).toISOString()
    }).eq('id', userId);
    
    // Pro olduktan sonra: mevcut linklerin süresi uzatılır
    await supabase.from('cvs').update({ link_expires_at: null })
      .eq('user_id', userId)
      .eq('is_public', true);
  }
  
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata.userId;
    
    await supabase.from('profiles').update({
      plan: 'free',
      plan_expires_at: null
    }).eq('id', userId);
    
    // Linkler 7 günlük süreye döner
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    await supabase.from('cvs').update({ link_expires_at: expiresAt })
      .eq('user_id', userId)
      .eq('is_public', true);
  }
  
  return Response.json({ received: true });
}
```

---

## 🖥️ Arayüz (UI/UX) Tasarım Rehberi

### Landing Page Yapısı
```
1. HERO
   - Başlık: "LinkedIn Profilinizi 60 Saniyede Profesyonel CV'ye Dönüştürün"
   - Alt başlık: "AI destekli, ATS uyumlu, paylaşılabilir link"
   - CTA: "Ücretsiz Başla" | "LinkedIn'den İmport Et"
   - Animasyonlu CV önizlemesi

2. HOW IT WORKS (3 adım)
   - LinkedIn linkini yapıştır → AI CV oluşturur → Linki paylaş

3. ÖRNEK CV'LER
   - Farklı sektörlerden örnekler (tıklanabilir)

4. FİYATLANDIRMA
   - Free vs Pro karşılaştırması
   - Büyük "Pro" butonu

5. FOOTER
```

### Dashboard
```
┌─────────────────────────────────────────────┐
│ CVio    [Dashboard] [CV'lerim] [Ayarlar]   [Pro Al] │
├──────────────────────────────────────────────┤
│                                              │
│  Hoş geldin, Ali 👋                         │
│                                              │
│  [+ Yeni CV Oluştur]  [LinkedIn'den Import] │
│                                              │
│  CV'lerim                                   │
│  ┌──────────────────┐  ┌──────────────────┐ │
│  │ Google Başvurusu │  │ Genel CV         │ │
│  │ 📎 Link: aktif  │  │ 📎 Link: 3 gün  │ │
│  │ 👁 142 görüntül │  │ 👁 28 görüntül  │ │
│  │ [Düzenle][İndir] │  │ [Düzenle][İndir] │ │
│  └──────────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────┘
```

### CV Oluşturucu (Wizard — Adım Adım)
```
Adım 1: Başlangıç Seç
  → LinkedIn URL'si yapıştır (Apify ile import)
  → Manuel doldur
  → Mevcut CV yükle (PDF parse)

Adım 2: Bilgileri Gözden Geçir / Düzenle
  → Sol: Form
  → Sağ: Canlı önizleme

Adım 3: Şablon Seç
  → Modern, Klasik, Minimal, Renkli (Free'de sadece 1)

Adım 4: AI İyileştirme
  → "Bu CV'yi Google için optimize et" butonu
  → AI önerileri göster

Adım 5: Tamamla
  → İndir (PDF)
  → Link Oluştur
  → Şirkete Özel Link (Pro)
```

### Renk Paleti
```
Primary: #6366F1 (Indigo)
Secondary: #8B5CF6 (Purple)
Accent: #EC4899 (Pink)
Background: #0F172A (Dark) veya #F8FAFC (Light)
Text: #1E293B
Success: #10B981
Warning: #F59E0B
```

---

## 🔑 Environment Variables (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...

# Anthropic (Claude AI)
ANTHROPIC_API_KEY=sk-ant-...

# Apify (LinkedIn import)
APIFY_TOKEN=apify_api_...

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

---

## 📋 Kurulum Adımları (Claude Code İçin)

```bash
# 1. Proje oluştur
npx create-next-app@latest cvio --typescript --tailwind --eslint --app

# 2. Klasöre gir
cd cvio

# 3. Bağımlılıkları kur
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install stripe @stripe/stripe-js
npm install @anthropic-ai/sdk
npm install @radix-ui/react-dialog @radix-ui/react-tabs
npm install shadcn-ui
npm install framer-motion
npm install react-pdf @react-pdf/renderer
npm install uuid slugify

# 4. shadcn/ui başlat
npx shadcn-ui@latest init

# 5. Supabase CLI kur
npm install -g supabase
supabase login
supabase init

# 6. .env.local dosyasını oluştur (yukarıdaki değerler)
```

---

## 🚀 Apify Actor Listesi (Kullanılabilecekler)

Aşağıdaki Actor'lar Apify Store'da mevcut ve LinkedIn için kullanılabilir:

| Actor | Fiyat | Açıklama |
|-------|-------|----------|
| `automation-lab/linkedin-profile-scraper` | $0.003/profil | Cookie gerektirmez, iş+eğitim+beceri |
| `supreme_coder/linkedin-profile-scraper` | $3/1K profil | No-cookie, hızlı |
| `get-leads/linkedin-scraper` | $1/1K profil | 8 mod, MCP uyumlu |
| `dataweave/linkedin-profile-scraper` | $2/1K profil | En ucuz, %99 başarı oranı |
| `curious_coder/linkedin-profile-scraper` | $3/1K profil | Detaylı çıktı |

**Öneri:** `get-leads/linkedin-scraper` kullan → En ucuz ($1/1K), en fazla mod, MCP uyumlu.

**Apify Free Plan:** $5 kredi → ~5.000 profil import ücretsiz başlangıç için.

---

## 🎯 MVP'de Olması Gereken Özellikler (Öncelik Sırası)

### Faz 1 — Core (İlk Çalışan Uygulama)
- [ ] Auth (kayıt/giriş — Supabase)
- [ ] Manuel CV oluşturma formu
- [ ] Canlı CV önizlemesi
- [ ] PDF indirme (7 günlük)
- [ ] Paylaşılabilir link oluşturma
- [ ] Link süresi dolunca upgrade sayfasına yönlendirme
- [ ] Stripe Pro abonelik

### Faz 2 — Growth Features
- [ ] LinkedIn import (Apify)
- [ ] AI CV iyileştirme (Claude)
- [ ] Şirkete özel link (/cv/ali-google)
- [ ] Birden fazla CV şablonu
- [ ] CV analitikleri (kaç kişi baktı)

### Faz 3 — Pro Features
- [ ] AI kariyer koçu sohbeti
- [ ] Cover letter (ön yazı) oluşturucu
- [ ] İş ilanı eşleştirme
- [ ] LinkedIn profiline doğrudan bağlantı butonu

---

## ⚠️ Önemli Notlar

1. **Apify Rate Limit:** Ücretsiz plan ayda 10 run. Pro ile sınırsız. Kullanıcı başına 1 import hakkı ver, sonrası Pro.

2. **Supabase Pausing:** Ücretsiz Supabase projeleri 7 gün aktivite olmayınca duraklar. Geliştirme sürecinde sorun olmaz, canlıda Pro ($25/ay) al.

3. **Stripe Test Mode:** Geliştirme sırasında test modunda çalış. Kart: `4242 4242 4242 4242`, son kullanma: gelecekte herhangi bir tarih.

4. **LinkedIn ToS:** Apify'ın LinkedIn scraper'ları teknik olarak LinkedIn ToS'u ihlal edebilir. Bunu kullanıcıya "LinkedIn'den hızlı import" olarak sun ve kullanıcının kendi profilini import ettiğini varsay.

5. **Slug Benzersizliği:** `ali-google` slug'ı zaten alınmışsa `ali-google-2` şeklinde devam et.

6. **SEO:** `/cv/[slug]` sayfaları için `generateMetadata` ile dinamik meta tag'ler ekle — "Ali Yılmaz'ın CV'si | CVio" gibi.

---

## 📊 Başarı Metrikleri

- CV oluşturuldu → link oluşturuldu oranı > %60
- Link oluşturuldu → 7 gün sonra upgrade sayfasına gelen oran
- Upgrade sayfasından Pro'ya geçiş oranı > %15
- Kullanıcı başına CV görüntülenme sayısı

---

## 🧠 Claude Code'a Son Not

Bu dökümanı uygulamaya koyarken şu sırayı izle:

1. `npx create-next-app` ile projeyi oluştur
2. Supabase projesini kur ve SQL şemasını çalıştır
3. Auth sayfalarını yap (login/register)
4. CV form ve önizleme bileşenlerini yaz
5. PDF indirme özelliğini ekle
6. Paylaşılabilir link sistemini kur (en kritik)
7. Stripe entegrasyonunu ekle
8. Apify LinkedIn import'u ekle
9. Claude AI iyileştirmeyi ekle
10. Landing page'i tasarla
11. Deploy (Vercel)

**Kullanıcı teknik bilgiye sahip değil.** Her `.env` değişkeni için nereden alınacağını açıklayan yorumlar ekle. Kurulum komutlarını `README.md`'ye yaz.
