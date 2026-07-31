'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const services = [
    { name: 'Korkuluk Sistemleri', href: '/railings', icon: 'reorder' },
    { name: 'Cam Balkon', href: '/balconies', icon: 'window' },
    { name: 'Duşakabin', href: '/showers', icon: 'shower' },
    { name: 'Fotoselli Kapı', href: '/automatic-doors', icon: 'door_sliding' },
    { name: 'Otomatik Kepenk', href: '/shutters', icon: 'roller_shutter' },
    { name: 'Camekan & Doğrama', href: '/showcase-glass', icon: 'grid_view' },
  ];

  const mainLinks = [
    { name: 'Portföy', href: '/projects' },
    { name: 'Fiyat Hesapla', href: '/quote' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      
      {/* ─── TOP BAR (from cemasaluminyum.com) ─── */}
      <div className="bg-[#f7f7f7] border-b border-[#e5e7eb] text-xs py-2 w-full">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center text-[#555555]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#d21920]">call</span>
            <a href="tel:+905337747684" className="hover:text-[#d21920] font-semibold transition-colors">
              +90 533 774 7684
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/905337747684"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href="https://tr-tr.facebook.com/cemasaluminyumkorkuluksistemleri/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d21920] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.2-.8.8-.8H17V1H14c-2.8 0-5 1.8-5 4.5V8z"/>
              </svg>
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/cemashatay?igsh=c214NW9jM2t5M2po"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d21920] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] w-full">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity mr-4 shrink-0">
            <div className="flex items-center">
              <span className="font-display font-black text-lg md:text-xl tracking-tight text-[#E30613]">WİNSA</span>
            </div>
            
            <img src="/cemas-logo-round.png" alt="CEM-AS Alüminyum" className="h-8 md:h-10 w-auto object-contain rounded-full" />
            
            <div className="flex items-center">
              <span className="font-display font-black text-lg md:text-xl tracking-tight text-[#00417A]">ROYALGLASS</span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 text-[13px] md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded ${
                pathname === '/'
                  ? 'text-[#d21920]'
                  : 'text-[#1a1a1a] hover:text-[#d21920] hover:bg-gray-50'
              }`}
            >
              Anasayfa
            </Link>

            {[
              { name: 'Korkuluk', href: '/korkuluk' },
              { name: 'Merdiven Sistemleri', href: '/merdivenler' },
              { name: 'Duşakabin', href: '/dusakabin' },
              { name: 'Cam Balkon', href: '/cambalkon' },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] md:text-sm font-bold uppercase tracking-wider transition-colors duration-300 rounded ${
                    isActive
                      ? 'text-[#d21920]'
                      : 'text-[#1a1a1a] hover:text-[#d21920] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#d21920]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Trailing Action */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/quote"
              className="bg-[#d21920] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 rounded hover:bg-[#1a1a1a] transition-all duration-300 shadow-sm"
            >
              Fiyat Teklifi Al
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#1a1a1a] p-2 focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-[#e5e7eb] overflow-hidden w-full shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-bold uppercase tracking-widest py-2 border-b border-gray-100 ${
                  pathname === '/' ? 'text-[#d21920]' : 'text-[#1a1a1a]'
                }`}
              >
                Anasayfa
              </Link>

              {/* Mobile Services List */}
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Korkuluk', href: '/korkuluk' },
                  { name: 'Merdiven Sistemleri', href: '/merdivenler' },
                  { name: 'Duşakabin', href: '/dusakabin' },
                  { name: 'Cam Balkon', href: '/cambalkon' },
                ].map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs font-bold uppercase tracking-widest py-2.5 border-b border-gray-100 ${
                        isActive ? 'text-[#d21920]' : 'text-[#1a1a1a]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#d21920] text-white text-center text-[10px] font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#1a1a1a] transition-colors mt-2"
              >
                Fiyat Hesapla
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
