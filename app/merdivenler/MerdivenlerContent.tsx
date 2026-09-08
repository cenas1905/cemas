'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageLightbox from '@/components/ImageLightbox';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'pleksi' | 'klasik' | 'camli';

const categoryData: Record<Category, { label: string; images: string[] }> = {
  pleksi: {
    label: 'Pleksi',
    images: [
      "/images/merdivenler/merdivenler-1.jpeg",
      "/images/merdivenler/merdivenler-3.jpeg",
      "/images/merdivenler/merdivenler-4.jpeg",
      "/images/merdivenler/merdivenler-5.jpeg",
      "/images/merdivenler/merdivenler-6.jpeg",
      "/images/merdivenler/merdivenler-7.jpeg",
      "/images/merdivenler/merdivenler-8.jpeg",
      "/images/merdivenler/merdivenler-9.jpeg",
      "/images/merdivenler/merdivenler-10.jpeg",
      "/images/merdivenler/merdivenler-15.jpeg",
      "/images/merdivenler/merdivenler-17.jpeg",
      "/images/merdivenler/merdivenler-18.jpeg",
      "/images/merdivenler/merdivenler-19.jpeg",
    ],
  },
  klasik: {
    label: 'Klasik',
    images: [
      "/images/merdivenler/merdivenler-2.jpeg",
      "/images/merdivenler/merdivenler-11.jpeg",
      "/images/merdivenler/merdivenler-12.jpeg",
      "/images/merdivenler/merdivenler-13.jpeg",
    ],
  },
  camli: {
    label: 'Camlı',
    images: [
      "/images/merdivenler/merdivenler-14.jpeg",
      "/images/merdivenler/merdivenler-16.jpeg",
      "/images/merdivenler/merdivenler-camli-1.png",
      "/images/merdivenler/merdivenler-camli-2.png",
      "/images/merdivenler/merdivenler-camli-3.png",
    ],
  },
};

const allImages = [
  ...categoryData.pleksi.images,
  ...categoryData.klasik.images,
  ...categoryData.camli.images,
];

export default function MerdivenlerPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('pleksi');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentImages = categoryData[activeCategory].images;

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const tabs: { key: Category; label: string }[] = [
    { key: 'pleksi', label: 'Pleksi' },
    { key: 'klasik', label: 'Klasik' },
    { key: 'camli', label: 'Camlı' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black mt-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={allImages[0]} 
            alt="Merdiven Sistemleri" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-4">
            Merdiven Sistemleri
          </h1>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white sticky top-[104px] md:top-[108px] z-40 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3 md:py-4 md:justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`relative px-5 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeCategory === tab.key
                    ? 'bg-[#d21920] text-white shadow-lg'
                    : 'bg-gray-100 text-[#555] hover:bg-gray-200'
                }`}
              >
                {tab.label}
                {activeCategory === tab.key && (
                  <span className="ml-2 text-white/70">({categoryData[tab.key].images.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-8 md:py-16 bg-[#f8f8f8]">
        <div className="max-w-[1400px] mx-auto px-3 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
            >
              {currentImages.map((img, idx) => (
                <motion.div 
                  key={img}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.1 }}
                  className="group relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] bg-black cursor-pointer shadow-md hover:shadow-xl transition-all"
                  onClick={() => openLightbox(idx)}
                >
                  <img 
                    src={img} 
                    alt={`Merdiven Projesi ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">fullscreen</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features & Description - AT BOTTOM */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">Katlar Arası Estetik Bağ</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Merdivenler sadece bir ulaşım aracı değil, aynı zamanda mekanın karakterini belirleyen en önemli mimari unsurlardan biridir. Pleksi, camlı veya klasik metal detaylı modern merdiven sistemlerimiz ile yaşam alanlarınıza lüks bir dokunuş yapıyoruz.
            </p>
            <ul className="flex flex-col gap-4 text-[#444]">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                <strong>Pleksi:</strong> Şeffaf akrilik dikmeli, altın/krom detaylı şık tasarımlar
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                <strong>Klasik:</strong> Metal profilli, sağlam ve dayanıklı geleneksel korkuluklar
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                <strong>Camlı:</strong> Temperli cam panelli, modern ve ferah görünüm
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d21920]">check_circle</span>
                Her projeye özel ölçü ve tasarım imkanı
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={allImages[1]} alt="Merdiven Detay 1" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            <img src={categoryData.camli.images[0]} alt="Merdiven Detay 2" className="rounded-2xl w-full h-64 object-cover shadow-lg mt-8" />
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={currentImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
