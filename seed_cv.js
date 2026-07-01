const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('Seeding CV data...');

  // Get first profile or create a user
  let { data: profiles, error: profileError } = await supabaseAdmin.from('profiles').select('*').limit(1);
  
  if (profileError) {
    console.error('Error fetching profiles:', profileError);
    process.exit(1);
  }

  let userId;
  if (!profiles || profiles.length === 0) {
    console.log('No profiles found, creating dummy user...');
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'test' + Date.now() + '@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: { full_name: 'Test Kullanıcı' }
    });

    if (authError) {
      console.error('Error creating user:', authError);
      process.exit(1);
    }
    userId = userData.user.id;
    // Wait a second for trigger to create profile
    await new Promise(r => setTimeout(r, 1000));
  } else {
    userId = profiles[0].id;
    console.log('Using profile:', profiles[0].full_name, 'ID:', userId);
  }

  const dummyData = {
    personal: {
      fullName: "Ali Yılmaz",
      headline: "Senior Frontend Developer",
      email: "ali.yilmaz@example.com",
      location: "İstanbul, Türkiye",
      linkedin: "linkedin.com/in/aliyilmaz",
      summary: "5+ yıllık deneyime sahip, modern web teknolojileri (React, Next.js, TypeScript) konusunda uzmanlaşmış Frontend Geliştirici. Kullanıcı deneyimini ön planda tutan, performanslı ve ölçeklenebilir uygulamalar geliştirme konusunda tutkulu."
    },
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Corp",
        startDate: "Ocak 2021",
        endDate: "Günümüz",
        current: true,
        location: "İstanbul (Remote)",
        description: "Büyük ölçekli e-ticaret platformunun frontend mimarisini Next.js ve TypeScript kullanarak yeniden yapılandırdım. Performans optimizasyonları ile sayfa yüklenme hızını %40 artırdım."
      },
      {
        title: "Frontend Developer",
        company: "Startup A.Ş.",
        startDate: "Haziran 2018",
        endDate: "Aralık 2020",
        current: false,
        location: "İstanbul",
        description: "React ve Redux kullanarak çeşitli müşteri projeleri geliştirdim. Ekip içi kod inceleme süreçlerini iyileştirdim."
      }
    ],
    education: [
      {
        school: "Boğaziçi Üniversitesi",
        degree: "Lisans",
        field: "Bilgisayar Mühendisliği",
        startYear: "2014",
        endYear: "2018"
      }
    ],
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "Eylül 2022"
      }
    ]
  };

  const { data: cvData, error: insertError } = await supabaseAdmin.from('cvs').insert({
    user_id: userId,
    title: 'Senior Frontend Developer CV',
    slug: 'ali-yilmaz-frontend-' + Date.now(),
    target_company: 'Genel',
    data: dummyData,
    template: 'modern',
    is_public: true
  }).select();

  if (insertError) {
    console.error('Error inserting CV:', insertError);
  } else {
    console.log('CV successfully created:', cvData[0].id);
  }
}

seed().catch(console.error);
