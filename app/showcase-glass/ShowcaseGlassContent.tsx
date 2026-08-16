'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ShowcaseGlassPage() {
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
      title: 'Mağaza Vitrin & Camekan Sistemleri',
      desc: 'İş yerleri, mağazalar ve showroomlar için tasarlanmış geniş görüş alanına sahip dayanıklı, geniş camlı vitrin camekan çözümleri.',
      img: 'https://cemasaluminyum.com/img/camekan.jpg',
    },
    {
      title: 'Isı Yalıtımlı Alüminyum Doğramalar',
      desc: 'Dış cephe pencereleri ve kapılar için yüksek ısı ve ses yalıtımı sunan bariyerli alüminyum profil sistemleri.',
      img: null, // Placeholder
    },
    {
      title: 'Ofis İçi Cam Bölme Sistemleri',
      desc: 'Modern çalışma alanları yaratmak için profil veya çerçevesiz akustik çift camlı şık ofis bölme tasarımları.',
      img: null, // Placeholder
    },
    {
      title: 'Alüminyum Sürme Kapı & Pencere',
      desc: 'Bahçe ve teras geçişlerinde pürüzsüz kayma mekanizmalı, geniş cam yüzeyli minimalist sürme doğrama profilleri.',
      img: null, // Placeholder
    },
  ];

  const glassSpecs = [
    { label: 'Profil Alaşım Sınıfı', value: '6063 T6 Alüminyum Yapısal Profiller' },
    { label: 'Cam Seçenekleri', value: '4mm+12A+4mm / 6mm+12A+6mm Isıcam Lamine' },
    { label: 'Yalıtım Detayı', value: 'Bariyerli (Poliamid Yalıtım Köprülü) / Bariyersiz' },
    { label: 'Fitil Sistemi', value: 'EPDM Yüksek Esneklikte EPDM Hava ve Su Sızdırmazlık Fitilleri' },
    { label: 'Aksesuar Uyumluluğu', value: 'Giesse / Roto / Stublina İthal Mekanizma Setleri' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Navbar />

      <main className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 flex flex-col gap-24 md:gap-32">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center min-h-[500px]">
          {/* Text Area */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-6 z-10">
            <span className="bg-white/80 border border-[#dcdde2] px-3.5 py-1.5 font-bold text-[10px] uppercase tracking-widest text-[#565f69] rounded-full self-start">
              MİMARİ DOĞRAMA
            </span>
            
            <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#1a1a1a] tracking-tight leading-tight">
              Camekan & Alüminyum Doğrama
            </h1>
            
            <p className="text-sm md:text-base text-[#565f69] font-normal leading-relaxed">
              İş yerleriniz ve mağazalarınız için dayanıklılık ve şeffaflığı bir arada sunan mimari tasarımlar. Isı yalıtımlı modern alüminyum pencere ve bölme çözümleri.
            </p>
            
            <div className="flex gap-4 mt-2">
              <Link
                href="/quote"
                className="bg-[#d21920] text-white text-center text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded hover:bg-[#d21920] hover:text-[#1a1a1a] transition-colors"
              >
                Doğrama Fiyatı Al
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
                src="https://cemasaluminyum.com/img/camekan.jpg"
                alt="Mağaza vitrini alüminyum camekan"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Categories Section */}
        <section className="py-16 border-t border-[#dcdde2]/40">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">KATEGORİLERİMİZ</span>
            <h2 className="font-display text-3xl font-semibold text-[#1a1a1a]">Doğrama ve Cephe Çözümlerimiz</h2>
            <p className="text-xs text-[#565f69] mt-2">
              (Görsel bulunmayan alanlar, ileride kendi fotoğraflarınızı yerleştirebilmeniz için şablon olarak tasarlanmıştır.)
            </p>
            <div className="w-12 h-0.5 bg-[#d21920] mt-4"></div>
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
                className="bg-white border border-[#dcdde2]/60 p-6 flex flex-col justify-between hover:border-[#d21920] hover:shadow-md transition-all duration-300 rounded"
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
                  
                  <h3 className="font-display text-xl font-semibold text-[#1a1a1a] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#565f69] leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#dcdde2]/30 pt-4">
                  <span className="text-[9px] font-bold text-[#d21920] uppercase tracking-wider">CEM-AS GÜVENCESİ</span>
                  <Link href="/quote" className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:opacity-80 flex items-center gap-1.5">
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">YALITIM VE DAYANIKLILIK</span>
              <h2 className="font-display text-3xl font-semibold text-[#1a1a1a] mb-6">Mühendislik Kriterlerimiz</h2>
              <p className="text-sm text-[#565f69] leading-relaxed">
                İş yerinizin dış cephe doğramalarında kullanılan EPDM contalar ve poliamid ısı bariyerleri sayesinde kışın sıcak havayı, yazın ise serinliği korursunuz.
              </p>
            </div>

            <div className="md:col-span-7 bg-[#fafafa] border border-[#dcdde2]/60 p-8 rounded">
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-6">Alüminyum Doğrama Detayları</h3>
              <div className="flex flex-col">
                {glassSpecs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-4 border-b border-[#dcdde2]/20 spec-row">
                    <span className="text-[10px] font-bold text-[#565f69] uppercase tracking-wider pr-4">{spec.label}</span>
                    <span className="text-sm font-semibold text-[#1a1a1a] text-right">{spec.value}</span>
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
