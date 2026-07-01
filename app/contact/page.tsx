'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#0b0f19] antialiased">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 w-full flex-grow flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">
            İLETİŞİM BİLGİLERİ
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-[#0b0f19]">
            Bizimle İletişime Geçin
          </h1>
          <div className="w-12 h-0.5 bg-[#8a9ca7] mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Details & Form */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-12">
            
            {/* Details Card */}
            <div className="bg-white border border-[#dcdde2]/60 p-8 rounded shadow-sm flex flex-col gap-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-[#0b0f19] mb-4">
                  Merkez Showroom
                </h3>
                <p className="text-xs text-[#565f69] leading-relaxed max-w-sm">
                  Atatürk Bulvarı, No: 124, Minimalist Mimarlık Plaza, Kat: 3, Şişli / İstanbul, Türkiye
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs text-[#565f69]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#8a9ca7] text-[18px]">call</span>
                  <a href="tel:+905550000000" className="hover:text-[#0b0f19] transition-colors font-semibold">
                    +90 555 000 0000
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#8a9ca7] text-[18px]">mail</span>
                  <a href="mailto:info@cemasglass.com" className="hover:text-[#0b0f19] transition-colors font-semibold">
                    info@cemasglass.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#8a9ca7] text-[18px]">schedule</span>
                  <span>Hafta İçi: 09:00 - 18:00 | Cmt: 09:00 - 14:00</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="bg-white border border-[#dcdde2]/60 p-8 rounded shadow-sm flex-grow flex flex-col justify-center">
              <h3 className="font-display text-lg font-semibold text-[#0b0f19] mb-4">
                Mesaj Gönderin
              </h3>
              
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSend}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Adınız Soyadınız"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#0b0f19]"
                    />
                    <input
                      type="email"
                      placeholder="E-posta Adresiniz"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#0b0f19]"
                    />
                    <textarea
                      placeholder="Mesajınız..."
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#0b0f19]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#0b0f19] text-white hover:bg-[#8a9ca7] hover:text-[#0b0f19] transition-all duration-300 py-3.5 rounded text-xs font-semibold uppercase tracking-widest mt-1"
                    >
                      Mesajı İletin
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 flex flex-col items-center"
                  >
                    <span className="material-symbols-outlined text-4xl text-green-500 mb-3">done_all</span>
                    <h4 className="font-display text-base font-semibold text-[#0b0f19] mb-2">Mesajınız Alındı!</h4>
                    <p className="text-xs text-[#565f69] leading-relaxed mb-6 max-w-xs">
                      Sayın {name}, mesajınız başarıyla kaydedilmiştir. Müşteri ilişkileri ekibimiz verdiğiniz e-posta üzerinden en kısa sürede dönüş sağlayacaktır.
                    </p>
                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="border border-[#0b0f19] text-[#0b0f19] text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded hover:bg-[#f0f1f4]"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Premium Map Placeholder */}
          <div className="lg:col-span-6 bg-white border border-[#dcdde2]/60 rounded p-6 shadow-sm flex flex-col justify-between relative min-h-[450px]">
            <div className="w-full h-full relative overflow-hidden rounded dot-pattern flex flex-col items-center justify-center bg-[#fafafa]">
              {/* Abstract premium grid overlay mimicking a vector map */}
              <div className="absolute top-1/3 left-1/4 w-3/4 h-0.5 bg-[#dcdde2]/60 transform rotate-12" />
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#dcdde2]/60 transform -rotate-6" />
              <div className="absolute top-0 left-2/3 w-0.5 h-full bg-[#dcdde2]/60 transform rotate-4" />
              
              {/* Map pin */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                <span className="material-symbols-outlined text-5xl text-[#0b0f19]">location_on</span>
                <div className="w-8 h-2 bg-[#0b0f19]/10 rounded-full blur-[2px] mt-1" />
              </motion.div>

              <div className="relative z-10 mt-6 text-center">
                <span className="text-[10px] font-bold text-[#0b0f19] uppercase tracking-wider block">Harita Yer Tutucu</span>
                <span className="text-[9px] text-[#565f69] max-w-[200px] block mt-1 leading-relaxed">
                  İstanbul Şişli merkez ofisimiz. Canlı harita API entegrasyonu için hazır konum kartı.
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
