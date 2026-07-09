'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Placeholder catalogs for each category
const CATALOG_DATA = {
  balcony: [
    { id: 'balcony-1', code: 'CB-101', name: 'Standart Katlanır Cam Balkon', image: 'https://images.unsplash.com/photo-1541123437800-141550fb31c5?w=500&h=400&fit=crop' },
    { id: 'balcony-2', code: 'CB-102', name: 'Isıcamlı Cam Balkon', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=400&fit=crop' },
    { id: 'balcony-3', code: 'CB-103', name: 'Sürme Cam Sistemleri', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop' },
  ],
  railing: [
    { id: 'railing-1', code: 'KR-201', name: 'Yuvarlak Profilli Alüminyum', image: 'https://images.unsplash.com/photo-1605810731464-9d10e0500735?w=500&h=400&fit=crop' },
    { id: 'railing-2', code: 'KR-202', name: 'Kare Profilli Camlı Korkuluk', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&h=400&fit=crop' },
    { id: 'railing-3', code: 'KR-203', name: 'Fransız Balkon Korkuluğu', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=500&h=400&fit=crop' },
  ],
  shower: [
    { id: 'shower-1', code: 'DS-301', name: 'Mika Camlı Standart Kabin', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&h=400&fit=crop' },
    { id: 'shower-2', code: 'DS-302', name: 'Temperli Cam Siyah Profil', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=400&fit=crop' },
    { id: 'shower-3', code: 'DS-303', name: 'Kompakt Sistem', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&h=400&fit=crop' },
  ],
  door: [
    { id: 'door-1', code: 'KP-401', name: 'Tek Kanat Fotoselli Kapı', image: 'https://images.unsplash.com/photo-1533667586627-9f5ad3a9ebfc?w=500&h=400&fit=crop' },
    { id: 'door-2', code: 'KP-402', name: 'Çift Kanat Yana Kayar Kapı', image: 'https://images.unsplash.com/photo-1506452899478-43d931be6f7c?w=500&h=400&fit=crop' },
  ],
  shutter: [
    { id: 'shutter-1', code: 'KP-501', name: 'Galvaniz Çelik Kepenk', image: 'https://images.unsplash.com/photo-1534346853316-29a32c7f46dc?w=500&h=400&fit=crop' },
    { id: 'shutter-2', code: 'KP-502', name: 'Alüminyum Poliüretanlı Kepenk', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=400&fit=crop' },
  ],
  showcase: [
    { id: 'showcase-1', code: 'CM-601', name: 'Vitrin Camekan Sistemi', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500&h=400&fit=crop' },
    { id: 'showcase-2', code: 'CM-602', name: 'Ofis Bölme Sistemleri', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop' },
  ],
};

const CATEGORIES = [
  { id: 'balcony', name: 'Cam Balkon', icon: 'window' },
  { id: 'railing', name: 'Korkuluk', icon: 'reorder' },
  { id: 'shower', name: 'Duşakabin', icon: 'shower' },
  { id: 'door', name: 'Fotoselli Kapı', icon: 'door_sliding' },
  { id: 'shutter', name: 'Otomatik Kepenk', icon: 'garage' },
  { id: 'showcase', name: 'Camekan & Doğrama', icon: 'grid_view' },
];

export default function QuotePage() {
  const [productType, setProductType] = useState('balcony');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  // When category changes, deselect model
  const handleCategoryChange = (id: string) => {
    setProductType(id);
    setSelectedModelId(null);
  };

  const getProductName = (id: string) => CATEGORIES.find(c => c.id === id)?.name || '';

  const currentModels = CATALOG_DATA[productType as keyof typeof CATALOG_DATA] || [];
  const selectedModel = currentModels.find(m => m.id === selectedModelId);

  const handleWhatsAppRedirect = () => {
    if (!selectedModel) return;
    
    const categoryName = getProductName(productType);
    const phoneNumber = '+905337747684'; // Firma telefon numarası
    const message = `Merhaba, sitenizden *${categoryName}* kategorisindeki *${selectedModel.name}* ( Model Kodu: *${selectedModel.code}* ) için fiyat almak istiyorum. Ölçü ve detayları sizinle paylaşacağım.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 w-full flex-grow flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">
            GÖRSEL KATALOG
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-[#1a1a1a]">
            Beğendiğiniz Modeli Seçin
          </h1>
          <p className="text-xs text-[#565f69] mt-2">
            Kategorilerden size uygun olanı seçerek model kataloğumuzu inceleyebilir ve seçtiğiniz ürün için WhatsApp üzerinden anında fiyat alabilirsiniz.
          </p>
          <div className="w-12 h-0.5 bg-[#d21920] mx-auto md:mx-0 mt-4"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Categories and Catalog */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Step 1: Category Selection */}
            <div className="bg-white border border-[#dcdde2]/60 p-6 md:p-8 rounded shadow-sm">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-4 block">
                1. Kategori Seçin
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleCategoryChange(p.id)}
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

            {/* Step 2: Model Catalog */}
            <div className="bg-white border border-[#dcdde2]/60 p-6 md:p-8 rounded shadow-sm">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-4 block">
                2. Katalogdan Model Seçin
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {currentModels.map((model) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      key={model.id}
                      onClick={() => setSelectedModelId(model.id)}
                      className={`relative cursor-pointer rounded overflow-hidden border-2 transition-all duration-300 group ${
                        selectedModelId === model.id 
                          ? 'border-[#d21920] shadow-md ring-2 ring-[#d21920]/20' 
                          : 'border-transparent hover:border-[#dcdde2]'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={model.image} 
                          alt={model.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {selectedModelId === model.id && (
                          <div className="absolute top-2 right-2 bg-[#d21920] text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-sm">check</span>
                          </div>
                        )}
                      </div>
                      <div className={`p-3 border-t ${selectedModelId === model.id ? 'bg-[#d21920]/5 border-[#d21920]/20' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="text-[10px] text-[#565f69] font-mono mb-1">{model.code}</div>
                        <h4 className="text-sm font-semibold text-[#1a1a1a] leading-tight">
                          {model.name}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {currentModels.length === 0 && (
                  <div className="col-span-full py-12 text-center text-[#565f69]">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">photo_library</span>
                    <p className="text-sm">Bu kategori için henüz model yüklenmedi.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Selection Summary and WhatsApp Button */}
          <div className="lg:col-span-4">
            <div className="bg-[#1a1a1a] text-white p-6 rounded shadow-lg sticky top-28 flex flex-col min-h-[400px] overflow-hidden relative">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d21920]/20 rounded-bl-[100px] blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex-grow flex flex-col">
                <span className="text-[9px] font-bold text-[#d21920] uppercase tracking-widest block mb-4">
                  SEÇİLEN MODEL ÖZETİ
                </span>

                {!selectedModel ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center opacity-60">
                    <span className="material-symbols-outlined text-5xl mb-3">touch_app</span>
                    <p className="text-sm">Lütfen fiyatını öğrenmek istediğiniz modeli sol taraftaki katalogdan seçin.</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={selectedModel.id}
                    className="flex-grow flex flex-col"
                  >
                    <div className="w-full aspect-video rounded overflow-hidden mb-4 border border-white/10 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={selectedModel.image} 
                        alt={selectedModel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="mb-6 border-b border-white/10 pb-4">
                      <div className="text-[10px] text-[#d21920] font-mono mb-1 bg-[#d21920]/10 inline-block px-2 py-0.5 rounded">
                        KOD: {selectedModel.code}
                      </div>
                      <h3 className="font-display text-xl font-medium text-white leading-snug mt-1">
                        {selectedModel.name}
                      </h3>
                      <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                        {getProductName(productType)}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <p className="text-[10px] text-white/50 mb-3 leading-relaxed">
                        WhatsApp üzerinden bize ulaştığınızda, seçtiğiniz model bilgisi otomatik olarak mesajınıza eklenecektir. Uzman ekibimiz detaylı ölçü ve fiyat bilgisini sizinle paylaşacaktır.
                      </p>
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white py-4 px-4 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 group"
                      >
                        {/* WhatsApp Icon (using a simple SVG since Material symbols doesn't have official brand logos) */}
                        <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp&apos;tan Fiyat Al
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
