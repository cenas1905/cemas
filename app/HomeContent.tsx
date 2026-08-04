'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [settings, setSettings] = useState<any>({});

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data && !data.error && Object.keys(data).length > 0) {
        setSettings(data);
      }
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  };

  const references = [
    'Botaş A.Ş.',
    'Step Asansörleri',
    'Özel Deniz Hastanesi',
    'Özel Defne Hastanesi',
    'Akdeniz Otel',
    'Saray Otel',
    'Lamistik Kafe',
    'Daplan İnşaat',
    'Botaş A.Ş.',
    'Step Asansörleri',
    'Özel Deniz Hastanesi',
    'Özel Defne Hastanesi',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] antialiased overflow-x-hidden">
      <Navbar />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>

        <motion.div 
          style={{ opacity: opacityText }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="backdrop-blur-md bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/90">
              MİMARİ ÇÖZÜM ORTAĞINIZ
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-5xl"
            dangerouslySetInnerHTML={{ __html: settings.hero_title || 'Sınırları Kaldırın, <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Manzaraya Yer Açın.</span>' }}
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl font-light"
          >
            {settings.hero_subtitle || 'Alüminyum sistemlerinden lüks cam balkonlara kadar, yaşam alanlarınızı yeniden tanımlıyoruz.'}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-widest text-white/50">Keşfet</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. PHILOSOPHY SCROLL REVEAL */}
      <section className="py-32 md:py-40 bg-white w-full flex items-center justify-center">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a1a] leading-tight"
          >
            Biz sadece profil ve cam satmıyoruz. <br className="hidden md:block" />
            <span className="text-[#1a1a1a]/40">Yaşam alanlarınıza nefes aldırıyoruz.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 text-[#555555] text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            {settings.about_text || "Antakya'nın köklü tecrübesiyle, her detayı ustalıkla işliyor; estetiği mühendislikle, güveni tasarımla buluşturuyoruz."}
          </motion.p>
        </div>
      </section>

      {/* 3. PREMIUM SOLUTIONS (Symmetric Large Grid for ALL categories) */}
      <section className="pb-32 bg-white w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="mb-16 md:px-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 block mb-2">UZMANLIK ALANLARIMIZ</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a]">Premium Çözümler</h2>
            </div>
            <p className="text-[#555555] text-sm md:text-base max-w-md font-light">
              Korkuluklardan PVC sistemlerine kadar her alanda maksimum kaliteyi ve kusursuz tasarımı sunuyoruz.
            </p>
          </div>

          {/* Equal Importance 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* ALÜMİNYUM KORKULUK */}
            <Link href="/korkuluk" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="/images/korkuluk/korkuluk-1.jpg" 
                alt="Alüminyum Korkuluk" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Güvenlik & Estetik</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">ALÜMİNYUM<br/>KORKULUK</h3>
                <p className="text-white/70 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Merdiven, balkon ve teraslarınız için paslanmaz, uzun ömürlü ve modern mimariye uygun korkuluk sistemleri.
                </p>
                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-black transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* MERDİVEN SİSTEMLERİ */}
            <Link href="/merdivenler" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="/images/merdivenler/merdivenler-1.jpeg" 
                alt="Merdiven Sistemleri" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Mimari Zarafet</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">MERDİVEN<br/>SİSTEMLERİ</h3>
                <p className="text-white/70 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Evinizin mimarisiyle bütünleşen, güvenli ve şık merdiven tasarımlarıyla katlar arası estetik bir bağ kurun.
                </p>
                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-black transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* DUŞAKABİN */}
            <Link href="/dusakabin" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="/images/dusakabin/dusakabin-1.jpeg" 
                alt="Duşakabin Sistemleri" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d4ed8]/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Banyo Çözümleri</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">DUŞAKABİN</h3>
                <p className="text-white/80 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Banyonuza ferahlık katacak, sızdırmaz, dayanıklı ve kişiselleştirilebilir lüks duşakabin çözümleri.
                </p>
                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-[#1d4ed8] transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* CAM BALKON */}
            <Link href="/cambalkon" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="/images/cambalkon/cambalkon-1.jpeg" 
                alt="Cam Balkon" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00417A]/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Cam Balkon Sistemleri</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">CAM<br/>BALKON</h3>
                <p className="text-white/80 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Dört mevsim kesintisiz manzara keyfi. Isı yalıtımlı, şık ve güvenli modern cam balkon tasarımları.
                </p>
                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-[#00417A] transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. INFINITE SCROLLING MARQUEE (References) */}
      <section className="py-20 bg-[#f8f8f8] w-full overflow-hidden border-y border-gray-100">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#555]">BİZE GÜVENEN GÜÇLÜ İŞ ORTAKLARIMIZ</span>
        </div>
        
        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden w-full group">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {references.map((ref, idx) => (
              <span key={idx} className="mx-12 font-display text-2xl md:text-4xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
                {ref}
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
            {references.map((ref, idx) => (
              <span key={`dup-${idx}`} className="mx-12 font-display text-2xl md:text-4xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
                {ref}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4b. STATS BAR */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '20+', label: 'Yıl Deneyim' },
              { number: '500+', label: 'Tamamlanan Proje' },
              { number: '1000+', label: 'Mutlu Müşteri' },
              { number: '%100', label: 'Garanti & Kalite' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="font-display text-4xl md:text-5xl font-black text-[#d21920]">{stat.number}</span>
                <span className="text-[#555] text-sm mt-2 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4c. MÜŞTERİ YORUMLARI */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 block mb-2">MÜŞTERİ GÖRÜŞLERİ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">Müşterilerimiz Ne Diyor?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmet Yılmaz',
                role: 'Villa Sahibi, Antakya',
                text: 'Pleksi merdiven sistemimizi CEM-AS yaptı. Hem kalitesi hem de işçiliği mükemmeldi. Kesinlikle tavsiye ederim.',
              },
              {
                name: 'Fatma Özdemir',
                role: 'Daire Sahibi, Defne',
                text: 'Cam balkonumuzu yürüttüler, çok memnun kaldık. Montaj çok hızlı ve temizdi. Fiyatlar da piyasaya göre çok uygundu.',
              },
              {
                name: 'Mehmet Kaya',
                role: 'Ofis Sahibi, Antakya',
                text: 'Duşakabin ve korkuluk sistemlerinde çok profesyonel yaklaşım gösterdiler. Projeyi tam süresi bitmeden teslim ettiler.',
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-[#444] text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <p className="font-bold text-[#1a1a1a] text-sm">{t.name}</p>
                  <p className="text-[#888] text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4d. YEREL SEO METNİ — Hatay Alüminyum anahtar kelimesi */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-[1000px] mx-auto px-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 block mb-3 text-center">
            HATAY'IN ALÜMİNYUM USTASI
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1a1a1a] text-center leading-tight">
            Hatay'da Alüminyum Doğrama ve Cam Sistemleri
          </h2>
          <p className="mt-8 text-[#555555] text-base md:text-lg font-light leading-relaxed text-center">
            CEM-AS Alüminyum, Hatay'ın Antakya ve Defne bölgesinde alüminyum
            doğrama, cam balkon, korkuluk, duşakabin ve merdiven sistemleri
            alanında hizmet veriyor. Botaş, hastaneler ve oteller gibi kurumsal
            referanslarımızla; evinizden iş yerinize her ölçekte projede
            estetik ve güvenli alüminyum çözümleri sunuyoruz.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/cambalkon" className="px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-sm font-semibold text-[#1a1a1a] hover:bg-[#d21920] hover:text-white hover:border-[#d21920] transition-colors">
              Cam Balkon
            </Link>
            <Link href="/korkuluk" className="px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-sm font-semibold text-[#1a1a1a] hover:bg-[#d21920] hover:text-white hover:border-[#d21920] transition-colors">
              Alüminyum Korkuluk
            </Link>
            <Link href="/dusakabin" className="px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-sm font-semibold text-[#1a1a1a] hover:bg-[#d21920] hover:text-white hover:border-[#d21920] transition-colors">
              Duşakabin
            </Link>
            <Link href="/merdivenler" className="px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-sm font-semibold text-[#1a1a1a] hover:bg-[#d21920] hover:text-white hover:border-[#d21920] transition-colors">
              Merdiven Sistemleri
            </Link>
            <Link href="/automatic-doors" className="px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-sm font-semibold text-[#1a1a1a] hover:bg-[#d21920] hover:text-white hover:border-[#d21920] transition-colors">
              Otomatik Kapı
            </Link>
            <Link href="/shutters" className="px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-sm font-semibold text-[#1a1a1a] hover:bg-[#d21920] hover:text-white hover:border-[#d21920] transition-colors">
              Kepenk Sistemleri
            </Link>
          </div>
        </div>
      </section>

      {/* 5. DARK MODE GLOW CTA (Simulator) */}
      <section className="py-32 bg-[#050505] w-full relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

        <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
            Hayalinizdeki Projeyi <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Gerçeğe Dönüştürelim.</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
            Gelişmiş simülatörümüzü kullanarak ölçülerinizi girin, kullanılacak malzemeyi seçin ve projenizin maliyetini saniyeler içinde hesaplayın.
          </p>
          
          <Link 
            href="/quote"
            className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Simülatörü Başlat
            <span className="material-symbols-outlined">calculate</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
