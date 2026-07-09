'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function KorkulukPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
    
    fetch('/api/products?category=korkuluk')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white antialiased">
      <Navbar />

      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a] pt-20">
        <img 
          src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1920&auto=format&fit=crop" 
          alt="Alüminyum Korkuluk" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-4 block">GÜVENLİK & ESTETİK</span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">ALÜMİNYUM KORKULUK</h1>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
            Balkon, merdiven ve teraslarınız için paslanmaz, uzun ömürlü ve mimari yapıya estetik katan modern alüminyum korkuluk çözümleri.
          </p>
        </div>
      </section>

      {/* Luxurious Products Section */}
      <section className="py-32 bg-white text-[#1a1a1a] w-full relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#1a1a1a] block mb-3">SİSTEMLERİMİZ</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Öne Çıkan Modeller</h2>
            <div className="w-16 h-1 bg-[#1a1a1a] mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {products.map((product, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-[#fafafa] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-2xl font-bold mb-4 text-[#1a1a1a]">{product.name}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed mb-8 flex-grow">
                    {product.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {product.features?.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center text-xs font-medium text-[#333333]">
                        <span className="material-symbols-outlined text-[#1a1a1a] text-sm mr-3">check_circle</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="#iletisim" 
                    className="mt-auto block w-full py-4 text-center text-xs font-bold uppercase tracking-widest text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors duration-300 rounded"
                  >
                    Bilgi Al
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
