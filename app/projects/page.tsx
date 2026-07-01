'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Tüm Projeler' },
    { id: 'railings', name: 'Korkuluk Sistemleri' },
    { id: 'balconies', name: 'Cam Balkon' },
    { id: 'showers', name: 'Duşakabin' },
  ];

  const projects = [
    {
      id: 1,
      category: 'railings',
      tag: 'VİLLA PROJESİ / BODRUM',
      title: 'Camlı Alüminyum Teras Korkuluğu',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooiHgZerlA7qhc1WJzhJyTBEz_utddKP1qFqYT7woxty-CqqYUyV1rqZOtoMjEDy1ap2gt1jaM21NyYl71PMAJHdorRzP-L9E1q5pBu7rStdOrpIqCJBpQOxZrO0CUU1_kdpa-ad4Jq85lWONKUh9Y4xCdH7CW6ZT7nhX9JhKoASYQ6AXrwsOZmkO_mmzT3k1AiVpMEm-lvurAWlYQ_jRhiT-CLsUJk7KTW-6eLw-DJuggtQYnEYKoA',
    },
    {
      id: 2,
      category: 'railings',
      tag: 'TİCARİ YAPI / İSTANBUL',
      title: 'Kare Profil Merdiven Korkuluğu',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAITVWUZH7JYG1bFNxdHKQwimwS-V-5A3WS8tyk2DWWCyXKReARitu4uDUQqfBrrhxsdt-QJ4C9ezAtLkYVB7QPJB_Js_INsb4UjnszU7Grn_nETToyXyyMrXGuNOkshoUrUHggU7Bejs9fx7zSZLnuF8asI3DAsO8PoSXcnZi4MXKvMHZSQLKMopUuUfaH6i32gyBp_4CEwjFdr31d1Ulks0OsBMQOfJjk7MvpSHdIEbk_eUn58F89-A',
    },
    {
      id: 3,
      category: 'railings',
      tag: 'KONUT PROJESİ / İZMİR',
      title: 'Dairesel Profil Balkon Korkuluğu',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAaczvEpjps87AlP41YLfOdZ8L2emy8W77OiJM9fRdzbST38suAntB3DfDdO5pWihOVvhFeEXk-n2OLkdXpavnHah2CublYBQG8ho9GxgaG91UejmkUH6EuzLnmIWRUDDIjc4AGyA9pkFbddMqFZDcjmoIbN8RWRF1eUmPyIkhbkYcPPx7Y8esw71GmYgfYq6trSTXwELP-bGK1AmFb0UcW0SdnzkssSfbi31hjclvjublmAkPEI_vuQ',
    },
    {
      id: 4,
      category: 'balconies',
      tag: 'REZİDANS DAİRESİ / ANKARA',
      title: 'Isıcamlı Sürgülü Cam Balkon',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALFTR3U_KtByt9Ub9uElWbZr3MU3YyspQ2VUxJJM81UIef5gYWPsFByPQUGYraUGSwnPeb0VI6CP4sJWcY3ApyLmP2DFKcwM-WU8zooQ4esiE-G9-c8UQKqBoN0_7GDsWG7omVqPMSpIqg0Ad2ybG2Ol1th45bcQaLx2xqAsrQEwZbI_T0WIE8MG8HFMOZQ6g5Ct_Wi1PNr10zik-o1sR2Mgp4FxM-V31n6CLkAU6FFdUVYjSSi1GR8g',
    },
    {
      id: 5,
      category: 'showers',
      tag: 'LÜKS DAİRE / İSTANBUL',
      title: 'Çerçevesiz Menteşeli Duş Kabini',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPNY1SJCI9YMvrfFEbUmzacAy5QpisMhOZZfr6cTTK-x16dQ1mqk8reb6OrQGUaFQLmHn_hQs0rqn0pENm0r4EaVlAgONFV_E3PX6pc0y5NCR3RHZw0kTLCWFuZvfeGatZ79NXK6mhfh-CfqFuEM2PLdzX7027sWLszyKoGZJwTLbHz9Ei7S-6ToeBNW7C4ywgAXVGLrgfz-vNiSLFaZRKUouBxL9tXoeh4UOEUD0_Mvd2PfYqqJRTTQ',
    },
    {
      id: 6,
      category: 'balconies',
      tag: 'PROJE AŞAMASINDA / MOCK',
      title: 'Giyotin Motorlu Cam Kapatma',
      img: null, // Placeholder
    },
    {
      id: 7,
      category: 'showers',
      tag: 'PROJE AŞAMASINDA / MOCK',
      title: ' Loft Serisi Mat Siyah Kabin',
      img: null, // Placeholder
    },
    {
      id: 8,
      category: 'railings',
      tag: 'PROJE AŞAMASINDA / MOCK',
      title: 'Frameless Baza Cam Korkuluk',
      img: null, // Placeholder
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#0b0f19] antialiased">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-24 pt-24 md:pt-32 w-full flex-grow flex flex-col">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#565f69] mb-2 block">
            CEMAS PORTFÖYÜ
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-[#0b0f19]">
            Tamamlanan Projelerimiz
          </h1>
          <div className="w-12 h-0.5 bg-[#8a9ca7] mt-4"></div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap mb-12 border-b border-[#dcdde2]/50 pb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded ${
                filter === cat.id
                  ? 'bg-[#0b0f19] text-white'
                  : 'text-[#565f69] hover:text-[#0b0f19] hover:bg-[#f0f1f4]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group bg-white border border-[#dcdde2]/60 hover:border-[#0b0f19] hover:shadow-md transition-all duration-300 rounded overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {project.img ? (
                    <div className="h-60 overflow-hidden bg-[#ebeef0]">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="h-60 rounded-t-sm photo-placeholder flex flex-col items-center justify-center text-[#565f69] p-4">
                      <span className="material-symbols-outlined text-4xl mb-3 opacity-60">add_a_photo</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-center">Referans Fotoğraf Alanı</span>
                      <span className="text-[9px] text-[#565f69]/80 text-center mt-1">İleride çekilecek projeleriniz için yer tutucu</span>
                    </div>
                  )}

                  <div className="p-6">
                    <span className="text-[9px] font-bold text-[#565f69] tracking-widest uppercase mb-2 block">
                      {project.tag}
                    </span>
                    <h4 className="text-base font-semibold text-[#0b0f19] group-hover:text-[#8a9ca7] transition-colors">
                      {project.title}
                    </h4>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#dcdde2]/30 flex justify-between items-center text-[10px] text-[#565f69]">
                  <span>Ürün Grubu: {categories.find(c => c.id === project.category)?.name}</span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">photo_library</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
