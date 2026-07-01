'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const stats = [
    { number: '25+', label: 'YILLIK MÜHENDİSLİK DENEYİMİ' },
    { number: '3,200+', label: 'TAMAMLANAN CAM BALKON' },
    { number: '180+', label: 'PRESTİJLİ MİMARİ PROJE' },
    { number: '%100', label: 'ÖLÇÜ VE MONTAJ MEMNUNİYETİ' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#0b0f19] antialiased">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[92vh] min-h-[650px] flex items-center pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxFVuMwLX6ShmyjxX7EVH3gOyDkejyBMb1AZqQAp4BF9tTNL5YwOShmHAM94nTree63qM9tRQ1nTA3ax7QYGnDdtRqNmnwnsxzwXj3RmNZrYqUPGjjhUJy5E0XB1JGsowWFzgAZtiQ7viu1kvArpFxuMoJ1_RJjakzyMrCKjudCmRZTu-vg_dGaKkVj8cp525di_-I7yLsqypPxDcMgiwPQnCUnV0xflsTlS4kkf3zzhnWqQ-qjHFJ9Q"
            alt="CEMAS Lüks Cam Sistemleri"
            className="w-full h-full object-cover"
          />
          {/* Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-[#fafafa]/20 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa]/90 via-[#fafafa]/45 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] border border-[#dcdde2] px-3.5 py-1.5 bg-white/70 rounded-full mb-6"
            >
              MİMARİ TASARIM & MÜHENDİSLİK
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl text-[#0b0f19] tracking-tight leading-[1.05] mb-6"
            >
              Mimari Şıklık,<br />
              <span className="text-[#8a9ca7]">Güçlü Çözümler.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="text-base md:text-lg text-[#565f69] font-normal leading-relaxed max-w-xl mb-10"
            >
              Yüksek mühendislik standartlarıyla üretilmiş alüminyum ve cam yapısal sistemleri. Yaşam alanlarınıza şeffaflık, güvenlik ve estetik katıyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex gap-4 flex-wrap"
            >
              <Link
                href="/quote"
                className="bg-[#0b0f19] text-white hover:bg-[#8a9ca7] hover:text-[#0b0f19] transition-all duration-300 text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded shadow-md"
              >
                Fiyat Teklifi Al
              </Link>
              <Link
                href="/projects"
                className="border border-[#0b0f19] text-[#0b0f19] hover:bg-[#0b0f19] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded"
              >
                Projelerimizi Görün
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-[#dcdde2]/50 py-12 w-full">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-display font-semibold text-3xl md:text-4xl text-[#0b0f19]">{stat.number}</span>
                <span className="text-[9px] font-bold text-[#565f69] uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 md:py-32 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] block mb-2">CEMAS ÇÖZÜMLERİ</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0b0f19]">Hizmet Alanlarımız</h2>
          </div>
          <p className="text-sm text-[#565f69] max-w-md leading-relaxed">
            Minimalist detaylar, yüksek yalıtım standartları ve dayanıklılık sunan premium yapı gruplarımız.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Alüminyum Korkuluk */}
          <motion.div variants={itemVariants} className="group bg-white border border-[#dcdde2]/50 p-8 flex flex-col h-full hover:border-[#0b0f19] hover:shadow-lg transition-all duration-300">
            <div className="h-60 mb-6 overflow-hidden bg-[#ebeef0] rounded-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDCKUzKXFYCaXCalYTFOgreZV1D0nNoUiqq-d1N7Fa6rErBJR283gEF4WD3X6n5uWqD_5DWCyHsLOWJgLZPxTI05M5UlQe94SSV1PZjNRWmgs0zHbt-u_7vqH-4LEhj3aPybXGUyEUo6uibkbJFdOccaHHDnNtfJV1GMiBX8NutgTwPuHK6ui84t7Eo9A9FH0DnrneIacSlCvcz9pdNjThZN5TbrwRwI_cZGWlepXezDp5J_-56qGeCg"
                alt="Alüminyum Korkuluk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#0b0f19] mb-3">Korkuluk Sistemleri</h3>
            <p className="text-sm text-[#565f69] leading-relaxed mb-6 flex-grow">
              Modern mimariye uygun, hafif, dayanıklı, emniyetli ve asimetrik tasarımlara sahip camlı alüminyum korkuluk çözümleri.
            </p>
            <Link
              href="/railings"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#0b0f19] hover:opacity-85 mt-auto"
            >
              Kategorileri İncele <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </motion.div>

          {/* Cam Balkon */}
          <motion.div variants={itemVariants} className="group bg-white border border-[#dcdde2]/50 p-8 flex flex-col h-full hover:border-[#0b0f19] hover:shadow-lg transition-all duration-300">
            <div className="h-60 mb-6 overflow-hidden bg-[#ebeef0] rounded-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPGt4q6HwJvh2BNwvwuofDb1l7fJQjB5YBrtTSXU9aZAYi3S-i4EXBBdTbNS1isxAgeuswK62tyeIaJmTP1euF4WHzbnThPvIkkJ9TOX8ATpICv-t9cb21NpGNMmcdbPKNrhJGiMnKCLlzVPQs1Ub2zImXJap7F0juKZOLnxDotkDVgtbE62V__aKMrENZxnL66aEe_TvHVqC_8lrCk1LJPt0iFkm540R6bt8Tim5ymkUpMcv3Nk-6LA"
                alt="Cam Balkon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#0b0f19] mb-3">Cam Balkon Sistemleri</h3>
            <p className="text-sm text-[#565f69] leading-relaxed mb-6 flex-grow">
              Manzaranızı engellemeden ekstra konfor alanı katan, katlanır, sürgülü ve motorlu giyotin cam kapatma çözümleri.
            </p>
            <Link
              href="/balconies"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#0b0f19] hover:opacity-85 mt-auto"
            >
              Kategorileri İncele <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </motion.div>

          {/* Duşakabin */}
          <motion.div variants={itemVariants} className="group bg-white border border-[#dcdde2]/50 p-8 flex flex-col h-full hover:border-[#0b0f19] hover:shadow-lg transition-all duration-300">
            <div className="h-60 mb-6 overflow-hidden bg-[#ebeef0] rounded-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCENAEPG5gbwNE2dDZx0lcK1sm2J4hDSDt3qvHrt32v4GGsY9d23oasX19PyQpPX9zoKpSoUS0thA4W6u9laPxPr1UdfDs56EPpQdmVVfnpq74ibB4TsSq7-J0aCT6n9LuEppYYuaXddrZdBKaQdyKzm0uMgK37rHHCZXsMQodHEGPhybeqTGNrgwHuglRZvoFoTEqugFS-RYujRPWOjZlW7Mk3CeDY1yNW8it8_GoDUUUXaztPcREqfA"
                alt="Duşakabin"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#0b0f19] mb-3">Duşakabin Ürünleri</h3>
            <p className="text-sm text-[#565f69] leading-relaxed mb-6 flex-grow">
              Banyolarınıza zerafet getiren, mat siyah profil, pirinç menteşe ve temperli lüks cam alternatifli duş kabinleri.
            </p>
            <Link
              href="/showers"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#0b0f19] hover:opacity-85 mt-auto"
            >
              Kategorileri İncele <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Simulator CTA Banner */}
      <section className="bg-white border-y border-[#dcdde2]/50 py-20 w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dot-pattern" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] block mb-2">İNTERAKTİF HESAPLAMA</span>
            <h2 className="font-display text-3xl font-semibold text-[#0b0f19] mb-4">Cam Sisteminizin Maliyetini Şimdi Öğrenin</h2>
            <p className="text-sm text-[#565f69] leading-relaxed">
              Özel ölçülerinizi girin, cam kalınlığı ve profil tipini seçin, sistemimiz size anında yaklaşık maliyet tahmini çıkarsın.
            </p>
          </div>
          <Link
            href="/quote"
            className="bg-[#0b0f19] text-white hover:bg-[#8a9ca7] hover:text-[#0b0f19] transition-all duration-300 text-xs font-semibold uppercase tracking-widest px-10 py-5 rounded shadow-lg whitespace-nowrap"
          >
            Fiyat Simülatörünü Aç
          </Link>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-24 md:py-32 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] block mb-2">Kalite Taahhüdümüz</span>
            <h2 className="font-display text-3xl font-semibold text-[#0b0f19] mb-6">Mimari Detaylardaki Mükemmellik</h2>
            <p className="text-sm text-[#565f69] leading-relaxed mb-6">
              Bizim için cam ve alüminyum sadece malzeme değil, binanın kimliğini tamamlayan ışık ve hacim elemanlarıdır. 
              Mimari mühendislik yaklaşımımız, korozyona dayanıklı eloksal kaplama alaşımları ve lamine edilmiş güvenli camları bir araya getirerek zamansız tasarımlar kurar.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8a9ca7] text-[20px]">verified_user</span>
                <span className="text-xs font-semibold text-[#0b0f19]">CE & TSE Standartlarına Tam Uyumlu</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#8a9ca7] text-[20px]">architecture</span>
                <span className="text-xs font-semibold text-[#0b0f19]">Projeye Özel Milimetrik Çizimler</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[480px] border border-[#dcdde2]/80 bg-white p-4 shadow-sm"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx0xvPKqzG_pZAxTMcA235TOvq_o3oZEPXpDqH1bYZ64jcbkEwy0pJz6TPowA5z9zvZ6v0L3xw4CDXtJN31ry0qcNnqWUe5NyKNyOrfQXjCj0KCQRF3aGPHPbau0vcQGEkWzrm_OtqgeXmJnJTStSNnDbhQVlY1nxkkFRvxtcwxNDtWRKuiWM0s-Mu3cTTQ7B3OanmATGegnFIOp6yniaooYBavKUZ6E7cnr0hvWL6zI-PEELnQGAUPQ"
              alt="Hassas malzeme kesişim profili"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
