# CVio — AI Özgeçmiş & Kariyer Koçu

Bu proje, Next.js 16 (App Router), Tailwind CSS, shadcn/ui, Supabase, Stripe, Claude AI ve Apify entegrasyonu ile geliştirilmiş yapay zeka destekli bir CV oluşturucu ve kariyer koçu uygulamasıdır.

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin:

1. **Bağımlılıkları Kurun:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Çevre Değişkenlerini Tanımlayın:**
   Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri kendi anahtarlarınızla doldurun.

3. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 🔑 Çevre Değişkenleri Rehberi

Uygulamanın çalışması için gerekli servislerin anahtarlarını alabileceğiniz yerler:

### 1. Supabase (Veritabanı ve Oturum Yönetimi)
* [Supabase](https://supabase.com) üzerinde ücretsiz bir hesap oluşturun.
* Yeni bir proje başlatın.
* **Project Settings > API** sekmesinden şu değerleri kopyalayın:
  * `NEXT_PUBLIC_SUPABASE_URL`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  * `SUPABASE_SERVICE_ROLE_KEY`

### 2. Stripe (Ödeme ve Abonelik)
* [Stripe](https://stripe.com) hesabı açın ve geliştirici moduna (Test Mode) geçin.
* **Developers > API Keys** sekmesinden:
  * `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (Publishable key)
  * `STRIPE_SECRET_KEY` (Secret key)
* **Product Catalog** kısmında aylık $9.99 ve yıllık $79 fiyatlandırması olan iki abonelik ürünü oluşturup ID'lerini ekleyin:
  * `STRIPE_PRO_MONTHLY_PRICE_ID`
  * `STRIPE_PRO_ANNUAL_PRICE_ID`
* **Developers > Webhooks** sekmesinde bir webhook oluşturarak `/api/stripe/webhook` adresini dinleyin ve webhook sırrını ekleyin:
  * `STRIPE_WEBHOOK_SECRET`

### 3. Anthropic (Claude AI - Kariyer Koçu & CV Optimizasyonu)
* [Anthropic Console](https://console.anthropic.com) üzerinden API anahtarı üretin:
  * `ANTHROPIC_API_KEY`

### 4. Apify (LinkedIn Profil Verisi Çekme)
* [Apify Console](https://console.apify.com) üzerinden hesap açın.
* **Settings > Integrations > API Token** alanından token değerini alın:
  * `APIFY_TOKEN`
