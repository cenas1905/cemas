'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageLightbox from '@/components/ImageLightbox';
import { motion } from 'framer-motion';

export default function DusakabinPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "/images/dusakabin/dusakabin-1.jpeg",
    "/images/dusakabin/dusakabin-2.jpeg",
    "/images/dusakabin/dusakabin-3.jpeg",
    "/images/dusakabin/dusakabin-4.jpeg",
    "/images/dusakabin/dusakabin-5.jpeg",
    "/images/dusakabin/dusakabin-6.jpeg",
    "/images/dusakabin/dusakabin-7.jpeg"
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
            alt="Duşakabin Sistemleri" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1d4ed8]/20 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-4">
            Duşakabin Sistemleri
          </h1>
        </div>
      </section>

      {/* Gallery Section - MOVED UP, BIGGER PHOTOS */}
      <section className="py-8 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-[1400px] mx-auto px-3 md:px-12">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">Uygulama Örnekleri</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {images.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] bg-black cursor-pointer shadow-md hover:shadow-xl transition-all"
                onClick={() => openLightbox(idx)}
              >
                <img 
                  src={img} 
                  alt={`Duşakabin Projesi ${idx + 1}`} 
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
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">Ferah ve Modern Banyolar</h2>
            <p className="text-[#555] leading-relaxed mb-6">
              Banyonuzun ölçülerine ve tasarım tarzınıza uygun, şık profillere ve temperli camlara sahip duşakabinlerimiz ile ıslak zemin problemlerini geride bırakın. Menteşeli, sürgülü veya kompakt sistem seçenekleriyle her banyoya en uygun ve en kullanışlı çözümü üretiyoruz. Su sızdırmazlık garantisi ve kolay temizlenebilen nano cam teknolojisiyle konforu hissedin.
            </p>
            <ul className="flex flex-col gap-4 text-[#444]">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1d4ed8]">check_circle</span>
                Darbeye dayanıklı, kırılmaz temperli güvenli camlar
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1d4ed8]">check_circle</span>
                Paslanmaz ve kireç tutmayan lüks alüminyum profiller
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1d4ed8]">check_circle</span>
                Mükemmel su sızdırmazlık için gelişmiş fitil sistemleri
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1d4ed8]">check_circle</span>
                Dar alanlar için özel sürgülü veya katlanır çözümler
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={images[1]} alt="Duşakabin Detay" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            <img src={images[2]} alt="Duşakabin Detay" className="rounded-2xl w-full h-64 object-cover shadow-lg mt-8" />
          </div>
        </div>
      </section>

      {/* SEO İçerik */}
      <section className="py-16 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
            Hatay'da Duşakabin Sistemleri
          </h2>
          <div className="flex flex-col gap-5 text-[#555] leading-relaxed text-[15px] md:text-base">
            <p>
              Hatay duşakabin arayanlar için CEM-AS Alüminyum; Defne merkezli atölyemizde sürgülü, menteşeli, siyah loft ve özel ölçü duşakabin sistemlerini temperli güvenli camla üretiyor. Banyonuza tam oturan, su sızdırmayan şık çözümler sunuyoruz.
            </p>
            <p>
              Duşakabin fiyatları; cam kalınlığı (6-10 mm), profil kaplaması ve ölçüye göre değişir. Hatay'da duşakabin fiyatı için banyonuzun ölçüsünü iletin, aynı gün teklif alın.
            </p>
            <h3 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] pt-3">
              Hizmet Verdiğimiz Bölgeler
            </h3>
            <p>
              Antakya, Defne, Samandağ, İskenderun, Arsuz, Dörtyol, Kırıkhan, Reyhanlı ve Hatay genelinde duşakabin montajı yapıyoruz.
            </p>
            <h3 className="font-display text-lg md:text-xl font-bold text-[#1a1a1a] pt-3">
              Sık Sorulan Sorular
            </h3>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Duşakabin ölçüsü nasıl alınır?</p>
              <p>Duş alanının genişlik ve yüksekliği ölçülür. Keşif ekibimiz yerinde ölçü alarak en uygun modeli önerir.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Duşakabin su sızdırır mı?</p>
              <p>Hayır. Özel UV filtreli magnetik fitiller ve doğru montaj sayesinde su sızdırmazlık garantisi veriyoruz.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a]">Duşakabin kaç günde takılır?</p>
              <p>Ölçü alındıktan sonra üretim ve montaj genellikle 3-5 iş günü içinde tamamlanır.</p>
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
