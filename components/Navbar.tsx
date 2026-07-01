'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Korkuluk', href: '/railings' },
    { name: 'Cam Balkon', href: '/balconies' },
    { name: 'Duşakabin', href: '/showers' },
    { name: 'Portföy', href: '/projects' },
    { name: 'Fiyat Hesapla', href: '/quote' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fafafa]/90 backdrop-blur-md border-b border-[#dcdde2]/40 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        
        {/* Brand Logo */}
        <Link href="/" className="font-display font-semibold text-2xl tracking-tighter text-[#0b0f19] hover:opacity-85 transition-opacity">
          CEMAS
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 rounded ${
                  isActive
                    ? 'text-[#0b0f19] font-bold'
                    : 'text-[#565f69] hover:text-[#0b0f19] hover:bg-[#f0f1f4]/60'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBorder"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0b0f19]"
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
            className="bg-[#0b0f19] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded hover:bg-[#8a9ca7] hover:text-[#0b0f19] transition-all duration-300 shadow-sm"
          >
            Hızlı Teklif
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#0b0f19] p-2 focus:outline-none"
          aria-label="Menüyü Aç/Kapat"
        >
          <span className="material-symbols-outlined text-[28px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#fafafa] border-b border-[#dcdde2]/40 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs font-semibold uppercase tracking-widest py-2.5 border-b border-[#dcdde2]/20 ${
                      isActive ? 'text-[#0b0f19] font-bold' : 'text-[#565f69]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#0b0f19] text-white text-center text-[10px] font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#8a9ca7] transition-colors mt-2"
              >
                Hızlı Teklif Al
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
