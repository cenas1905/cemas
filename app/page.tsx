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

  const categories = [
    { name: 'Korkuluk', href: '/korkuluk', icon: 'fence', image: '/images/korkuluk/korkuluk-1.jpg' },
    { name: 'Merdiven', href: '/merdivenler', icon: 'stairs', image: '/images/merdivenler/merdivenler-1.jpeg' },
    { name: 'Duşakabin', href: '/dusakabin', icon: 'shower', image: '/images/dusakabin/dusakabin-1.jpeg' },
    { name: 'Cam Balkon', href: '/cambalkon', icon: 'window', image: '/images/cambalkon/cambalkon-1.jpeg' },
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
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-5xl"
            dangerouslySetInnerHTML={{ __html: settings.hero_title || 'Sınırları Kaldırın, <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Manzaraya Yer Açın.</span>' }}
          />
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

      {/* 2. MOBILE-FIRST CATEGORY QUICK NAV */}
      <section className="py-6 md:py-10 bg-white w-full">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex-shrink-0 snap-start group relative w-[70vw] sm:w-[45vw] md:w-1/4 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-2xl md:text-3xl">{cat.icon}</span>
                  <span className="font-display font-bold text-white text-lg md:text-xl">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREMIUM SOLUTIONS (Large Category Cards) */}
      <section className="pb-16 md:pb-32 bg-white w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-16 md:px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 block mb-2">UZMANLIK ALANLARIMIZ</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1a1a1a]">Premium Çözümler</h2>
          </div>

          {/* Equal Importance 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            
            {/* ALÜMİNYUM KORKULUK */}
            <Link href="/korkuluk" className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3]">
              <img 
                src="/images/korkuluk/korkuluk-1.jpg" 
                alt="Alüminyum Korkuluk" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-end">
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">ALÜMİNYUM<br/>KORKULUK</h3>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-black transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* MERDİVEN SİSTEMLERİ */}
            <Link href="/merdivenler" className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3]">
              <img 
                src="/images/merdivenler/merdivenler-1.jpeg" 
                alt="Merdiven Sistemleri" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-end">
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">MERDİVEN<br/>SİSTEMLERİ</h3>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-black transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* DUŞAKABİN */}
            <Link href="/dusakabin" className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3]">
              <img 
                src="/images/dusakabin/dusakabin-1.jpeg" 
                alt="Duşakabin Sistemleri" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d4ed8]/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-end">
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">DUŞAKABİN</h3>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-[#1d4ed8] transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* CAM BALKON */}
            <Link href="/cambalkon" className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3]">
              <img 
                src="/images/cambalkon/cambalkon-1.jpeg" 
                alt="Cam Balkon" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00417A]/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-end">
                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">CAM<br/>BALKON</h3>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-[#00417A] transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. INFINITE SCROLLING MARQUEE (References) */}
      <section className="py-12 md:py-20 bg-[#f8f8f8] w-full overflow-hidden border-y border-gray-100">
        <div className="text-center mb-8 md:mb-10">
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

      {/* 5. ABOUT TEXT (moved to bottom, condensed) */}
      <section className="py-16 md:py-24 bg-white w-full">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-semibold text-[#1a1a1a] mb-6">
            {settings.about_text || "Antakya'nın köklü tecrübesiyle, her detayı ustalıkla işliyor; estetiği mühendislikle, güveni tasarımla buluşturuyoruz."}
          </h2>
          <Link 
            href="/quote"
            className="inline-flex items-center gap-3 bg-[#d21920] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1a1a1a] transition-all duration-300"
          >
            Fiyat Teklifi Al
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
