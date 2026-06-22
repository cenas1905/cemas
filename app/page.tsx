'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Check, Star, Zap, Globe, Brain,
  FileText, Shield, ChevronDown, Users,
  TrendingUp, Award, Sparkles, Play, CheckCircle2,
  ExternalLink, Download, FileSpreadsheet, Lock, ArrowUpRight
} from 'lucide-react';

/* ─── Pricing data ─── */
const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: 'sonsuza kadar',
    desc: 'Başlamak için mükemmel',
    features: [
      { text: 'Sınırsız CV taslağı', ok: true },
      { text: '1 modern şablon', ok: true },
      { text: 'PDF indirme (14 gün)', ok: true },
      { text: 'Geçici paylaşım linki', ok: true },
      { text: '1 LinkedIn import hakkı', ok: true },
      { text: 'Kalıcı paylaşım linki', ok: false },
      { text: 'AI kariyer koçu', ok: false },
      { text: 'Şirkete özel URL', ok: false },
    ],
    cta: 'Ücretsiz Başla',
    ctaStyle: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-900',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₺199',
    period: '/ay',
    desc: 'Ciddi iş arayanlar için',
    features: [
      { text: 'Sınırsız CV taslağı', ok: true },
      { text: 'Tüm premium şablonlar', ok: true },
      { text: 'Sınırsız PDF indirme', ok: true },
      { text: 'Kalıcı paylaşım linki', ok: true },
      { text: 'Sınırsız LinkedIn import', ok: true },
      { text: 'AI kariyer koçu (sınırsız)', ok: true },
      { text: 'Şirkete özel URL', ok: true },
      { text: 'Görüntülenme analitiği', ok: true },
    ],
    cta: 'Pro\'ya Başla',
    ctaStyle: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/10',
    popular: true,
  },
  {
    name: 'Yıllık Pro',
    price: '₺1490',
    period: '/yıl',
    desc: '₺124/ay · 4 ay bedava 🎉',
    features: [
      { text: 'Pro\'daki her şey', ok: true },
      { text: 'Öncelikli AI işlem sırası', ok: true },
      { text: 'Yeni özelliklere erken erişim', ok: true },
      { text: '14 gün iade garantisi', ok: true },
      { text: '1 yıllık veri güvencesi', ok: true },
    ],
    cta: 'Yıllık Tasarruf Et',
    ctaStyle: 'bg-slate-900 hover:bg-slate-800 text-white font-black shadow-xl shadow-slate-950/20',
    popular: false,
  },
];

/* ─── Testimonials ─── */
const reviews = [
  { name: 'Cem A.', role: 'Frontend Dev @ Trendyol', rating: 5, text: 'LinkedIn\'den 2dk\'da CV çıkardım. AI optimizasyonuyla Google\'a mülakat daveti aldım. Gerçekten çalışıyor.' },
  { name: 'Selin K.', role: 'PM @ Getir', rating: 5, text: 'Şirkete özel link özelliği muhteşem. HR\'lar CV\'mi açıp bakarken bildirim geliyor. Tam istediğim şey.' },
  { name: 'Burak T.', role: 'Data Scientist @ N11', rating: 5, text: 'AI koç mülakat hazırlığımda inanılmaz yardımcı oldu. İlk denemede işe girdim!' },
];

/* ─── Steps ─── */
const steps = [
  { icon: '🔗', step: '01', title: 'LinkedIn Linkini Yapıştır', desc: 'Profil URL\'nizi girin. Apify teknolojisiyle tüm verileriniz 30 saniyede çekilir.' },
  { icon: '🤖', step: '02', title: 'AI ile Optimize Et', desc: 'Claude AI hedeflediğiniz şirkete ve pozisyona göre CV\'nizi yeniden yazar.' },
  { icon: '🚀', step: '03', title: 'Paylaş & Takip Et', desc: 'Özel linkinizi gönderin. Kim baktı, kaç kez, gerçek zamanlı görün.' },
];

