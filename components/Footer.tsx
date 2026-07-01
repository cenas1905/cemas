'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Korkuluk Sistemleri', href: '/railings' },
    { name: 'Cam Balkon', href: '/balconies' },
    { name: 'Duşakabin', href: '/showers' },
    { name: 'Fotoselli Kapı', href: '/automatic-doors' },
    { name: 'Otomatik Kepenk', href: '/shutters' },
    { name: 'Camekan & Doğrama', href: '/showcase-glass' },
  ];

  const quickLinks = [
    { name: 'Portföyümüz', href: '/projects' },
    { name: 'Fiyat Hesaplayıcı', href: '/quote' },
    { name: 'Biz Kimiz', href: '/about' },
    { name: 'İletişim', href: '/contact' },
  ];

  return (
    <footer className="bg-[#0b0f19] text-white/70 border-t border-white/[0.04] pt-24 pb-12 w-full relative overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-[0.02] dot-pattern pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
        
        {/* Column 1: Brand Info */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <Link href="/" className="flex items-center bg-white p-2 rounded max-w-[180px] hover:opacity-85 transition-opacity">
            <img src="/logo.png" alt="CEM-AS Alüminyum" className="h-10 w-auto object-contain" />
          </Link>
          
          <p className="text-xs text-white/50 leading-relaxed max-w-sm">
            Hatay, Antakya ve Defne bölgelerinde yıllardır güven ve tecrübeyle alüminyum korkuluk, küpeşte, cam balkon, fotoselli kapı, otomatik kepenk ve duşakabin çözümleri sunuyoruz.
          </p>

          {/* Social media icons from old site */}
          <div className="flex gap-4">
            <a
              href="https://tr-tr.facebook.com/cemasaluminyumkorkuluksistemleri/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center text-white/70"
              aria-label="Facebook Sayfamız"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.2-.8.8-.8H17V1H14c-2.8 0-5 1.8-5 4.5V8z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/cemas.aluminyum/?hl=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center text-white/70"
              aria-label="Instagram Sayfamız"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
            Hizmetlerimiz
          </h4>
          <ul className="flex flex-col gap-3 text-xs">
            {services.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
            Hızlı Menü
          </h4>
          <ul className="flex flex-col gap-3 text-xs">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
            Kurumsal İletişim
          </h4>
          <ul className="flex flex-col gap-4 text-xs">
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-[#8a9ca7] text-base">location_on</span>
              <span className="text-white/50">
                Atatürk Bulvarı No: 124, Antakya / Hatay, Türkiye
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <span className="material-symbols-outlined text-[#8a9ca7] text-base">call</span>
              <a href="tel:+905337747684" className="text-white hover:text-[#8a9ca7] font-semibold transition-colors">
                +90 533 774 7684
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <span className="material-symbols-outlined text-[#8a9ca7] text-base">mail</span>
              <a href="mailto:info@cemasaluminyum.com" className="hover:text-white transition-colors">
                info@cemasaluminyum.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/40">
        <div>
          Copyright &copy; {currentYear} CEM-AS Alüminyum. Tüm hakları saklıdır.
        </div>
        <div className="flex gap-6">
          <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
          <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
        </div>
      </div>
    </footer>
  );
}
