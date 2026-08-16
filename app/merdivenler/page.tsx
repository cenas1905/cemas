'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageLightbox from '@/components/ImageLightbox';
import { motion } from 'framer-motion';

export default function MerdivenlerPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "/images/merdivenler/merdivenler-1.jpeg",
    "/images/merdivenler/merdivenler-2.jpeg",
    "/images/merdivenler/merdivenler-3.jpeg",
    "/images/merdivenler/merdivenler-4.jpeg",
    "/images/merdivenler/merdivenler-5.jpeg",
    "/images/merdivenler/merdivenler-6.jpeg",
    "/images/merdivenler/merdivenler-7.jpeg",
    "/images/merdivenler/merdivenler-8.jpeg",
    "/images/merdivenler/merdivenler-9.jpeg",
    "/images/merdivenler/merdivenler-10.jpeg",
    "/images/merdivenler/merdivenler-11.jpeg",
    "/images/merdivenler/merdivenler-12.jpeg",
    "/images/merdivenler/merdivenler-13.jpeg",
    "/images/merdivenler/merdivenler-14.jpeg"
  ];

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black mt-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={images[0]} 
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

      {/* Gallery Section - MOVED UP, BIGGER PHOTOS */}
      <section className="py-8 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-[1400px] mx-auto px-3 md:px-12">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">Proje Galerisi</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {images.map((img, idx) => (
              <motion.div 
                key={idx}
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
          </div>
        </div>
      </section>

      {/* Features & Description - MOVED DOWN */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">Katlar Arası Estetik Bağ</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Merdivenler sadece bir ulaşım aracı değil, aynı zamanda mekanın karakterini belirleyen en önemli mimari unsurlardan biridir. Alüminyum, ahşap veya cam detaylı modern merdiven sistemlerimiz ile yaşam alanlarınıza lüks bir dokunuş yapıyoruz. Gelişmiş mühendislik ve kusursuz montaj ile maksimum güvenlik sağlıyoruz.
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
                Geniş malzeme ve renk seçenekleri
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={images[1]} alt="Merdiven Detay 1" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            <img src={images[2]} alt="Merdiven Detay 2" className="rounded-2xl w-full h-64 object-cover shadow-lg mt-8" />
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