const faqs = [
  { q: 'LinkedIn import nasıl çalışır?', a: 'Profil URL\'nizi girin; Apify scraper teknolojisiyle tüm iş deneyimi, eğitim, sertifika ve becerilerinizi otomatik çekeriz. Gizliliğiniz korunur, veriler şifrelenmiş olarak işlenir.' },
  { q: 'AI optimizasyon gerçekten fark yaratıyor mu?', a: 'Evet. Claude modelimiz CV\'nizi ATS (Applicant Tracking System) kriterlerine göre analiz eder, başarıları ölçülebilir hale getirir ve hedef şirketin değerlerine uygun dil kullanır. Kullanıcılarımızın %94\'ü mülakat daveti almaktadır.' },
  { q: 'Fiyatlar TL mi?', a: 'Evet, tüm fiyatlar Türk Lirası cinsindendir. Kredi/banka kartı ve havale ile ödeme yapabilirsiniz.' },
  { q: 'İptal edersem ne olur?', a: 'İstediğiniz zaman iptal edebilirsiniz. İptal sonrası abonelik süreniz bitene kadar Pro özelliklerine erişim devam eder. 14 gün içinde iade garantisi sunuyoruz.' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* ─── STICKY HEADER (Glassmorphic to match screenshot) ─── */}
      <div className="sticky top-0 z-50 bg-black/15 backdrop-blur-md border-b border-white/10 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <header className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-600">
                <span className="text-white font-black text-sm">C</span>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                CV<span className="text-indigo-400">io</span>
              </span>
            </Link>

            {/* Nav Menu (Matching screenshot) */}
            <div className="hidden md:flex gap-8">
              <a href="#ozellikler" onClick={(e) => handleScroll(e, 'ozellikler')} className="text-white/60 hover:text-white font-medium text-sm transition-colors duration-200">Features</a>
              <a href="#yorumlar" onClick={(e) => handleScroll(e, 'yorumlar')} className="text-white/60 hover:text-white font-medium text-sm transition-colors duration-200">Testimonials</a>
              <a href="#fiyatlar" onClick={(e) => handleScroll(e, 'fiyatlar')} className="text-white/60 hover:text-white font-medium text-sm transition-colors duration-200">Pricing</a>
              <Link href="/login" className="text-white/60 hover:text-white font-medium text-sm transition-colors duration-200">Login</Link>
            </div>

            {/* Get Started Button */}
            <Link href="/register" className="inline-flex items-center justify-center bg-white text-slate-950 font-bold text-xs sm:text-sm py-2.5 px-6 rounded-full hover:bg-slate-100 transition-all duration-200">
              Get Started <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </header>
        </div>
      </div>

      {/* ─── HERO SECTION (Replicating reference screenshot) ─── */}
      <div className="relative min-h-[92vh] flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
        {/* Full-size high-quality office windows background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_office.png"
            alt="Office window workspace"
            className="w-full h-full object-cover"
          />
          {/* Gentle dark overlay to make white text extremely legible */}
          <div className="absolute inset-0 bg-black/45 backdrop-brightness-[0.8]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 w-full flex flex-col items-center justify-center text-center">
          
          {/* Top Badge (New AI Feature / Presentation Generator 2.0) */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 mb-6 backdrop-blur-sm"
          >
            <span className="text-[10px] sm:text-xs font-bold text-white/90 flex items-center gap-2">
              <span className="bg-white text-slate-950 px-2 py-0.5 rounded-full text-[9px] uppercase font-extrabold tracking-wider">New AI Feature</span>
              Presentation Generator 2.0
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl"
          >
            Optimize Your CV for <br />
            <span className="text-white">Your Dream Job</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mt-6 font-normal leading-relaxed"
          >
            Transform your Linkedin profile into an ATS-friendly, job-specific CV in seconds.
            Harness the power of AI to create custom motivation letters and premium presentations that stand out.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            <Link href="/register" className="text-white hover:text-white/80 font-bold text-sm sm:text-base border-b-2 border-white pb-1 transition-all">
              Start Optimizing Free →
            </Link>
            <a href="#nasil-calisir" onClick={(e) => handleScroll(e, 'nasil-calisir')} className="text-white/70 hover:text-white font-semibold text-sm sm:text-base flex items-center gap-1 transition-all">
              View Demo <Play className="w-3.5 h-3.5 fill-white text-white ml-1" />
            </a>
          </motion.div>

          {/* Small Trust Tag */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/50 text-[11px] sm:text-xs mt-10 tracking-wider font-medium uppercase"
          >
            Trusted by candidates landing jobs at top companies
          </motion.p>

        </div>
      </div>

      {/* ─── APP PREVIEW CANVAS ─── */}
      <section className="relative z-10 px-4 -mt-10 sm:-mt-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-2xl">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-white/5">
              {/* Mockup browser window header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded px-10 py-0.5 text-[10px] text-white/40 font-mono">
                  cvio.app/cv/ali-yildiz
                </div>
                <div className="w-10" />
              </div>
              <img
                src="/cv_editor.png"
                alt="CVio CV Builder Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-slate-950 border-y border-white/5 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2.400+', label: 'Aktif Kullanıcı' },
            { value: '%94', label: 'Mülakat Başarısı' },
            { value: '60sn', label: 'Ortalama Oluşturma' },
            { value: '4.9★', label: 'Kullanıcı Puanı' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section id="ozellikler" className="py-24 px-4 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Advanced Creation</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
              Advanced, design-true CV creation
            </h2>
            <p className="text-white/60 mt-4 text-sm sm:text-base">
              Create reusable, perfectly formatted designs with high performance. Edit templates or segments in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
              <div className="aspect-[4/3] bg-white/[0.01] border-b border-white/5 flex items-center justify-center overflow-hidden">
                <img src="/linkedin_import.png" alt="LinkedIn Scraper API" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white">LinkedIn Profil Import</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  LinkedIn profil linkinizi yapıştırın; Apify scraper teknolojimiz tüm deneyim, eğitim ve yeteneklerinizi 30 saniyede otomatik çeksin.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
              <div className="aspect-[4/3] bg-white/[0.01] border-b border-white/5 flex items-center justify-center overflow-hidden">
                <img src="/ai_analysis.png" alt="AI CV Improver System" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white">Yapay Zeka ile Optimizasyon</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Claude AI, CV'nizi hedef pozisyona ve şirkete göre analiz eder. Sektöre özel anahtar kelimeleri ve başarıları vurgulayarak ATS engellerini aşar.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
              <div className="aspect-[4/3] bg-white/[0.01] border-b border-white/5 flex items-center justify-center overflow-hidden">
                <img src="/cv_editor.png" alt="Interactive Resume Canvas" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white">Özel Şablonlar & Tasarım Gücü</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Modern, profesyonel, minimal veya yaratıcı şablonlardan dilediğinizi seçin. Renkleri, yazı tiplerini ve boşlukları tek tıkla özelleştirin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS SECTION ─── */}
      <section id="nasil-calisir" className="py-24 px-4 bg-black/20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Nasıl Çalışır?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 tracking-tight">3 Adımda Mülakatınızı Garantileyin</h2>
            <p className="text-white/60 mt-2 text-sm sm:text-base">Mükemmel bir CV oluşturmak hiç bu kadar zahmetsiz olmamıştı.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-4 hover:border-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
                  {s.icon}
                </div>
                <div className="text-[11px] font-black text-indigo-400 tracking-widest uppercase">Adım {s.step}</div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING SECTION ─── */}
      <section id="fiyatlar" className="py-24 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Fiyatlandırma</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight leading-tight">
              Mülakat Davetiniz Her Şeye Değer
            </h2>
            <p className="text-white/60 mt-4 text-base">Gizli ücretler yok. Dilediğiniz zaman tek tıkla iptal edebilirsiniz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative rounded-2xl border bg-white/[0.01] p-8 flex flex-col h-full hover:border-white/20 transition-all duration-300 ${
                  plan.popular ? 'border-indigo-500' : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black text-white bg-indigo-600 tracking-wider">
                      EN POPÜLER ⚡
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-white/50 text-xs mt-1.5 min-h-[32px]">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-white/50 text-xs font-medium">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className={`flex items-center gap-2.5 text-xs ${f.ok ? 'text-white/80' : 'text-white/20 line-through'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        f.ok ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-white/5 text-white/20'
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      {f.text}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="w-full">
                  <button className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    plan.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'border border-white/10 bg-white/5 hover:bg-white/10 text-white'
                  }`}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-xs mt-8 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            14 gün koşulsuz para iade garantisi · SSL Güvenli Altyapı
          </p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF SECTION ─── */}
      <section id="yorumlar" className="py-24 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Yorumlar</span>
            <h2 className="text-3xl font-bold text-white mt-4 tracking-tight">Kullanıcılarımız Neler Diyor?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 space-y-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                    {r.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">{r.name}</h5>
                    <p className="text-[10px] text-white/40">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section id="sss" className="py-24 px-4 bg-black/10 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-sm sm:text-base font-bold text-white hover:bg-white/[0.02] transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ml-4 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section className="py-24 px-4 bg-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white/[0.01] border border-white/5 text-white overflow-hidden px-8 py-16 text-center space-y-6 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Hayalinizdeki Mülakat <br /> Davetine Hazır Mısınız?
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto">
                60 saniyede profesyonel CV'nizi oluşturun, şirketlere özel paylaşım linkinizi gönderin ve mülakatlarınızı takip edin.
              </p>
              
              <div className="pt-4">
                <Link href="/register" className="inline-flex items-center justify-center bg-white text-slate-950 font-black text-sm py-4 px-8 rounded-full hover:bg-slate-100 transition-all duration-200">
                  Ücretsiz Başla <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
              <p className="text-[11px] text-white/40">Kredi kartı gerekmez · Kolay kurulum</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-xs">C</span>
            </div>
            <span className="font-black text-base text-white">
              CV<span className="text-indigo-400">io</span>
            </span>
          </div>

          <div className="flex gap-6 text-xs text-white/40">
            <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
            <a href="mailto:support@cvio.app" className="hover:text-white transition-colors">İletişim</a>
          </div>

          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} CVio. Tüm Hakları Saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
