'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Konforlu Cam Balkon',
      subtitle: 'Estetik bütünlüğü ve fonksiyonelliği mükemmel şekilde birleştirir.',
      img: 'https://cemasaluminyum.com/resimler/615317-slider1.jpg',
      href: '/balconies',
    },
    {
      title: 'Güvenli Korkuluk Sistemleri',
      subtitle: 'Merdivenlere, balkonlara, teraslara yapısal emniyet katar.',
      img: 'https://cemasaluminyum.com/resimler/806817-slider2.jpg',
      href: '/railings',
    },
    {
      title: 'Kaliteli ve Şık Duşakabinler',
      subtitle: 'Banyolarınıza modern şıklık ve zarafet getiren çözümler.',
      img: 'https://cemasaluminyum.com/resimler/222815-slider3.jpg',
      href: '/showers',
    },
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      title: 'Cam Balkon',
      desc: 'CEM-AS Alüminyum estetik bütünlüğü ve fonksiyonelliği mükemmel şekilde birleştirir.',
      img: 'https://cemasaluminyum.com/img/cambalkon.jpg',
      href: '/balconies',
    },
    {
      title: 'Korkuluk Sistemleri',
      desc: 'Merdivenlere, balkonlara, teraslara ve yapıların birçok bölümüne güven ve şıklık katan küpeşte çözümleri.',
      img: 'https://cemasaluminyum.com/img/korkuluk.jpg',
      href: '/railings',
    },
    {
      title: 'Fotoselli Kapı',
      desc: 'Farklı mimari yapılarda elegant görünüme kavuşmanız otomatik cam kapılarla artık çok kolay!',
      img: 'https://cemasaluminyum.com/img/fotosel.jpg',
      href: '/automatic-doors',
    },
    {
      title: 'Duşakabin',
      desc: 'Banyolarınıza özel ölçülerde üretilen temperli camlı, modern sızdırmaz lüks duşakabin çözümleri.',
      img: 'https://cemasaluminyum.com/img/dusakabin.jpg',
      href: '/showers',
    },
    {
      title: 'Otomatik Kepenk',
      desc: 'Güvenli kapılar olmasının yanı sıra hem estetik hem de son derece kullanışlı kepenk sistemleri.',
      img: 'https://cemasaluminyum.com/img/kepenk.jpg',
      href: '/shutters',
    },
    {
      title: 'Camekan & Doğrama',
      desc: 'Mağaza vitrinleri ve iş yerleri için modern cam cephe, camekan ve dayanıklı alüminyum doğramalar.',
      img: 'https://cemasaluminyum.com/img/camekan.jpg',
      href: '/showcase-glass',
    },
  ];

  const references = [
    'Botaş A.Ş.',
    'Step Asansörleri',
    'Özel Deniz Hastanesi',
    'Özel Defne Hastanesi',
    'Akdeniz Otel',
    'Saray Otel',
    'Lamistik Kafe',
    'Daplan İnşaat',
  ];

  const testimonials = [
    {
      quote: 'Hatay Antakya ve defne bölgesinde duşa kabin sistemleri ile uygun fiyata ve zamanında teslim sunan bir firma 👍🏻',
      author: 'Buse Dede',
    },
    {
      quote: 'Hatay Antakya cam balkon ve alüminyum korkuluk Hizmetleri ile güvenilir ve hızlı hizmet sunan bir firma 👍🏼',
      author: 'Feride Seçil Dede',
    },
    {
      quote: 'Elinize sağlık, çok temiz ve kaliteli bir işçilik çıkardınız.',
      author: 'Hakan Mansuroğlu',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a] antialiased">
      <Navbar />

      {/* Hero Carousel */}
      <section className="relative h-[90vh] min-h-[550px] pt-20 overflow-hidden w-full bg-[#1a1a1a]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              src={slides[activeSlide].img}
              alt={slides[activeSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient only on the left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="max-w-2xl text-left bg-[#1a1a1a]/40 backdrop-blur-md p-8 md:p-12 border border-white/5 rounded-2xl shadow-2xl">
            <motion.span
              key={`span-${activeSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#d21920] px-3.5 py-1.5 rounded border border-transparent mb-6 inline-block"
            >
              CEM-AS ALÜMİNYUM GÜVENCESİ
            </motion.span>
            
            <motion.h2
              key={`h2-${activeSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4"
            >
              {slides[activeSlide].title}
            </motion.h2>

            <motion.p
              key={`p-${activeSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm text-white/80 max-w-lg mb-8 leading-relaxed"
            >
              {slides[activeSlide].subtitle}
            </motion.p>

            <motion.div
              key={`div-${activeSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex gap-4"
            >
              <Link
                href={slides[activeSlide].href}
                className="bg-[#d21920] text-white hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded shadow-lg"
              >
                Hizmeti İncele
              </Link>
              <Link
                href="/quote"
                className="bg-white/10 text-white hover:bg-[#d21920] hover:text-white border border-white/20 hover:border-transparent transition-all duration-300 text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded"
              >
                Fiyat Al
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-8 h-1 rounded transition-all duration-300 ${
                activeSlide === idx ? 'bg-[#d21920] w-12' : 'bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Grid (6 services from cemasaluminyum.com) */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#d21920] block mb-2">HİZMETLERİMİZ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">Faaliyet Alanlarımız</h2>
          <p className="text-sm text-[#555555] mt-3 leading-relaxed">
            Hatay genelinde titiz işçilik ve kaliteli hammadde ile uyguladığımız alüminyum ve cam yapı çözümlerimiz.
          </p>
          <div className="w-12 h-0.5 bg-[#d21920] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 p-6 flex flex-col justify-between hover:border-[#d21920] hover:shadow-lg transition-all duration-300 rounded"
            >
              <div>
                <div className="h-56 mb-6 overflow-hidden bg-gray-50 rounded-sm relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#1a1a1a] group-hover:text-[#d21920] transition-colors mb-2">{service.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed mb-6">{service.desc}</p>
              </div>

              <Link
                href={service.href}
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#d21920] hover:text-[#1a1a1a] border-t border-gray-100 pt-4"
              >
                Detayları Gör <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Simulator CTA Banner */}
      <section className="bg-white border-y border-gray-200 py-20 w-full relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d21920] block mb-2">HIZLI TEKLİF HESAPLA</span>
            <h2 className="font-display text-3xl font-bold text-[#1a1a1a] mb-4">Cam ve Korkuluk Maliyetinizi Simüle Edin</h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              Özel ölçülerinizi girip cam ve profil seçimlerinizi yaparak projenizin tahmini fiyat teklifini anında hesaplayın.
            </p>
          </div>
          <Link
            href="/quote"
            className="bg-[#d21920] text-white hover:bg-[#1a1a1a] transition-all duration-300 text-xs font-bold uppercase tracking-widest px-10 py-5 rounded shadow-lg"
          >
            Fiyat Hesaplayıcıyı Başlat
          </Link>
        </div>
      </section>

      {/* References Grid Section */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d21920] mb-2 block">MİMARİ GÜVEN</span>
              <h2 className="font-display text-3xl font-bold text-[#1a1a1a]">Referanslarımız</h2>
            </div>
            <p className="text-sm text-[#555555] leading-relaxed">
              Hatay ve çevre illerde gururla tamamladığımız, kalitemizi ve teknik tecrübemizi tescilleyen kurumsal projelerimizden bazıları.
            </p>
            <div className="flex gap-6 items-center mt-2 border-t border-gray-200 pt-6">
              <a href="https://kupeks.com/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                <img
                  src="https://cemasaluminyum.com/img/kupeks.png"
                  alt="Küpeşte Aksesuarları Ortağı"
                  className="h-10 object-contain"
                />
              </a>
              <span className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">MÜHENDİSLİK PARTNERİMİZ</span>
            </div>
          </div>

          {/* References Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {references.map((ref, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-4 rounded text-center shadow-sm flex items-center justify-center min-h-[90px] hover:border-[#d21920] transition-colors"
              >
                <span className="text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider">{ref}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials (Hatay Antakya Reviews) */}
      <section className="py-24 bg-white border-t border-gray-200 w-full">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d21920] block mb-2">MÜŞTERİ YORUMLARI</span>
            <h2 className="font-display text-3xl font-bold text-[#1a1a1a]">Bizim İçin Ne Dediler?</h2>
            <div className="w-12 h-0.5 bg-[#d21920] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-150 p-8 rounded flex flex-col justify-between h-full relative">
                <span className="material-symbols-outlined text-4xl text-[#d21920]/10 absolute top-4 right-4 pointer-events-none">format_quote</span>
                <p className="text-xs text-[#555555] leading-relaxed mb-6 font-normal italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3 border-t border-gray-200/50 pt-4">
                  {/* Small profile icon */}
                  <div className="w-8 h-8 rounded-full bg-[#d21920] text-white flex items-center justify-center text-xs font-bold font-display">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <strong className="text-xs text-[#1a1a1a] block">{t.author}</strong>
                    <span className="text-[9px] text-[#555555] uppercase tracking-wider">Hatay, Antakya</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Support Button */}
      <a
        href="https://wa.me/905337747684"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128c7e] transition-all duration-300 hover:scale-110 hover:-rotate-6"
        aria-label="WhatsApp Destek Hattı"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.25 8.477 3.522 2.263 2.27 3.507 5.289 3.505 8.492-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.023-5.11-2.884-6.974C16.53 1.91 14.053.886 11.417.886c-5.442 0-9.87 4.421-9.874 9.86-.001 1.76.48 3.48 1.395 4.975L1.925 21.147l5.885-1.541zM19.1 17.292c-.33-.165-1.951-.963-2.282-1.083-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.75.105-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.643-1.953-1.835-2.283-.19-.33-.02-.509.145-.674.15-.149.33-.36.495-.54.165-.18.22-.3.33-.51.11-.21.055-.39-.027-.552-.083-.162-.81-1.951-1.11-2.673-.293-.705-.592-.609-.81-.62-.21-.01-.45-.012-.69-.012-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .001 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.155 5.44.86.37 1.53.59 2.05.75.86.27 1.64.23 2.26.14.69-.1 1.95-.8 2.22-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.385z"/>
        </svg>
      </a>

      <Footer />
    </div>
  );
}
