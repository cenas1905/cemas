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
    if (!name || !message) {
      alert('Lütfen adınızı ve mesajınızı doldurun.');
      return;
    }
    const text = encodeURIComponent(
      `Merhaba, ben ${name}.\n${email ? `E-posta: ${email}\n` : ''}Mesaj: ${message}`
    );
    window.open(`https://wa.me/905337747684?text=${text}`, '_blank');
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 w-full flex-grow flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">
            İLETİŞİM BİLGİLERİ
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-[#1a1a1a]">
            Bizimle İletişime Geçin
          </h1>
          <div className="w-12 h-0.5 bg-[#d21920] mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Details & Form */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-12">
            
            {/* Details Card */}
            <div className="bg-white border border-[#dcdde2]/60 p-8 rounded shadow-sm flex flex-col gap-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-[#1a1a1a] mb-4">
                  CEM-AS Alüminyum Merkez Ofis
                </h3>
                <p className="text-xs text-[#565f69] leading-relaxed max-w-sm">
                  Atatürk Bulvarı No: 124, Antakya / Hatay, Türkiye
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs text-[#565f69]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#d21920] text-[18px]">call</span>
                  <a href="tel:+905337747684" className="hover:text-[#1a1a1a] transition-colors font-semibold">
                    +90 533 774 7684
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#d21920] text-[18px]">mail</span>
                  <a href="mailto:info@cemasaluminyum.com" className="hover:text-[#1a1a1a] transition-colors font-semibold">
                    info@cemasaluminyum.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#d21920] text-[18px]">schedule</span>
                  <span>Hafta İçi: 09:00 - 18:00 | Cumartesi: 09:00 - 14:00</span>
                </div>
              </div>

              {/* Social media connections */}
              <div className="flex gap-4 border-t border-[#dcdde2]/20 pt-6">
                <a
                  href="https://tr-tr.facebook.com/cemasaluminyumkorkuluksistemleri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f0f1f4] text-[#565f69] hover:bg-[#d21920] hover:text-white transition-colors text-xs font-semibold px-4 py-2 rounded flex items-center gap-2"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/cemas.aluminyum/?hl=tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f0f1f4] text-[#565f69] hover:bg-[#d21920] hover:text-white transition-colors text-xs font-semibold px-4 py-2 rounded flex items-center gap-2"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="bg-white border border-[#dcdde2]/60 p-8 rounded shadow-sm flex-grow flex flex-col justify-center">
              <h3 className="font-display text-lg font-semibold text-[#1a1a1a] mb-4">
                Bize Ulaşın
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
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                    />
                    <input
                      type="email"
                      placeholder="E-posta Adresiniz"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                    />
                    <textarea
                      placeholder="Mesajınız..."
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#d21920] text-white hover:bg-[#d21920] hover:text-[#1a1a1a] transition-all duration-300 py-3.5 rounded text-xs font-semibold uppercase tracking-widest mt-1"
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
                    <h4 className="font-display text-base font-semibold text-[#1a1a1a] mb-2">Mesajınız Alındı!</h4>
                    <p className="text-xs text-[#565f69] leading-relaxed mb-6 max-w-xs">
                      Sayın {name}, mesajınız başarıyla kaydedilmiştir. Müşteri ekibimiz en kısa sürede dönüş sağlayacaktır.
                    </p>
                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="border border-[#d21920] text-[#1a1a1a] text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded hover:bg-[#f0f1f4]"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-6 bg-white border border-[#dcdde2]/60 rounded shadow-sm overflow-hidden flex flex-col min-h-[450px]">
            <div className="p-4 border-b border-[#dcdde2]/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69]">KONUMUMUZ</span>
              <p className="text-xs text-[#565f69] mt-1">Antakya / Hatay — Showroom Ziyareti</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12841.023395270086!2d36.1479!3d36.2021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152f65e0b8d7d44f%3A0x3e8b1e7d1b6f8a3!2sAntakya%2C%20Hatay!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', flexGrow: 1 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CEM-AS Alüminyum Konum - Antakya, Hatay"
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
