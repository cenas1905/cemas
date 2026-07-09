'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WinsaPage() {
  const [winsaProducts, setWinsaProducts] = useState<any[]>([]);

  useEffect(() => {
    // Scroll to top and reset the animation when the page loads
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
    
    fetch('/api/products?category=winsa')
      .then(res => res.json())
      .then(data => setWinsaProducts(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white antialiased">
      {/* 
        We pass a custom prop or use a dark theme version of Navbar if needed, 
        but assuming Navbar handles itself. 
      */}
      <Navbar />

      {/* Static Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-[#d21920] pt-20">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop" 
          alt="Winsa" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/80 mb-4 block">KUSURSUZ YALITIM, ZAMANIZ ESTETİK</span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">WİNSA SİSTEMLERİ</h1>
          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
            Evinizin mimarisine en uygun PVC pencere ve kapı çözümlerimizle tanışın. Yüksek enerji tasarrufu, maksimum güvenlik ve mükemmel ses yalıtımı Winsa kalitesiyle birleşiyor.
          </p>
        </div>
      </section>

      {/* Luxurious Products Section */}
      <section className="py-32 bg-white text-[#1a1a1a] w-full relative z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#d21920] block mb-3">WİNSA KALİTESİ</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Öne Çıkan Ürünlerimiz</h2>
            <p className="text-[#555555] text-lg font-light">
              Farklı ihtiyaçlara yönelik özel olarak geliştirilmiş serilerimiz ile mekanlarınıza değer katın.
            </p>
            <div className="w-16 h-1 bg-[#d21920] mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {winsaProducts.map((product, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-[#fafafa] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#d21920]">
                    Premium
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-2xl font-bold mb-4 text-[#1a1a1a]">{product.name}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed mb-8 flex-grow">
                    {product.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {product.features?.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center text-xs font-medium text-[#333333]">
                        <span className="material-symbols-outlined text-[#d21920] text-sm mr-3">check_circle</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <Link 
                    href="#iletisim" 
                    className="mt-auto block w-full py-4 text-center text-xs font-bold uppercase tracking-widest text-white bg-[#1a1a1a] group-hover:bg-[#d21920] transition-colors duration-300 rounded"
                  >
                    Bilgi Al
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Winsa Features / Technical details */}
      <section className="py-24 bg-[#111111] text-white w-full border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d21920] block mb-2">TEKNOLOJİ</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Neden Winsa?</h2>
              <p className="text-white/60 leading-relaxed mb-8 font-light">
                Winsa sistemleri, en zorlu hava koşullarına bile dayanacak şekilde tasarlanmıştır. İçeriğindeki özel bileşenler sayesinde güneş ışınlarına, rüzgara ve yağmura karşı maksimum koruma sağlar. Ayrıca doğa dostu yapısıyla sürdürülebilir bir gelecek için geri dönüştürülebilir malzemelerden üretilir.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl text-[#d21920] mb-2"><span className="material-symbols-outlined" style={{fontSize: '32px'}}>energy_savings_leaf</span></div>
                  <h4 className="font-bold mb-1">Enerji Tasarrufu</h4>
                  <p className="text-xs text-white/50">Kışın sıcak, yazın serin tutan yüksek yalıtım değerleri.</p>
                </div>
                <div>
                  <div className="text-3xl text-[#d21920] mb-2"><span className="material-symbols-outlined" style={{fontSize: '32px'}}>volume_off</span></div>
                  <h4 className="font-bold mb-1">Ses Yalıtımı</h4>
                  <p className="text-xs text-white/50">Şehrin gürültüsünü dışarıda bırakan huzurlu iç mekanlar.</p>
                </div>
                <div>
                  <div className="text-3xl text-[#d21920] mb-2"><span className="material-symbols-outlined" style={{fontSize: '32px'}}>shield</span></div>
                  <h4 className="font-bold mb-1">Maksimum Güvenlik</h4>
                  <p className="text-xs text-white/50">Özel kilit sistemleri ve ekstra güçlendirilmiş profiller.</p>
                </div>
                <div>
                  <div className="text-3xl text-[#d21920] mb-2"><span className="material-symbols-outlined" style={{fontSize: '32px'}}>palette</span></div>
                  <h4 className="font-bold mb-1">Geniş Renk Seçeneği</h4>
                  <p className="text-xs text-white/50">Mimarisi ile uyumlu, solmayan lamine kaplama seçenekleri.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(210,25,32,0.15)]">
                <img 
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop" 
                  alt="Winsa Kalitesi" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    <p className="text-sm font-light italic leading-relaxed text-white/90">
                      "Winsa ile değiştirdiğimiz pencerelerimiz sayesinde evimizin ısısı gözle görülür şekilde arttı. 3B Yapı'ya profesyonel montajları için teşekkürler."
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d21920] flex items-center justify-center text-xs font-bold">M</div>
                      <span className="text-xs font-medium">Müşteri Yorumu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
