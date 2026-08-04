'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function CamBalkonPage() {
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-black mt-20">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={images[0]} 
            alt="Cam Balkon Sistemleri" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#00417A]/20 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
            Cam Balkon
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Dört mevsim kesintisiz manzara keyfi. Isı yalıtımlı, şık ve güvenli yaşam alanları.
          </p>
        </div>
      </section>

      {/* Features & Description */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Manzaranıza Engel Olmayın</h2>
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

      {/* Gallery Section */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-[#1a1a1a]">Galeri</h2>
            <p className="text-[#555] mt-4">Evlere ve mekanlara estetik katan cam balkon uygulamalarımız.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <img 
                  src={img} 
                  alt={`Cam Balkon Projesi ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
