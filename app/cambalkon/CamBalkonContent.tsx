'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageLightbox from '@/components/ImageLightbox';
import { motion } from 'framer-motion';

export default function CamBalkonPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "/images/cambalkon/cambalkon-1.jpeg",
    "/images/cambalkon/cambalkon-2.jpeg",
    "/images/cambalkon/cambalkon-3.jpeg",
    "/images/cambalkon/cambalkon-4.jpeg",
    "/images/cambalkon/cambalkon-5.jpeg",
    "/images/cambalkon/cambalkon-6.jpeg",
    "/images/cambalkon/cambalkon-7.jpeg",
    "/images/cambalkon/cambalkon-8.jpeg"
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
            alt="Cam Balkon Sistemleri" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#00417A]/20 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-4">
            Cam Balkon
          </h1>
        </div>
      </section>

      {/* Gallery Section - MOVED UP, BIGGER PHOTOS */}
      <section className="py-8 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-[1400px] mx-auto px-3 md:px-12">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">Galeri</h2>
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
                  alt={`Cam Balkon Projesi ${idx + 1}`} 
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
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">Manzaranıza Engel Olmayın</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Balkonunuzu yılın sadece birkaç ayı değil, dört mevsim boyunca keyifle kullanabileceğiniz yeni bir yaşam alanına dönüştürüyoruz. Katlanır veya sürme cam balkon sistemlerimiz ile dışarıdaki gürültüyü, tozu ve soğuğu dışarıda bırakırken, içeriye aydınlığı ve manzarayı kesintisiz davet edin. Isıcamlı modellerimizle enerji tasarrufu ve konforu bir arada yaşayın.
            </p>
            <ul className="flex flex-col gap-4 text-[#444]">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00417A]">check_circle</span>
                Dört mevsim ısı ve ses yalıtımı sağlayan sistemler
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00417A]">check_circle</span>
                Paslanmaz çelik tekerlekler ile sorunsuz, kolay hareket
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00417A]">check_circle</span>
                Kilitlenebilir sistemler sayesinde tam hırsızlık güvenliği
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00417A]">check_circle</span>
                Binanın dış cephe estetiğine uygun renk ve cam seçenekleri
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={images[1]} alt="Cam Balkon Detay" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            <img src={images[2]} alt="Cam Balkon Detay" className="rounded-2xl w-full h-64 object-cover shadow-lg mt-8" />
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
