'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f7fafc] text-[#181c1e] antialiased">
      {/* Navigation Header */}
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 md:py-24 pt-24 md:pt-32 flex flex-col gap-24 md:gap-32">
        
        {/* Hero Section */}
        <section className="relative rounded-lg overflow-hidden border border-[#c5c6cd]/50 h-[60vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQZ-4GaRnPlmsdtTJP2s04Fw1DNtbiBr0Q2CWE8dyFqYnhaTr7lEJlykbK4I_gID26tiiIKcJpUnSBc_W6KD8UzGAXH4rfln7otfr1GERtaJ9_AcbKKx0CMT2ZcWKvd-ztLk3Id4wbJ65ihEr5lrUw-0LMoOFsc0PTsM1AGvXHVi3DpccpVXxCGhhIlc3XDx10TrJS6uGGp5_jJ_X7DCEHkch3cKRkMmEK62mwEtlnXZOp57EMlqeotw')" }}></div>
          <div className="absolute inset-0 bg-[#f7fafc]/25 backdrop-blur-[1px]"></div>
          
          <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 md:p-12 text-center max-w-2xl mx-4 border border-[#c5c6cd]/40 rounded shadow-sm">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-semibold text-3xl md:text-4xl text-[#182232] mb-6"
            >
              Yapısal Mükemmellik,<br/>Mimari Hassasiyet
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-sm md:text-base text-[#565f69] leading-relaxed"
            >
              CEMAS olarak, modern mimarinin sınırlarını zorlayan birinci sınıf alüminyum ve cam yapısal sistemler tasarlıyor ve üretiyoruz. Estetik ve mühendisliği şeffaflıkla birleştiriyoruz.
            </motion.p>
          </div>
        </section>

        {/* Mission & Values Bento */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-8 bg-white border border-[#c5c6cd]/50 p-8 rounded flex flex-col justify-center shadow-sm"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-4">Hikayemiz</span>
            <h2 className="text-2xl font-semibold text-[#182232] mb-4">Mühendislikten Sanata Dönüşüm</h2>
            <p className="text-sm text-[#565f69] leading-relaxed mb-8">
              Yılların getirdiği mühendislik uzmanlığıyla kurulan CEMAS, yapısal güvenliği estetik bir dille yeniden tanımlama vizyonuyla yola çıktı. 
              Ürettiğimiz her korkuluk, her balkon sistemi, sadece bir yapı elemanı değil; ışığı, mekanı ve güvenliği kusursuz bir uyumla bir araya getiren mimari bir ifadedir. 
              Müşteri memnuniyetini merkeze alan yaklaşımımızla, projelerinize değer katıyoruz.
            </p>
            
            <div className="flex gap-8 border-t border-[#c5c6cd]/30 pt-6 mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#182232]">20+</span>
                <span className="text-[9px] font-bold text-[#565f69] uppercase tracking-wider">Yıllık Deneyim</span>
              </div>
              <div className="w-px bg-[#c5c6cd]/50" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#182232]">10k+</span>
                <span className="text-[9px] font-bold text-[#565f69] uppercase tracking-wider">Tamamlanan Proje</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-4 bg-white border border-[#c5c6cd]/50 p-8 rounded flex flex-col gap-6 justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-6 block">Değerlerimiz</span>
              
              <div className="flex items-start gap-4 mb-6">
                <span className="material-symbols-outlined text-[#182232]">architecture</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#182232] mb-1">Hassas Tasarım</h3>
                  <p className="text-xs text-[#565f69]">Milimetrik doğrulukla şekillenen detaylar.</p>
                </div>
              </div>
              
              <div className="h-px bg-[#c5c6cd]/30 mb-6" />
              
              <div className="flex items-start gap-4 mb-6">
                <span className="material-symbols-outlined text-[#182232]">verified</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#182232] mb-1">Ödünsüz Kalite</h3>
                  <p className="text-xs text-[#565f69]">En üst sınıf alüminyum ve temperli cam.</p>
                </div>
              </div>
              
              <div className="h-px bg-[#c5c6cd]/30 mb-6" />
              
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#182232]">handshake</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#182232] mb-1">Güvenilirlik</h3>
                  <p className="text-xs text-[#565f69]">Zamanında teslimat ve müşteri odaklılık.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Manufacturing Process */}
        <section className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">Süreç</span>
            <h2 className="text-3xl font-semibold text-[#182232]">Üretim Standartlarımız</h2>
            <div className="w-12 h-0.5 bg-[#565f69] mx-auto mt-4"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Step 1 */}
            <motion.div variants={itemVariants} className="bg-white border border-[#c5c6cd]/50 p-8 rounded flex flex-col hover:border-[#182232] transition-colors shadow-sm">
              <div className="w-12 h-12 rounded bg-[#ebeef0] flex items-center justify-center mb-6 border border-[#c5c6cd]/30">
                <span className="material-symbols-outlined text-[#182232]">precision_manufacturing</span>
              </div>
              <h3 className="text-lg font-semibold text-[#182232] mb-3">1. Endüstriyel Üretim</h3>
              <p className="text-xs text-[#565f69] leading-relaxed">
                Modern tesislerimizde, CNC destekli makinelerle alüminyum profiller kusursuz bir şekilde milimetrik işlenir.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} className="bg-white border border-[#c5c6cd]/50 p-8 rounded flex flex-col hover:border-[#182232] transition-colors shadow-sm">
              <div className="w-12 h-12 rounded bg-[#ebeef0] flex items-center justify-center mb-6 border border-[#c5c6cd]/30">
                <span className="material-symbols-outlined text-[#182232]">category</span>
              </div>
              <h3 className="text-lg font-semibold text-[#182232] mb-3">2. Malzeme Seçimi</h3>
              <p className="text-xs text-[#565f69] leading-relaxed">
                Sadece en yüksek dayanıklılığa sahip anodik korumalı alüminyum ve lamine/temperli güvenli cam kullanıyoruz.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="bg-white border border-[#c5c6cd]/50 p-8 rounded flex flex-col hover:border-[#182232] transition-colors shadow-sm">
              <div className="w-12 h-12 rounded bg-[#ebeef0] flex items-center justify-center mb-6 border border-[#c5c6cd]/30">
                <span className="material-symbols-outlined text-[#182232]">check_circle</span>
              </div>
              <h3 className="text-lg font-semibold text-[#182232] mb-3">3. Kalite Kontrol</h3>
              <p className="text-xs text-[#565f69] leading-relaxed">
                Her bir ürünümüz, yapısal bütünlük ve estetik kusursuzluk açısından titiz kalite denetimlerinden geçer.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Showroom CTA Section */}
        <section className="bg-[#182232] text-white rounded-lg overflow-hidden flex flex-col md:flex-row relative border border-[#c5c6cd]/10 shadow">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="p-8 md:p-16 flex-1 flex flex-col justify-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Kaliteyi Yakından İnceleyin</h2>
            <p className="text-sm text-white/80 mb-8 max-w-md leading-relaxed">
              Showroom'umuzu ziyaret ederek, CEMAS ürünlerinin dokusunu, malzeme kalitesini ve yapısal üstünlüğünü bizzat deneyimleyin. Uzman ekibimiz projeniz için en iyi çözümü sunmaya hazır.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="bg-white text-[#182232] font-semibold text-xs uppercase tracking-widest px-6 py-4 rounded cursor-default transition-colors">
                Showroom İstanbul
              </span>
              <a href="/#contact" className="border border-white text-white text-xs font-semibold uppercase tracking-widest px-6 py-4 rounded hover:bg-white/10 transition-colors text-center">
                İletişime Geç
              </a>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] border-t md:border-t-0 md:border-l border-white/10">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9lwy_-nmQlChnFMYy8bs8h79NO5nf5puGfXF1KT5OqcaADTTX9uYpJEKOuCahYu9dbdSt3F77wYZofnEgHW_YnmzUThbIvrIMg23LVV8QBAvxA1M-MlvwnkDv3cho_gITMb-uAieEovSMna3GJz_ETMsj3Aa4YubokjnNTL4I1bmEJ8oWaaOhgQF-LZHEna1KkmJ0iv2SLT-E2aOzY1gSPFqEgUFiAB2WiMAM9xBGlT2Q5GnMGuLuvg')" }}
            ></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
