'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
          >
            Sınırları Kaldırın, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              Manzaraya Yer Açın.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl font-light"
          >
            Alüminyum sistemlerinden lüks cam balkonlara kadar, yaşam alanlarınızı yeniden tanımlıyoruz.
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
            Antakya'nın köklü tecrübesiyle, her detayı ustalıkla işliyor; estetiği mühendislikle, güveni tasarımla buluşturuyoruz.
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
            
            {/* ALÜMİNYUM KORKULUK (Huge Importance) */}
            <Link href="/korkuluk" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1200&auto=format&fit=crop" 
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

            {/* PLEKSİ (Huge Importance) */}
            <Link href="/pleksi" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop" 
                alt="Pleksi Sistemleri" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-70"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Şeffaf Zarafet</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">PLEKSİ<br/>SİSTEMLER</h3>
                <p className="text-white/70 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Işığı yansıtan zarif yüzeyleriyle mekanlarınızı ferahlatın. Kırılmaya karşı yüksek direnç ve lüks görünüm.
                </p>
                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-black transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* WİNSA */}
            <Link href="/winsa" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                alt="Winsa" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E30613]/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">PVC Sistemleri</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">WİNSA</h3>
                <p className="text-white/80 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Mükemmel yalıtım ve kusursuz estetik ile evinizi geleceğe taşıyın.
                </p>
                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <span className="material-symbols-outlined text-white group-hover:text-[#E30613] transition-colors">arrow_forward</span>
                </div>
              </div>
            </Link>

            {/* ROYALGLASS */}
            <Link href="/royalglass" className="group relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=800&auto=format&fit=crop" 
                alt="Royalglass" 
                className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00417A]/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Cam Balkon</span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">ROYALGLASS</h3>
                <p className="text-white/80 max-w-md text-sm md:text-base font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Dört mevsim kesintisiz manzara keyfi. Şık ve güvenli cam balkon çözümleri.
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
