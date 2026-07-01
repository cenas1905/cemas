/**
 * seed_demo_cv.js
 * 
 * Demo CV'yi veritabanına ekler. 2026 iş trendlerine uygun,
 * ATS uyumlu, ölçülebilir başarılar içeren profesyonel bir CV.
 * 
 * Kullanım: node scripts/seed_demo_cv.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ─── .env.local Oku ───
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local dosyası bulunamadı:', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// ─── Demo CV Verisi (2026 Trendlerine Uygun) ───
const demoCVData = {
  personal: {
    fullName: 'Cem Yıldırım',
    headline: 'Senior Full-Stack Engineer | AI & Cloud Solutions Architect',
    location: 'İstanbul, Türkiye',
    email: 'cem.yildirim@outlook.com',
    linkedin: 'github.com/cemyildirim',
    summary: `7+ yıl deneyimli Full-Stack Mühendisi; React/Next.js ve Node.js ile ölçeklenebilir bulut çözümleri geliştirme, LLM/RAG tabanlı AI modellerini production API'lere entegre etme ve mikro servis mimarilerini tasarlama konusunda kanıtlanmış uzmanlık.

Trendyol'da günlük 5M+ aktif kullanıcıya hizmet veren e-ticaret platformunun frontend mimarisini yeniden tasarlayarak sayfa yükleme süresini %45 iyileştirdim. AWS ve Docker/Kubernetes altyapılarında CI/CD pipeline'ları kurarak deployment süresini 4 saatten 12 dakikaya indirdim.

Problem çözme odaklı mühendislik disiplini, cross-functional ekip liderliği ve sürekli öğrenme tutkusu ile karmaşık iş problemlerini teknik çözümlere dönüştürüyorum.`,
    photo: ''
  },
  experience: [
    {
      title: 'Senior Full-Stack Engineer',
      company: 'Trendyol',
      startDate: 'Ocak 2023',
      endDate: '',
      current: true,
      description: `• Next.js 14 App Router ve React Server Components kullanarak e-ticaret platformunun ana sayfasını yeniden mimarize ettim; LCP süresini 3.2s → 1.4s'e düşürerek Core Web Vitals skorunu %45 artırdım.

• Claude AI ve RAG pipeline entegrasyonu ile akıllı ürün arama ve öneri sistemi geliştirdim; kullanıcı sepet dönüşüm oranını %28 iyileştirdim.

• 12 kişilik cross-functional ekibe teknik liderlik yaparak, mikroservis mimarisine geçiş projesini 6 ayda tamamladım; sistem downtime'ını %99.97 uptime'a yükselttim.

• Docker, Kubernetes (EKS) ve Terraform ile IaC tabanlı deployment altyapısı kurarak release süresini 4 saatten 12 dakikaya indirdim.`,
      location: 'İstanbul'
    },
    {
      title: 'Full-Stack Developer',
      company: 'Getir',
      startDate: 'Haziran 2020',
      endDate: 'Aralık 2022',
      current: false,
      description: `• React Native ile teslimat takip uygulamasını sıfırdan geliştirdim; 2M+ indirme ve 4.7★ App Store puanı elde ettim.

• Node.js/Express ile real-time sipariş takip API'si geliştirdim; WebSocket altyapısıyla 50K+ eşzamanlı bağlantıyı sorunsuz yönettim.

• PostgreSQL sorgu optimizasyonu ve Redis cache katmanı ekleyerek API yanıt süresini ortalama 800ms → 120ms'e düşürdüm.

• Agile/Scrum metodolojisi ile sprint planlama ve retrospektif süreçlerini yönettim; takım velocity'sini %35 artırdım.`,
      location: 'İstanbul'
    },
    {
      title: 'Junior Frontend Developer',
      company: 'Insider (useinsider.com)',
      startDate: 'Eylül 2018',
      endDate: 'Mayıs 2020',
      current: false,
      description: `• Vue.js ve TypeScript ile pazarlama otomasyon dashboard'unu geliştirdim; 500+ enterprise müşterinin kullandığı analitik panelini tasarladım.

• Webpack yapılandırmasını optimize ederek build süresini %60 kısalttım ve bundle boyutunu 2.1MB → 780KB'ye düşürdüm.

• Jest ve Cypress ile %85 test coverage sağlayan kapsamlı test altyapısı kurdum.`,
      location: 'İstanbul'
    }
  ],
  education: [
    {
      school: 'İstanbul Teknik Üniversitesi',
      degree: 'Lisans',
      field: 'Bilgisayar Mühendisliği',
      startYear: '2014',
      endYear: '2018'
    },
    {
      school: 'Kadıköy Anadolu Lisesi',
      degree: 'Lise',
      field: 'Sayısal Bölüm',
      startYear: '2010',
      endYear: '2014'
    }
  ],
  skills: [
    'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Python',
    'Vue.js', 'React Native', 'GraphQL', 'REST API',
    'PostgreSQL', 'Redis', 'MongoDB',
    'AWS (EC2, S3, Lambda, EKS)', 'Docker', 'Kubernetes', 'Terraform',
    'CI/CD (GitHub Actions)', 'Git', 'Agile/Scrum',
    'LLM/RAG Integration', 'Claude AI', 'OpenAI API',
    'Microservices Architecture', 'System Design',
    'TailwindCSS', 'Framer Motion', 'Figma'
  ],
  certifications: [
    {
      name: 'AWS Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: 'Mart 2024'
    },
    {
      name: 'Google Cloud Professional Cloud Developer',
      issuer: 'Google Cloud',
      date: 'Kasım 2023'
    },
    {
      name: 'Meta Frontend Developer Professional Certificate',
      issuer: 'Meta (Coursera)',
      date: 'Haziran 2022'
    },
    {
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'The Linux Foundation',
      date: 'Ağustos 2024'
    }
  ]
};

// ─── İkinci Demo CV (Şirkete Özel — Google Başvurusu) ───
const googleCVData = {
  personal: {
    ...demoCVData.personal,
    summary: `7+ yıl deneyimli Full-Stack Mühendisi; Google'ın "Build for Everyone" değerine uygun olarak geniş ölçekli, erişilebilir ve performanslı web uygulamaları geliştirme konusunda kanıtlanmış uzmanlık.

Distributed systems, cloud-native architecture ve AI/ML model entegrasyonu alanlarında derin bilgi birikimine sahip, günlük milyonlarca kullanıcıya hizmet veren production sistemlerini tasarlama ve yönetme deneyimim bulunmaktadır.

Open source topluluğuna aktif katkı sağlayan, Web Vitals ve erişilebilirlik (WCAG 2.1) standartlarına hakim, cross-functional ekip liderliği yapabilen bir mühendisim.`
  },
  experience: demoCVData.experience,
  education: demoCVData.education,
  skills: [
    'Go', 'Python', 'Java', 'TypeScript', 'C++',
    'React.js', 'Next.js', 'Angular',
    'gRPC', 'Protocol Buffers', 'REST API', 'GraphQL',
    'Google Cloud Platform (GCP)', 'BigQuery', 'Cloud Spanner', 'Pub/Sub',
    'Docker', 'Kubernetes (GKE)', 'Terraform',
    'Distributed Systems', 'System Design', 'Microservices',
    'TensorFlow', 'LLM Integration', 'RAG Architecture',
    'CI/CD', 'Git', 'Agile/Scrum',
    'Web Accessibility (WCAG 2.1)', 'Performance Optimization'
  ],
  certifications: demoCVData.certifications
};

async function run() {
  console.log('🚀 Demo CV Seed Başlıyor...\n');

  // 1. Test kullanıcısını bul
  const testEmail = 'test_dev_user@example.com';
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();

  if (listError) {
    console.error('Kullanıcılar listelenemedi:', listError);
    process.exit(1);
  }

  const user = users.find(u => u.email === testEmail);
  if (!user) {
    console.error(`Kullanıcı bulunamadı: ${testEmail}`);
    console.error('Önce "node scripts/create_test_user.js" çalıştırın.');
    process.exit(1);
  }

  console.log(`✅ Kullanıcı bulundu: ${user.id} (${testEmail})\n`);

  // 2. Mevcut demo CV'leri temizle (opsiyonel — aynı isimde olanları sil)
  const { data: existingCVs } = await supabaseAdmin
    .from('cvs')
    .select('id, title')
    .eq('user_id', user.id);

  const titlesToSeed = ['Cem Yıldırım — Genel Başvuru CV', 'Cem Yıldırım — Google Başvurusu'];
  const existingDemoCVs = (existingCVs || []).filter(cv => titlesToSeed.includes(cv.title));

  if (existingDemoCVs.length > 0) {
    console.log(`🗑️  ${existingDemoCVs.length} mevcut demo CV siliniyor...`);
    const ids = existingDemoCVs.map(cv => cv.id);
    await supabaseAdmin.from('cv_views').delete().in('cv_id', ids);
    await supabaseAdmin.from('cvs').delete().in('id', ids);
    console.log('   Mevcut demo CV\'ler silindi.\n');
  }

  // 3. Genel CV Ekle
  const generalSlug = `cem-yildirim-${Date.now().toString(36)}`;
  const { data: generalCV, error: generalErr } = await supabaseAdmin
    .from('cvs')
    .insert({
      user_id: user.id,
      title: 'Cem Yıldırım — Genel Başvuru CV',
      slug: generalSlug,
      data: demoCVData,
      template: 'modern',
      is_public: true,
      link_expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      view_count: 87
    })
    .select()
    .single();

  if (generalErr) {
    console.error('Genel CV oluşturulamadı:', generalErr);
  } else {
    console.log(`📄 Genel CV oluşturuldu: ${generalCV.id}`);
    console.log(`   🔗 Link: /cv/${generalSlug}`);
    console.log(`   📊 Şablon: modern\n`);
  }

  // 4. Google Başvuru CV'si Ekle
  const googleSlug = `cem-yildirim-google-${Date.now().toString(36)}`;
  const { data: googleCV, error: googleErr } = await supabaseAdmin
    .from('cvs')
    .insert({
      user_id: user.id,
      title: 'Cem Yıldırım — Google Başvurusu',
      slug: googleSlug,
      target_company: 'Google',
      data: googleCVData,
      template: 'minimal',
      is_public: true,
      link_expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      view_count: 142
    })
    .select()
    .single();

  if (googleErr) {
    console.error('Google CV oluşturulamadı:', googleErr);
  } else {
    console.log(`📄 Google CV oluşturuldu: ${googleCV.id}`);
    console.log(`   🔗 Link: /cv/${googleSlug}`);
    console.log(`   🏢 Hedef Şirket: Google`);
    console.log(`   📊 Şablon: minimal\n`);
  }

  // 5. Fake görüntüleme verileri ekle (son 7 gün)
  if (generalCV && googleCV) {
    console.log('📈 Demo görüntüleme verileri ekleniyor...');
    const viewsToInsert = [];

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date();
      date.setDate(date.getDate() - dayOffset);

      // Her CV için rastgele görüntülenme
      const generalViews = Math.floor(Math.random() * 15) + 3;
      const googleViews = Math.floor(Math.random() * 25) + 5;

      for (let v = 0; v < generalViews; v++) {
        const viewDate = new Date(date);
        viewDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
        viewsToInsert.push({
          cv_id: generalCV.id,
          created_at: viewDate.toISOString()
        });
      }

      for (let v = 0; v < googleViews; v++) {
        const viewDate = new Date(date);
        viewDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
        viewsToInsert.push({
          cv_id: googleCV.id,
          created_at: viewDate.toISOString()
        });
      }
    }

    const { error: viewsErr } = await supabaseAdmin
      .from('cv_views')
      .insert(viewsToInsert);

    if (viewsErr) {
      console.error('Görüntüleme verileri eklenemedi:', viewsErr);
    } else {
      console.log(`   ✅ ${viewsToInsert.length} görüntüleme kaydı eklendi.\n`);
    }
  }

  console.log('─────────────────────────────────────────');
  console.log('✅ Demo CV Seed Tamamlandı!');
  console.log('');
  console.log('📌 Giriş bilgileri:');
  console.log(`   E-posta : ${testEmail}`);
  console.log('   Şifre   : Password123!');
  console.log('');
  console.log('🌐 CV Linkleri:');
  if (generalCV) console.log(`   Genel   : http://localhost:3000/cv/${generalSlug}`);
  if (googleCV) console.log(`   Google  : http://localhost:3000/cv/${googleSlug}`);
  console.log('');
  console.log('🎨 Dashboard\'da 2 CV kartı görünecek.');
  console.log('   Analitik grafiği son 7 günlük verilerle dolu.');
  console.log('─────────────────────────────────────────');
}

run().catch(err => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
