'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ShowersPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const categories = [
    {
      title: 'Pivot / Menteşeli Duşakabinler',
      desc: 'Dışa veya içe doğru geniş açıyla açılan menteşeli lüks cam kapılar. Minimalist pirinç veya paslanmaz çelik mafsallı tasarımlar.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPNY1SJCI9YMvrfFEbUmzacAy5QpisMhOZZfr6cTTK-x16dQ1mqk8reb6OrQGUaFQLmHn_hQs0rqn0pENm0r4EaVlAgONFV_E3PX6pc0y5NCR3RHZw0kTLCWFuZvfeGatZ79NXK6mhfh-CfqFuEM2PLdzX7027sWLszyKoGZJwTLbHz9Ei7S-6ToeBNW7C4ywgAXVGLrgfz-vNiSLFaZRKUouBxL9tXoeh4UOEUD0_Mvd2PfYqqJRTTQ',
    },
    {
      title: 'Sürgülü Lüks Duşakabin Sistemleri',
      desc: 'Banyolarda alan tasarrufu sağlayan, üst ray üzerinde sessizce kayan rulman mekanizmalı, sızdırmaz cam paneller.',
      img: null, // Placeholder for user's photo
    },
    {
      title: 'Siyah Loft Seri (Mat Siyah Profil)',
      desc: 'Endüstriyel ve modern loft havası katan, mat siyah alüminyum profilli ve siyah karolajlı şık banyo tasarımları.',
      img: null, // Placeholder for user's photo
    },
    {
      title: 'Altın & Bronz Klasik Seri',
      desc: 'Altın sarısı veya antik bronz paslanmaz profil kaplamalarıyla banyonuzda klasik, lüks ve zengin bir görünüm.',
      img: null, // Placeholder for user's photo
    },
  ];

  const showerSpecs = [
    { label: 'Cam Tipi', value: '6mm - 8mm - 10mm Temperli Güvenlik Camı' },
    { label: 'Profil Kaplama Alternatifleri', value: 'Mat Siyah, Parlak Krom, Parlak Altın, Antik Bronz' },
    { label: 'Mekanizma Tipleri', value: 'Sürgülü Üst Askılı, Menteşeli, Pivot kapı sistemleri' },
    { label: 'Sızdırmazlık Elemanları', value: 'Özel UV filtreli magnetik fitiller' },
    { label: 'Donanım & Aksesuar', value: '304 Kalite Paslanmaz Çelik kulp ve menteşeler' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#0b0f19] antialiased">
      <Navbar />

      <main className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 flex flex-col gap-24 md:gap-32">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Text Area */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-6 z-10">
            <span className="bg-white/80 border border-[#dcdde2] px-3.5 py-1.5 font-bold text-[10px] uppercase tracking-widest text-[#565f69] rounded-full self-start">
              LÜKS BANYO SERİSİ
            </span>
            
            <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0b0f19] tracking-tight leading-tight">
              Şeffaflığın Zarafeti.
            </h1>
            
            <p className="text-sm md:text-base text-[#565f69] font-normal leading-relaxed">
              Modern banyolar için tasarlanmış, özel ölçü cam duşakabin sistemleri. Temperli camın güvenliği, paslanmaz donanımın şıklığı ile buluşuyor.
            </p>
            
            <div className="flex gap-4 mt-2">
              <Link
                href="/quote"
                className="bg-[#0b0f19] text-white text-center text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded hover:bg-[#8a9ca7] hover:text-[#0b0f19] transition-colors"
              >
                Kabin Fiyatı Hesapla
              </Link>
            </div>
          </div>

          {/* Visual Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1 md:col-span-7 relative h-[500px] w-full bg-white/50 backdrop-blur-md border border-[#dcdde2]/60 p-4 rounded shadow-sm"
          >
            <div className="w-full h-full relative overflow-hidden rounded">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPNY1SJCI9YMvrfFEbUmzacAy5QpisMhOZZfr6cTTK-x16dQ1mqk8reb6OrQGUaFQLmHn_hQs0rqn0pENm0r4EaVlAgONFV_E3PX6pc0y5NCR3RHZw0kTLCWFuZvfeGatZ79NXK6mhfh-CfqFuEM2PLdzX7027sWLszyKoGZJwTLbHz9Ei7S-6ToeBNW7C4ywgAXVGLrgfz-vNiSLFaZRKUouBxL9tXoeh4UOEUD0_Mvd2PfYqqJRTTQ"
                alt="Modern temperli cam duşakabin"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Categories Section */}
        <section className="py-16 border-t border-[#dcdde2]/40">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">KOLEKSİYONLARIMIZ</span>
            <h2 className="font-display text-3xl font-semibold text-[#0b0f19]">Duşakabin Kabin Serilerimiz</h2>
            <p className="text-xs text-[#565f69] mt-2">
              (Görsel bulunmayan alanlar, ileride kendi fotoğraflarınızı yerleştirebilmeniz için şablon olarak tasarlanmıştır.)
            </p>
            <div className="w-12 h-0.5 bg-[#8a9ca7] mt-4"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-[#dcdde2]/60 p-6 flex flex-col justify-between hover:border-[#0b0f19] hover:shadow-md transition-all duration-300 rounded"
              >
                <div>
                  {cat.img ? (
                    <div className="h-64 mb-6 overflow-hidden bg-[#ebeef0] rounded-sm">
                      <img
                        src={cat.img}
                        alt={cat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-64 mb-6 rounded-sm photo-placeholder flex flex-col items-center justify-center text-[#565f69] p-4">
                      <span className="material-symbols-outlined text-4xl mb-3 opacity-60">add_a_photo</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-center">Fotoğraf Ekleme Alanı</span>
                      <span className="text-[9px] text-[#565f69]/80 text-center mt-1">Görselinizi buraya yerleştirebilirsiniz</span>
                    </div>
                  )}
                  
                  <h3 className="font-display text-xl font-semibold text-[#0b0f19] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#565f69] leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#dcdde2]/30 pt-4">
                  <span className="text-[9px] font-bold text-[#8a9ca7] uppercase tracking-wider">CEMAS GÜVENCESİ</span>
                  <Link href="/quote" className="text-[10px] font-bold uppercase tracking-widest text-[#0b0f19] hover:opacity-80 flex items-center gap-1.5">
                    Fiyat Al <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Specs Table Section */}
        <section className="py-16 border-t border-[#dcdde2]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            <div className="md:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">ÖZELLİKLERİMİZ</span>
              <h2 className="font-display text-3xl font-semibold text-[#0b0f19] mb-6">Tasarım & Emniyet Standartları</h2>
              <p className="text-sm text-[#565f69] leading-relaxed">
                Her banyo yerleşimine ve kişisel estetik tercihlere uyacak şekilde tamamen özelleştirilebilen modüllerle lüks duş alanları yaratıyoruz.
              </p>
            </div>

            <div className="md:col-span-7 bg-[#fafafa] border border-[#dcdde2]/60 p-8 rounded">
              <h3 className="text-lg font-semibold text-[#0b0f19] mb-6">Detaylı Donanım Verileri</h3>
              <div className="flex flex-col">
                {showerSpecs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-4 border-b border-[#dcdde2]/20 spec-row">
                    <span className="text-[10px] font-bold text-[#565f69] uppercase tracking-wider pr-4">{spec.label}</span>
                    <span className="text-sm font-semibold text-[#0b0f19] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
