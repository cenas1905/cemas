'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#ebeef0] border-t border-[#c5c6cd] w-full mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-semibold text-xl tracking-tighter text-[#182232] block mb-4">
              CEMAS
            </Link>
            <p className="text-xs text-[#565f69] leading-relaxed max-w-[240px]">
              Yapısal minimalizm ve üstün mühendislik standartları ile yaşam alanlarınızı şeffaflıkla buluşturuyoruz.
            </p>
          </div>

          {/* Product Links */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#182232] mb-4">Çözümlerimiz</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/railings" className="text-xs text-[#565f69] hover:text-[#182232] transition-colors">
                  Alüminyum Korkuluk
                </Link>
              </li>
              <li>
                <Link href="/balconies" className="text-xs text-[#565f69] hover:text-[#182232] transition-colors">
                  Cam Balkon
                </Link>
              </li>
              <li>
                <Link href="/showers" className="text-xs text-[#565f69] hover:text-[#182232] transition-colors">
                  Duşakabin Sistemleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Nav & Info */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#182232] mb-4">Kurumsal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-xs text-[#565f69] hover:text-[#182232] transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-xs text-[#565f69] hover:text-[#182232] transition-colors">
                  İletişim & Teklif
                </Link>
              </li>
              <li>
                <span className="text-xs text-[#565f69] block">
                  Montaj Kılavuzu (Yakında)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#182232] mb-4">İletişim Bilgileri</h4>
            <ul className="space-y-2.5 text-xs text-[#565f69]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#182232]">call</span>
                <a href="tel:+905550000000" className="hover:text-[#182232] transition-colors">
                  +90 555 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#182232]">mail</span>
                <a href="mailto:info@cemasglass.com" className="hover:text-[#182232] transition-colors">
                  info@cemasglass.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#182232] mt-0.5">location_on</span>
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#c5c6cd]/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] text-[#565f69]">
            © {currentYear} CEMAS Structural Systems. Tüm hakları saklıdır.
          </span>
          <div className="flex gap-6">
            <span className="text-[10px] text-[#565f69] hover:text-[#182232] cursor-default transition-colors">
              Gizlilik Politikası
            </span>
            <span className="text-[10px] text-[#565f69] hover:text-[#182232] cursor-default transition-colors">
              Kullanım Koşulları
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
