'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BalconiesPage() {
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
      title: 'Katlanır Cam Balkon Sistemleri',
      desc: 'Balkonunuzu tamamen açık hale getirebileceğiniz, her köşeye katlanabilen hareketli kanat yapısı. Klasik ve şık tasarım.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALFTR3U_KtByt9Ub9uElWbZr3MU3YyspQ2VUxJJM81UIef5gYWPsFByPQUGYraUGSwnPeb0VI6CP4sJWcY3ApyLmP2DFKcwM-WU8zooQ4esiE-G9-c8UQKqBoN0_7GDsWG7omVqPMSpIqg0Ad2ybG2Ol1th45bcQaLx2xqAsrQEwZbI_T0WIE8MG8HFMOZQ6g5Ct_Wi1PNr10zik-o1sR2Mgp4FxM-V31n6CLkAU6FFdUVYjSSi1GR8g', // Has design image
    },
    {
      title: 'Sürgülü Cam Balkon Sistemleri',
      desc: 'Eşikli ve eşiksiz sürme mekanizmalı, kanatların birbirini takip ederek yatay olarak kaydığı modern geçiş sistemleri.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVW4xh1X8uofXqbNXco90NrnvyRoBX38mWqcc3m7sFI_gT4QD4ZIsej4HINURvRRxRLArQeZcvid2q37-zmGMWD4seL2Zaby2bCAAe9XXIaB1U8uT4J--mHZSd4hnlzbjyZxCKqeinSp_fEKYFC-swltVjPXau-hfVJHRlht0L63mvItSKmgYBrK0C2vjd--NI18TPA07I0UCko00C-e8QEGwvK3LyOwyYh0Aacpf_6JYzT3ihmyInPQ', // Has design image
    },
    {
      title: 'Isıcamlı (Çift Camlı) Premium Balkonlar',
      desc: 'Maksimum ısı ve ses yalıtımı sunan, temperli çift cam birleşimiyle yaz-kış oda konforunda kullanım sağlayan lüks sistemler.',
      img: null, // Placeholder for user's photo
    },
    {
      title: 'Giyotin Motorlu Cam Sistemleri',
      desc: 'Uzaktan kumandalı, dikey olarak aşağı-yukarı hareket eden, açıldığında cam korkuluğa dönüşen akıllı giyotin sistemleri.',
      img: null, // Placeholder for user's photo
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#0b0f19] antialiased">
      <Navbar />

      <main className="pt-20">
        {/* Page Hero */}
        <section className="relative w-full h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALFTR3U_KtByt9Ub9uElWbZr3MU3YyspQ2VUxJJM81UIef5gYWPsFByPQUGYraUGSwnPeb0VI6CP4sJWcY3ApyLmP2DFKcwM-WU8zooQ4esiE-G9-c8UQKqBoN0_7GDsWG7omVqPMSpIqg0Ad2ybG2Ol1th45bcQaLx2xqAsrQEwZbI_T0WIE8MG8HFMOZQ6g5Ct_Wi1PNr10zik-o1sR2Mgp4FxM-V31n6CLkAU6FFdUVYjSSi1GR8g"
              alt="Cam Balkon Sistemleri"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10 bg-[#fafafa]/30 backdrop-blur-[1.5px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent" />
          </div>

          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
            <span className="bg-white/80 border border-[#dcdde2] px-3.5 py-1.5 font-bold text-[10px] uppercase tracking-widest text-[#565f69] mb-4 rounded-full">
              ÜRÜN GRUPLARI
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display font-semibold text-4xl md:text-5xl text-[#0b0f19] tracking-tight leading-tight mb-6"
            >
              Cam Balkon Sistemleri
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="text-base md:text-lg text-[#565f69] font-normal leading-relaxed max-w-2xl"
            >
              Yaşam alanlarınızı dış etkenlerden korurken manzaranızı sonsuzlaştıran, yalıtım ve estetiğin mükemmel sentezi olan sürme ve katlama çözümleri.
            </motion.p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto w-full">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">KATEGORİLER</span>
            <h2 className="font-display text-3xl font-semibold text-[#0b0f19]">Cam Balkon Modellerimiz</h2>
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
                  {/* Photo area */}
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
      </main>

      <Footer />
    </div>
  );
}
