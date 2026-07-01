'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
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

  const values = [
    {
      title: 'Ustalık ve Güven',
      desc: 'CEM-AS Alüminyum olarak, Hatay genelinde yıllardır dürüst esnaflık ve üstün ustalık prensibiyle hizmet veriyoruz.',
    },
    {
      title: 'Yüksek Kalite Standartları',
      desc: 'Müşterilerimize sunduğumuz cam balkon, küpeşte, kepenk ve kapı sistemlerinde sadece CE ve TSE sertifikalı ürünleri kullanıyoruz.',
    },
    {
      title: 'Tam Zamanında Teslimat',
      desc: 'Söz verdiğimiz ölçü, tasarım ve montaj takvimine sadık kalarak, projelerinizi zamanında ve eksiksiz teslim ediyoruz.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 w-full flex-grow flex flex-col gap-20">
        
        {/* About Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] bg-[#f0f1f4] px-3.5 py-1.5 rounded-full self-start">
              BİZ KİMİZ?
            </span>
            <h1 className="font-display font-semibold text-3xl md:text-5xl text-[#1a1a1a] tracking-tight leading-tight">
              CEM-AS Alüminyum & Cam Sistemleri
            </h1>
            <p className="text-sm md:text-base text-[#565f69] leading-relaxed">
              CEM-AS Alüminyum, Hatay Antakya ve Defne bölgesi başta olmak üzere tüm Hatay genelinde mimari cam ve alüminyum doğrama projelerini hayata geçiren köklü bir kuruluştur. 
              Yılların verdiği tecrübe, profesyonel ekip kadromuz ve ödün vermediğimiz kalite standartlarımızla yapılarınıza estetik, konfor ve güven katıyoruz.
            </p>
            <p className="text-xs text-[#565f69] leading-relaxed">
              Küpeşte korkuluk sistemlerinden cam balkona, otomatik kepenklerden fotoselli kapılara kadar geniş bir ürün gamında profesyonel montaj ve satış sonrası destek hizmeti sunmaktayız. 
              Gelişen teknolojiyi takip ederek, yaşam alanlarınızı daha güvenli ve fonksiyonel kılmak için çalışıyoruz.
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href="/contact"
                className="bg-[#d21920] text-white text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded hover:bg-[#d21920] hover:text-[#1a1a1a] transition-colors shadow-sm"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="lg:col-span-6 h-[450px] bg-white border border-[#dcdde2]/60 p-4 rounded shadow-sm relative overflow-hidden">
            <img
              src="https://cemasaluminyum.com/resimler/806817-slider2.jpg"
              alt="CEM-AS Alüminyum Üretim ve Montaj"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </section>

        {/* Corporate Values */}
        <section className="py-16 border-t border-[#dcdde2]/40">
          <div className="mb-16 text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">DEĞERLERİMİZ</span>
            <h2 className="font-display text-3xl font-semibold text-[#1a1a1a]">Bizi Biz Yapan İlkelerimiz</h2>
            <div className="w-12 h-0.5 bg-[#d21920] mt-4 mx-auto lg:mx-0"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-[#dcdde2]/50 p-8 rounded hover:border-[#d21920] transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-4xl text-[#d21920] mb-6 block">verified</span>
                <h3 className="font-display text-lg font-semibold text-[#1a1a1a] mb-3">{val.title}</h3>
                <p className="text-xs text-[#565f69] leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-16 border-t border-[#dcdde2]/40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-last lg:order-first h-[400px] bg-white border border-[#dcdde2]/60 p-4 rounded shadow-sm">
            <img
              src="https://cemasaluminyum.com/resimler/615317-slider1.jpg"
              alt="Hassas Cam Balkon Profil Kesimi"
              className="w-full h-full object-cover rounded"
            />
          </div>
          
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">İŞ AKIŞIMIZ</span>
            <h2 className="font-display text-3xl font-semibold text-[#1a1a1a]">Projeden Montaja Sürecimiz</h2>
            <div className="w-12 h-0.5 bg-[#d21920] mt-1 mb-4"></div>
            
            <div className="flex flex-col gap-6">
              {[
                { step: '01', title: 'Yerinde Milimetrik Keşif', desc: 'Teknik ekibimiz montaj alanını ziyaret ederek lazer ölçüm cihazlarıyla milimetrik ölçüleri alır.' },
                { step: '02', title: 'Tasarım ve Malzeme Seçimi', desc: 'Kullanılacak cam kalınlığı, profil renkleri ve mekanik donanımlar projenize özel olarak belirlenir.' },
                { step: '03', title: 'Hassas Kesim ve Montaj', desc: 'Atölyemizde CNC kesimi yapılan dayanıklı alaşımlar, usta montaj ekibimiz tarafından sahada güvenle kurulur.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <span className="font-display font-bold text-2xl text-[#d21920]">{s.step}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-1">{s.title}</h4>
                    <p className="text-xs text-[#565f69] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
