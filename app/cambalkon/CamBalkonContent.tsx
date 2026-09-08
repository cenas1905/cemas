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

      {/* SEO İçerik */}
      <section className="py-16 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
            Hatay'da Cam Balkon Sistemleri
          </h2>
          <div className="flex flex-col gap-5 text-[#555] leading-relaxed text-[15px] md:text-base">
            <p>
              Hatay cam balkon denilince akla gelen ilk isimlerden biri olan CEM-AS Alüminyum, Antakya merkezli atölyemizde katlanır, sürgülü ve ısıcamlı cam balkon sistemlerini ölçüye özel üretiyor ve montajını yapıyor. Balkonunuzu dört mevsim kullanılabilir bir yaşam alanına dönüştürmek için Antakya, Defne ve Hatay genelinde ücretsiz keşif hizmeti sunuyoruz.
            </p>
            <p>
              Cam balkon fiyatları; cam tipi (temperli, ısıcam, lamine), kanat sayısı ve profil kalitesine göre değişir. Hatay'da en uygun cam balkon fiyatı için balkonunuzun ölçüsünü alıp net teklif çıkarıyoruz — sürpriz maliyet yok.
            </p>
            <h3 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] pt-3">
              Hizmet Verdiğimiz Bölgeler
            </h3>
            <p>
              Antakya, Defne, Samandağ, İskenderun, Arsuz, Dörtyol, Kırıkhan, Reyhanlı, Altınözü, Yayladağı ve Hatay'ın tüm ilçelerine cam balkon montajı yapıyoruz.
            </p>
            <h3 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] pt-3">
              Sık Sorulan Sorular
            </h3>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Cam balkon metrekare fiyatı ne kadar?</p>
              <p>Cam balkon fiyatı modele, cam kalınlığına ve kanat adedine göre değişir. WhatsApp'tan veya telefondan ölçülerinizi iletin, aynı gün net fiyat alın.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Cam balkon kışın sıcak tutar mı?</p>
              <p>Evet. Isıcamlı (çift camlı) sistemlerimiz ısı ve ses yalıtımı sağlayarak balkonunuzu kışın da kullanılabilir hale getirir.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Cam balkon montajı kaç gün sürer?</p>
              <p>Ölçü alındıktan sonra üretim ve montaj genellikle 3-7 iş günü içinde tamamlanır.</p>
            </div>
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
