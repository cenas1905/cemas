'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

type Category = 'pleksi' | 'camli' | 'normal';

const categories: { id: Category; label: string; icon: string; desc: string }[] = [
  { id: 'pleksi', label: 'Pleksi', icon: '✨', desc: 'Şeffaf kristal pleksi dikmeli, lüks görünümlü merdiven sistemleri' },
  { id: 'camli', label: 'Camlı', icon: '🔷', desc: 'Modern cam panel korkuluklu, ferah ve şık merdiven sistemleri' },
  { id: 'normal', label: 'Normal', icon: '⚙️', desc: 'Paslanmaz çelik ve alüminyum boru sistemli dayanıklı merdivenler' },
];

const images: Record<Category, { src: string; alt: string }[]> = {
  pleksi: [
    { src: '/images/merdivenler/merdivenler-1.jpeg', alt: 'Pleksi Merdiven - Siyah & Altın' },
    { src: '/images/merdivenler/merdivenler-3.jpeg', alt: 'Pleksi Merdiven - Avizeli' },
    { src: '/images/merdivenler/merdivenler-4.jpeg', alt: 'Pleksi Merdiven - Siyah & Altın 2' },
    { src: '/images/merdivenler/merdivenler-6.jpeg', alt: 'Pleksi Merdiven - Tam Altın' },
    { src: '/images/merdivenler/merdivenler-7.jpeg', alt: 'Pleksi Merdiven - Tamamlanmış' },
    { src: '/images/merdivenler/merdivenler-8.jpeg', alt: 'Pleksi Merdiven - Ahşap Basamak' },
    { src: '/images/merdivenler/merdivenler-9.jpeg', alt: 'Pleksi Merdiven - Modern Kare' },
    { src: '/images/merdivenler/merdivenler-10.jpeg', alt: 'Pleksi Merdiven - Spiral' },
  ],
  camli: [
    { src: '/images/merdivenler/merdivenler-14.jpeg', alt: 'Camlı Merdiven - Cam Panel Korkuluk' },
  ],
  normal: [
    { src: '/images/merdivenler/merdivenler-2.jpeg', alt: 'Normal Merdiven - Paslanmaz Çelik' },
    { src: '/images/merdivenler/merdivenler-5.jpeg', alt: 'Normal Merdiven - Spiral Çelik' },
    { src: '/images/merdivenler/merdivenler-11.jpeg', alt: 'Normal Merdiven - Siyah Demir' },
    { src: '/images/merdivenler/merdivenler-12.jpeg', alt: 'Normal Merdiven - Gümüş & Altın' },
    { src: '/images/merdivenler/merdivenler-13.jpeg', alt: 'Normal Merdiven - Spiral Üstten' },
  ],
};

export default function MerdivenlerPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('pleksi');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroImage = images[activeCategory][0]?.src || images.pleksi[0].src;
  const currentImages = images[activeCategory];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-black mt-20">
        <div className="absolute inset-0 w-full h-full transition-all duration-700">
          <img
            src={heroImage}
            alt="Merdiven Sistemleri"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
            Merdiven Sistemleri
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Evinizin mimarisiyle bütünleşen, güvenli ve şık tasarım merdivenler.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 border-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#d21920] border-[#d21920] text-white shadow-lg scale-105'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#d21920] hover:text-[#d21920]'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {images[cat.id].length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="py-10 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {categories.map((cat) => (
            activeCategory === cat.id && (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">{cat.label} Merdivenler</h2>
                  <p className="text-[#555] mt-1">{cat.desc}</p>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {currentImages.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-6xl mb-4">📷</p>
              <p className="text-gray-400 text-lg">Bu kategori için fotoğraf yakında eklenecek...</p>
            </div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {currentImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Katlar Arası Estetik Bağ</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Merdivenler sadece bir ulaşım aracı değil, aynı zamanda mekanın karakterini belirleyen en önemli mimari unsurlardan biridir. Pleksi, cam veya metal detaylı modern merdiven sistemlerimiz ile yaşam alanlarınıza lüks bir dokunuş yapıyoruz.
            </p>
            <ul className="flex flex-col gap-4 text-[#444]">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                Yüksek taşıma kapasitesi ve kusursuz denge
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                Mekanın tasarımına uygun özel projelendirme
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                Sessiz kullanım ve basamak izolasyonları
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                Pleksi, cam ve metal seçenekleri
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/merdivenler/merdivenler-1.jpeg" alt="Merdiven Detay 1" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            <img src="/images/merdivenler/merdivenler-10.jpeg" alt="Merdiven Detay 2" className="rounded-2xl w-full h-64 object-cover shadow-lg mt-8" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
