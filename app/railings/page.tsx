'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function RailingsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const categories = [
    {
      title: 'Baza Sistemli Cam Korkuluklar (Frameless)',
      desc: 'Zemine gömülen veya zemin üstüne monte edilen alüminyum bazalar içine yerleştirilen çerçevesiz, maksimum şeffaflık sunan cam korkuluklar.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooiHgZerlA7qhc1WJzhJyTBEz_utddKP1qFqYT7woxty-CqqYUyV1rqZOtoMjEDy1ap2gt1jaM21NyYl71PMAJHdorRzP-L9E1q5pBu7rStdOrpIqCJBpQOxZrO0CUU1_kdpa-ad4Jq85lWONKUh9Y4xCdH7CW6ZT7nhX9JhKoASYQ6AXrwsOZmkO_mmzT3k1AiVpMEm-lvurAWlYQ_jRhiT-CLsUJk7KTW-6eLw-DJuggtQYnEYKoA',
    },
    {
      title: 'Noktasal Tutuculu Cam Korkuluklar',
      desc: 'Camların merdiven veya teras yan alınlarına paslanmaz çelik noktasal tutucular (spider/düğme aparatları) ile bağlandığı şık mimari modeller.',
      img: null, // Placeholder for user's photo
    },
    {
      title: 'Alüminyum Profilli Korkuluklar',
      desc: 'Yatay veya dikey alüminyum emniyet şeritli (şeritli/camlı karma) klasik, ekonomik ve yüksek dirençli korkuluk sistemleri.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAaczvEpjps87AlP41YLfOdZ8L2emy8W77OiJM9fRdzbST38suAntB3DfDdO5pWihOVvhFeEXk-n2OLkdXpavnHah2CublYBQG8ho9GxgaG91UejmkUH6EuzLnmIWRUDDIjc4AGyA9pkFbddMqFZDcjmoIbN8RWRF1eUmPyIkhbkYcPPx7Y8esw71GmYgfYq6trSTXwELP-bGK1AmFb0UcW0SdnzkssSfbi31hjclvjublmAkPEI_vuQ',
    },
    {
      title: 'Teras & Fransız Balkon Korkulukları',
      desc: 'Dış cephelerde pencere önleri ve geniş teras sınırları için tasarlanmış yüksek rüzgar dirençli yapısal emniyet korkulukları.',
      img: null, // Placeholder for user's photo
    },
  ];

  const technicalSpecs = [
    { label: 'Alaşım Tipi', value: '6063 T5 / T6 Alüminyum' },
    { label: 'Cam Kalınlığı Uyumluluğu', value: '8mm - 20mm (Lamine & Temperli)' },
    { label: 'Boya Kalınlığı (Eloksal)', value: '10-15 Mikron' },
    { label: 'Boya Kalınlığı (Elektrostatik)', value: '60-80 Mikron' },
    { label: 'Sertifikasyonlar', value: 'CE, TSE, ISO 9001' },
    { label: 'Montaj Tipi', value: 'Zemin / Yandan Alına Ankrajlı' },
  ];

  const galleryItems = [
    {
      category: 'VİLLA PROJESİ / BODRUM',
      title: 'Camlı Alüminyum Teras Korkuluğu',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooiHgZerlA7qhc1WJzhJyTBEz_utddKP1qFqYT7woxty-CqqYUyV1rqZOtoMjEDy1ap2gt1jaM21NyYl71PMAJHdorRzP-L9E1q5pBu7rStdOrpIqCJBpQOxZrO0CUU1_kdpa-ad4Jq85lWONKUh9Y4xCdH7CW6ZT7nhX9JhKoASYQ6AXrwsOZmkO_mmzT3k1AiVpMEm-lvurAWlYQ_jRhiT-CLsUJk7KTW-6eLw-DJuggtQYnEYKoA',
    },
    {
      category: 'TİCARİ YAPI / İSTANBUL',
      title: 'Kare Profil Merdiven Korkuluğu',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAITVWUZH7JYG1bFNxdHKQwimwS-V-5A3WS8tyk2DWWCyXKReARitu4uDUQqfBrrhxsdt-QJ4C9ezAtLkYVB7QPJB_Js_INsb4UjnszU7Grn_nETToyXyyMrXGuNOkshoUrUHggU7Bejs9fx7zSZLnuF8asI3DAsO8PoSXcnZi4MXKvMHZSQLKMopUuUfaH6i32gyBp_4CEwjFdr31d1Ulks0OsBMQOfJjk7MvpSHdIEbk_eUn58F89-A',
    },
    {
      category: 'KONUT PROJESİ / İZMİR',
      title: 'Dairesel Profil Balkon Sistemleri',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAaczvEpjps87AlP41YLfOdZ8L2emy8W77OiJM9fRdzbST38suAntB3DfDdO5pWihOVvhFeEXk-n2OLkdXpavnHah2CublYBQG8ho9GxgaG91UejmkUH6EuzLnmIWRUDDIjc4AGyA9pkFbddMqFZDcjmoIbN8RWRF1eUmPyIkhbkYcPPx7Y8esw71GmYgfYq6trSTXwELP-bGK1AmFb0UcW0SdnzkssSfbi31hjclvjublmAkPEI_vuQ',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#0b0f19] antialiased">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full min-h-[65vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyWeVqWbBEeEU8fClK_zdWV3gUFTlU4c03-PyGvzG2mFkrzHesvMjJyJs9PeSahyYJV9vm4mFYs4TktPuy5s6r6y6WAEnGDMSqmEMUs2XFQM3p8Zsnvb170_JL2fBL5beQ7Rv_xmI7UHsV03OarP-G81SqwcmUDMuVQUYC2UcpIIRjT_zGjbYiHdLRyavj2O5TQ9NYAUNbyLIyuI8GJpBeqB4rKGt4h-N7W6l7QaJx9mGlEwChB_rqmw"
              alt="Alüminyum Korkuluk Sistemleri"
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/50 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl bg-white/95 backdrop-blur-md p-8 md:p-12 border border-[#dcdde2]/60 shadow-sm rounded"
            >
              <span className="inline-block px-3 py-1 bg-[#f0f1f4] text-[#565f69] font-bold text-[10px] uppercase tracking-widest mb-4 rounded-full">
                YAPISAL EMNİYET
              </span>
              <h1 className="font-display font-semibold text-3xl sm:text-4xl text-[#0b0f19] tracking-tight mb-6">
                Alüminyum Korkuluk Sistemleri
              </h1>
              <p className="text-sm md:text-base text-[#565f69] leading-relaxed mb-8">
                Modern mimarinin yapı taşları. Yüksek mühendislik standartlarıyla üretilmiş, estetik ve güvenliği mükemmel bir dengede sunan alüminyum çözümler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="bg-[#0b0f19] text-white text-center text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded hover:bg-[#8a9ca7] hover:text-[#0b0f19] transition-colors"
                >
                  Teklif Hesapla
                </Link>
                <button className="border border-[#dcdde2] text-[#0b0f19] text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded hover:bg-[#f0f1f4] transition-colors flex items-center justify-center gap-2">
                  Kataloğu İncele <span className="material-symbols-outlined text-[16px]">download</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section with placeholders */}
        <section className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto w-full">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">KATEGORİLER</span>
            <h2 className="font-display text-3xl font-semibold text-[#0b0f19]">Korkuluk Modellerimiz</h2>
            <p className="text-xs text-[#565f69] mt-2">
              (Görsel bulunmayan alanlar, ileride kendi fotoğraflarınızı yerleştirebilmeniz için şablon olarak tasarlanmıştır.)
            </p>
            <div className="w-12 h-0.5 bg-[#8a9ca7] mt-4"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-[#dcdde2]/60 p-6 flex flex-col justify-between hover:border-[#0b0f19] hover:shadow-md transition-all duration-300 rounded"
              >
                <div>
                  {cat.img ? (
                    <div className="h-64 mb-6 overflow-hidden bg-[#ebeef0] rounded-sm">
                      <img
                        src={cat.img}
                        alt={cat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-64 mb-6 rounded-sm photo-placeholder flex flex-col items-center justify-center text-[#565f69] p-4">
                      <span className="material-symbols-outlined text-4xl mb-3 opacity-60">add_a_photo</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-center">Fotoğraf Ekleme Alanı</span>
                      <span className="text-[9px] text-[#565f69]/80 text-center mt-1">Görselinizi buraya yerleştirebilirsiniz</span>
                    </div>
                  )}
                  
                  <h3 className="font-display text-xl font-semibold text-[#0b0f19] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#565f69] leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#dcdde2]/30 pt-4">
                  <span className="text-[9px] font-bold text-[#8a9ca7] uppercase tracking-wider">CEMAS GÜVENCESİ</span>
                  <Link href="/quote" className="text-[10px] font-bold uppercase tracking-widest text-[#0b0f19] hover:opacity-80 flex items-center gap-1.5">
                    Fiyat Al <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Technical Specs Section */}
        <section className="py-24 bg-white border-y border-[#dcdde2]/50">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">MÜHENDİSLİK VERİLERİ</span>
              <h2 className="font-display text-3xl font-semibold text-[#0b0f19] mb-4">Hassas Tasarım Standartları</h2>
              <p className="text-sm text-[#565f69] max-w-xl leading-relaxed">
                Her detay, dayanıklılık ve estetik vizyonuyla tasarlandı. Sınıfının en iyisi malzemeler ve hassas üretim süreçleri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Column 1 */}
              <div className="bg-[#fafafa] p-8 border border-[#dcdde2]/50 h-full flex flex-col rounded">
                <span className="material-symbols-outlined text-4xl text-[#0b0f19] mb-6 block">shield</span>
                <h3 className="text-lg font-semibold text-[#0b0f19] mb-3">Maksimum Emniyet</h3>
                <p className="text-sm text-[#565f69] leading-relaxed">
                  T6 ısıl işlemli yapısal alüminyum alaşımı sayesinde yüksek korozyon direnci ve yüksek rüzgar yükü kapasitesi.
                </p>
              </div>

              {/* Column 2 */}
              <div className="bg-[#fafafa] p-8 border border-[#dcdde2]/50 md:col-span-2 flex flex-col md:flex-row gap-8 rounded">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-4xl text-[#0b0f19] mb-6 block">palette</span>
                    <h3 className="text-lg font-semibold text-[#0b0f19] mb-3">Kusursuz Yüzey İşlemleri</h3>
                    <p className="text-sm text-[#565f69] leading-relaxed mb-6">
                      Eloksal ve elektrostatik toz boya seçenekleriyle yıllarca solmayan, çizilmeye dirençli premium dokular.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-white border border-[#dcdde2]/50 px-3 py-1 font-semibold text-[9px] text-[#565f69] uppercase tracking-wider rounded">Mat Eloksal</span>
                    <span className="bg-white border border-[#dcdde2]/50 px-3 py-1 font-semibold text-[9px] text-[#565f69] uppercase tracking-wider rounded">Parlak Krom</span>
                    <span className="bg-white border border-[#dcdde2]/50 px-3 py-1 font-semibold text-[9px] text-[#565f69] uppercase tracking-wider rounded">Antrasit Gri</span>
                  </div>
                </div>
                <div className="flex-1 relative min-h-[180px] bg-[#ebeef0] overflow-hidden rounded-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw8QrMnOpFUoFohiosVpM4mQhztg9U8mEP68OlNG45YdXKVJwxB6E-FbPzqpJ6pxlUwm6BxOGw0ci41eT69cvV44RGeo8_gyu2feSN-t2K-b8_8s3iNKWQWUnqZwOodWjBv-jhrfXCtdpWlf8nOECaTnb_Aw1YO0w7I_dKcq8tdWYI6ZmGRZaymJkeK-lJymoYjJqCfzNzyUIEB9PhfPPxWKl0JYBsdcOzD6iVj4fO87rzU-Aralcgsg"
                    alt="Alüminyum profil kesitleri"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="bg-[#fafafa] p-8 border border-[#dcdde2]/50 md:col-span-3 rounded">
                <h3 className="text-lg font-semibold text-[#0b0f19] mb-6">Teknik Özellikler Tablosu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                  {technicalSpecs.map((spec) => (
                    <div key={spec.label} className="flex justify-between items-center py-4 border-b border-[#dcdde2]/20 spec-row">
                      <span className="text-[10px] font-bold text-[#565f69] uppercase tracking-wider">{spec.label}</span>
                      <span className="text-sm font-semibold text-[#0b0f19]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-[#fafafa]">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">REFERANSLARIMIZ</span>
                <h2 className="font-display text-3xl font-semibold text-[#0b0f19]">Tamamlanan Projeler</h2>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-white border border-[#dcdde2]/40 hover:border-[#0b0f19] hover:shadow-md transition-all duration-300 rounded overflow-hidden"
                >
                  <div className="h-64 overflow-hidden bg-[#ebeef0]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[9px] font-bold text-[#565f69] tracking-widest uppercase mb-2 block">
                      {item.category}
                    </span>
                    <h4 className="text-base font-semibold text-[#0b0f19]">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
