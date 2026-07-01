'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QuotePage() {
  const [productType, setProductType] = useState('balcony');
  const [glassType, setGlassType] = useState('8mm');
  const [frameColor, setFrameColor] = useState('silver');
  const [width, setWidth] = useState(3.0);
  const [height, setHeight] = useState(1.5);
  
  // Contact details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Estimation & Modal
  const [priceEstimate, setPriceEstimate] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Mathematical estimation rules matching 6 categories
    let basePricePerUnit = 2800; // default for balcony (sqm)
    let unitType = 'sqm';

    if (productType === 'railing') {
      basePricePerUnit = 1400; // per meter
      unitType = 'meter';
    } else if (productType === 'shower') {
      basePricePerUnit = 3500; // per sqm
      unitType = 'sqm';
    } else if (productType === 'door') {
      basePricePerUnit = 18500; // flat unit base cost
      unitType = 'unit';
    } else if (productType === 'shutter') {
      basePricePerUnit = 3100; // per sqm
      unitType = 'sqm';
    } else if (productType === 'showcase') {
      basePricePerUnit = 2600; // per sqm
      unitType = 'sqm';
    }

    // Glass multiplier
    let glassMultiplier = 1.0;
    if (glassType === '10mm') glassMultiplier = 1.2;
    if (glassType === 'double') glassMultiplier = 1.45;

    // Frame multiplier
    let frameMultiplier = 1.0;
    if (frameColor === 'black') frameMultiplier = 1.1;
    if (frameColor === 'gold') frameMultiplier = 1.25;

    // Size calculation
    let size = width; // default for meter
    if (unitType === 'sqm') {
      size = width * height;
    } else if (unitType === 'unit') {
      size = 1; // flat unit
    }

    const calculatedPrice = Math.round(size * basePricePerUnit * glassMultiplier * frameMultiplier);
    setPriceEstimate(calculatedPrice);
  }, [productType, glassType, frameColor, width, height]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Lütfen adınızı ve telefon numaranızı girin.');
      return;
    }
    setShowSuccessModal(true);
  };

  const getProductName = (id: string) => {
    switch (id) {
      case 'balcony': return 'Cam Balkon';
      case 'railing': return 'Korkuluk Sistemleri';
      case 'shower': return 'Duşakabin';
      case 'door': return 'Fotoselli Kapı';
      case 'shutter': return 'Otomatik Kepenk';
      case 'showcase': return 'Camekan & Doğrama';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 w-full flex-grow flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">
            AKILLI KONFİGÜRATÖR
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-[#1a1a1a]">
            Fiyat Teklifi Hesapla
          </h1>
          <p className="text-xs text-[#565f69] mt-2">
            İhtiyacınız olan hizmeti seçip, ölçüleri girerek anında tahmini maliyet simülasyonu gerçekleştirebilirsiniz.
          </p>
          <div className="w-12 h-0.5 bg-[#d21920] mx-auto md:mx-0 mt-4"></div>
        </div>

        {/* Configurator Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Configurator Form */}
          <div className="lg:col-span-7 bg-white border border-[#dcdde2]/60 p-8 rounded shadow-sm flex flex-col gap-6">
            
            {/* Step 1: Product Selection */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-3 block">1. Hizmet Seçin</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'balcony', name: 'Cam Balkon', icon: 'window' },
                  { id: 'railing', name: 'Korkuluk', icon: 'reorder' },
                  { id: 'shower', name: 'Duşakabin', icon: 'shower' },
                  { id: 'door', name: 'Fotoselli Kapı', icon: 'door_sliding' },
                  { id: 'shutter', name: 'Otomatik Kepenk', icon: 'roller_shutter' },
                  { id: 'showcase', name: 'Camekan & Doğrama', icon: 'grid_view' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setProductType(p.id)}
                    className={`p-4 border rounded flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      productType === p.id
                        ? 'border-[#d21920] bg-[#d21920]/5 text-[#1a1a1a] font-bold'
                        : 'border-[#dcdde2] hover:border-[#d21920] text-[#565f69]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-center">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            {productType !== 'door' && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-3 block">2. Ölçüleri Girin (Metre)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-[#565f69] mb-1.5 block">Genişlik / Uzunluk (Metre)</span>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="30"
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 1)}
                      className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                    />
                  </div>
                  {productType !== 'railing' && (
                    <div>
                      <span className="text-[10px] text-[#565f69] mb-1.5 block">Yükseklik (Metre)</span>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="5"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value) || 0.5)}
                        className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Material Selections */}
            {productType !== 'door' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">3. Cam Kalınlığı</label>
                  <select
                    value={glassType}
                    onChange={(e) => setGlassType(e.target.value)}
                    className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920] bg-white"
                  >
                    <option value="8mm">8mm Temperli Güvenlik Camı</option>
                    <option value="10mm">10mm Temperli Güvenlik Camı (+%20)</option>
                    <option value="double">Isıcam Lamine Çift Cam (+%45)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">4. Profil Kaplaması</label>
                  <select
                    value={frameColor}
                    onChange={(e) => setFrameColor(e.target.value)}
                    className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920] bg-white"
                  >
                    <option value="silver">Doğal Eloksal Gümüş</option>
                    <option value="black">Mat Siyah Loft Kaplama (+%10)</option>
                    <option value="gold">Lüks Altın / Bronz Kaplama (+%25)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Contact Form */}
            <form onSubmit={handleSubmit} className="border-t border-[#dcdde2]/40 pt-6 mt-2 flex flex-col gap-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-1 block">İletişim Bilgileriniz</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız (+90 ...)"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
                />
              </div>
              <textarea
                placeholder="Varsa proje detayları veya özel istekleriniz..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-[#dcdde2] p-3 rounded text-sm focus:outline-none focus:border-[#d21920]"
              />
              <button
                type="submit"
                className="w-full bg-[#d21920] text-white hover:bg-[#d21920] hover:text-[#1a1a1a] transition-all duration-300 py-4 rounded text-xs font-semibold uppercase tracking-widest mt-2 shadow"
              >
                Teklif Talebi Gönder
              </button>
            </form>
          </div>

          {/* Pricing Estimation Panel */}
          <div className="lg:col-span-5 bg-[#d21920] text-white p-8 rounded shadow-md sticky top-28 flex flex-col justify-between min-h-[420px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] dot-pattern z-0" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[9px] font-bold text-[#d21920] uppercase tracking-widest block mb-4">
                  TAHMİNİ HESAPLAMA PANELİ
                </span>
                
                <h3 className="font-display text-lg font-medium text-white mb-6 border-b border-white/10 pb-4">
                  Seçimleriniz
                </h3>

                <div className="flex flex-col gap-4 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span>Sistem Tipi</span>
                    <span className="font-bold text-white uppercase">
                      {getProductName(productType)}
                    </span>
                  </div>
                  {productType !== 'door' && (
                    <div className="flex justify-between">
                      <span>Ölçüler</span>
                      <span className="font-bold text-white">
                        {productType === 'railing' 
                          ? `${width} Metre` 
                          : `${width}m x ${height}m (${(width * height).toFixed(2)} m²)`
                        }
                      </span>
                    </div>
                  )}
                  {productType !== 'door' && (
                    <>
                      <div className="flex justify-between">
                        <span>Cam Kalınlığı</span>
                        <span className="font-bold text-white uppercase">{glassType === '8mm' ? '8mm' : glassType === '10mm' ? '10mm' : 'Isıcam / Çift Cam'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profil Kaplaması</span>
                        <span className="font-bold text-white uppercase">{frameColor === 'silver' ? 'Eloksal Gümüş' : frameColor === 'black' ? 'Mat Siyah' : 'Altın/Bronz'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-12 border-t border-white/10 pt-6">
                <span className="text-[9px] font-bold text-[#d21920] uppercase tracking-widest block mb-1">
                  YAKLAŞIK MALİYET (TAHMİNİ)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-semibold text-4xl sm:text-5xl text-white">
                    ₺{priceEstimate.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-xs text-white/50">* KDV ve Montaj Hariçtir</span>
                </div>
                <p className="text-[10px] text-white/50 mt-4 leading-relaxed">
                  Hesaplanan tutar tahmini bir maliyettir. CEM-AS teknik ekibinin yerinde milimetrik ölçümünün ardından kesin teklif hazırlanacaktır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-lg max-w-md w-full border border-[#dcdde2] shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-[#565f69] hover:text-[#1a1a1a] p-2"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
              <h3 className="font-display text-xl font-semibold text-[#1a1a1a] mb-2">Teklif Talebi Alındı!</h3>
              <p className="text-xs text-[#565f69] leading-relaxed mb-6">
                Sayın <strong>{name}</strong>, <strong>{getProductName(productType)}</strong> projeniz için hazırlanan <strong>₺{priceEstimate.toLocaleString('tr-TR')}</strong> tutarındaki tahmini teklif talebiniz kaydedilmiştir. Teknik ekibimiz <strong>{phone}</strong> numaranızdan sizinle iletişime geçecektir.
              </p>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#d21920] text-white py-3 rounded text-xs font-semibold uppercase tracking-widest hover:bg-[#d21920] transition-colors"
              >
                Kapat
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
