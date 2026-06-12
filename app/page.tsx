'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight, Check, Star, Zap, Globe, Brain,
  FileText, Link2, Shield, ChevronDown, Users,
  TrendingUp, Award, Sparkles, Play
} from 'lucide-react';

/* ─── Pricing data ─── */
const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: 'sonsuza kadar',
    desc: 'Başlamak için mükemmel',
    color: 'border-white/10',
    features: [
      { text: 'Sınırsız CV taslağı', ok: true },
      { text: '1 modern şablon', ok: true },
      { text: 'PDF indirme (7 gün)', ok: true },
      { text: 'Geçici paylaşım linki', ok: true },
      { text: '1 AI içerik iyileştirme hakkı', ok: true },
      { text: 'Kalıcı paylaşım linki', ok: false },
      { text: 'AI kariyer koçu', ok: false },
      { text: 'Şirkete özel URL', ok: false },
    ],
    cta: 'Ücretsiz Başla',
    ctaStyle: 'border border-white/10 bg-white/5 hover:bg-white/8 text-white',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₺199',
    period: '/ay',
    desc: 'Ciddi iş arayanlar için',
    color: 'border-indigo-500/40',
    features: [
      { text: 'Sınırsız CV taslağı', ok: true },
      { text: 'Tüm premium şablonlar', ok: true },
      { text: 'Sınırsız PDF indirme', ok: true },
      { text: 'Kalıcı paylaşım linki', ok: true },
      { text: 'Sınırsız AI içerik iyileştirme', ok: true },
      { text: 'AI kariyer koçu (sınırsız)', ok: true },
      { text: 'Şirkete özel URL', ok: true },
      { text: 'Görüntülenme analitiği', ok: true },
    ],
    cta: 'Pro\'ya Başla',
    ctaStyle: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20',
    popular: true,
  },
  {
    name: 'Yıllık Pro',
    price: '₺1490',
    period: '/yıl',
    desc: '₺124/ay · 4 ay bedava 🎉',
    color: 'border-amber-500/30',
    features: [
      { text: 'Pro\'daki her şey', ok: true },
      { text: 'Öncelikli AI işlem sırası', ok: true },
      { text: 'Yeni özelliklere erken erişim', ok: true },
      { text: '14 gün iade garantisi', ok: true },
      { text: '1 yıllık veri güvencesi', ok: true },
    ],
    cta: 'Yıllık Tasarruf Et',
    ctaStyle: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-xl shadow-amber-500/20',
    popular: false,
  },
];

/* ─── Testimonials ─── */
const reviews = [
  { name: 'Cem A.', role: 'Senior Developer', rating: 5, text: 'Sadece 1 dakikada bilgilerimi girip CV hazırladım. AI optimizasyonuyla global bir teknoloji firmasından mülakat daveti aldım. Gerçekten çalışıyor.' },
  { name: 'Selin K.', role: 'Ürün Yöneticisi', rating: 5, text: 'Şirkete özel link özelliği muhteşem. İK yöneticileri CV\'mi açıp bakarken bildirim geliyor. Tam istediğim şey.' },
  { name: 'Burak T.', role: 'Veri Bilimci', rating: 5, text: 'AI koç mülakat hazırlığımda inanılmaz yardımcı oldu. İlk denemede aradığım işe girdim!' },
];

/* ─── Steps ─── */
const steps = [
  { icon: '📝', step: '01', title: 'Bilgilerinizi Girin', desc: 'İsim, ünvan ve iş geçmişinizi girin. Arayüzümüz doldurmayı son derece kolay ve hızlı hale getirir.' },
  { icon: '🤖', step: '02', title: 'AI ile Optimize Et', desc: 'Claude AI hedeflediğiniz sektöre ve pozisyona göre CV metinlerinizi yeniden yazar ve mükemmelleştirir.' },
  { icon: '🚀', step: '03', title: 'Paylaş & Takip Et', desc: 'Özel linkinizi gönderin. Kim baktı, kaç kez, gerçek zamanlı görün.' },
];

const faqs = [
  { q: 'Yazılan bilgileri AI nasıl iyileştirir?', a: 'Yapay zeka motorumuz CV\'nizdeki iş tanımlarını, başarıları ve özet metinleri analiz eder. Başarılarınızı ölçülebilir (metrik odaklı) hale getirir, dil bilgisi hatalarını giderir ve profesyonel bir ton kazandırır.' },
  { q: 'AI optimizasyon gerçekten fark yaratıyor mu?', a: 'Evet. Claude 3.5 Sonnet modelimiz CV\'nizi ATS (Applicant Tracking System) kriterlerine göre analiz eder, başarıları ölçülebilir hale getirir ve hedef pozisyonun değerlerine uygun dil kullanır. Kullanıcılarımızın %94\'ü mülakat daveti almaktadır.' },
  { q: 'Fiyatlar TL mi?', a: 'Evet, tüm fiyatlar Türk Lirası cinsindendir. Kredi/banka kartı ve havale ile ödeme yapabilirsiniz.' },
  { q: 'İptal edersem ne olur?', a: 'İstediğiniz zaman iptal edebilirsiniz. İptal sonrası abonelik süreniz bitene kadar Pro özelliklerine erişim devam eder. 14 gün içinde iade garantisi sunuyoruz.' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#05080f] text-white overflow-x-hidden">

      {/* ─── DOT GRID BG ─── */}
      <div className="pointer-events-none fixed inset-0 z-0 dot-pattern opacity-100" />
      {/* Top glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] z-0 animate-glow"
        style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />

      {/* ═══════════════════════════════
          NAVBAR
      ═══════════════════════════════ */}
      <header className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-xl tracking-tight">
              CV<span className="gradient-text">io</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[['#nasil-calisir', 'Nasıl Çalışır'], ['#ozellikler', 'Özellikler'], ['#fiyatlar', 'Fiyatlar'], ['#sss', 'SSS']].map(([href, label]) => (
              <a key={href} href={href} className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">{label}</a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">
              Giriş Yap
            </Link>
            <Link href="/register">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                Ücretsiz Başla →
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section className="relative z-10 pt-24 pb-20 text-center px-4">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Claude 3.5 Sonnet ile Güçlendirildi
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
            Yapay Zeka ile<br />
            <span className="gradient-text">60 Saniyede</span><br />
            Profesyonel CV
          </motion.h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            ATS uyumlu şablonlar, akıllı AI içerik optimizasyonu ve kalıcı paylaşım linkleriyle
            <br className="hidden sm:block" /> bir sonraki mülakat davetinizi garantileyin.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{ background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)', boxShadow: '0 8px 32px rgba(99,102,241,0.35)' }}>
                Ücretsiz CV Oluştur
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#nasil-calisir">
              <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 border border-white/10 bg-white/3 hover:bg-white/6 hover:text-white transition-all">
                <Play className="w-4 h-4 fill-current" />
                Nasıl Çalışır
              </button>
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-4 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#05080f] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: c }}>{String.fromCharCode(65 + i)}</div>
                ))}
              </div>
              <span className="text-slate-400">2.400+ kullanıcı</span>
            </span>
            <span className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="text-slate-400 ml-1">4.9/5</span>
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              Kredi kartı gerekmez
            </span>
          </motion.div>
        </div>

        {/* ── HERO VISUAL — Floating App Preview ── */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 max-w-5xl mx-auto">

          {/* Glow underneath */}
          <div className="absolute -inset-8 rounded-3xl" style={{ background: 'radial-gradient(ellipse,rgba(99,102,241,0.2) 0%,transparent 70%)' }} />

          {/* Main card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl"
            style={{ background: 'linear-gradient(180deg,#0d1220 0%,#090d1a 100%)' }}>

            {/* Browser bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div className="flex-1 mx-6 h-7 rounded-lg flex items-center px-3 gap-2 border border-white/6" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-500 font-mono">cvio.app/dashboard</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-slate-500 text-sm">İyi öğleden sonralar,</p>
                  <h3 className="text-2xl font-black text-white">Cem 👋</h3>
                </div>
                <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  + Yeni CV
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Toplam Görüntülenme', value: '1,847', color: '#6366f1', icon: '👁' },
                  { label: 'Aktif Link', value: '3', color: '#10b981', icon: '🔗' },
                  { label: 'Mülakat Daveti', value: '7', color: '#f59e0b', icon: '🎯' },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-xl border border-white/6" style={{ background: `rgba(${s.color === '#6366f1' ? '99,102,241' : s.color === '#10b981' ? '16,185,129' : '245,158,11'},0.08)` }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-black text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CV cards */}
              <div className="space-y-3">
                {[
                  { title: 'Teknoloji Firması — Senior Frontend Engineer', tag: 'AI Optimize', views: 523, active: true },
                  { title: 'Yazılım Evi — Lead Developer', tag: 'Pro Link', views: 412, active: true },
                  { title: 'Genel Başvuru', tag: '7g kaldı', views: 312, active: false },
                ].map((cv, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/6 hover:border-white/10 transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))' }}>
                        <FileText className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{cv.title}</p>
                        <p className="text-xs text-slate-500">{cv.views} görüntülenme</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${cv.active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'}`}>{cv.tag}</span>
                  </div>
                ))}
              </div>

              {/* AI suggestion */}
              <div className="mt-5 flex items-center gap-3 p-4 rounded-xl border border-indigo-500/20" style={{ background: 'rgba(99,102,241,0.06)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.3))' }}>
                  <Brain className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-sm text-indigo-300"><span className="font-bold">AI Koç:</span> Yaklaşan mülakatın için sistem tasarımı sorularına hazır olalım mı? Konuları çalışmaya başlayabiliriz.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative z-10 border-y border-white/5 py-10" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: '2.400+', l: 'Aktif Kullanıcı' },
            { v: '%94', l: 'Mülakat Başarısı' },
            { v: '60sn', l: 'Ortalama Oluşturma' },
            { v: '4.9★', l: 'Kullanıcı Puanı' },
          ].map(s => (
            <div key={s.l}>
              <div className="text-3xl font-black gradient-text">{s.v}</div>
              <div className="text-sm text-slate-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="nasil-calisir" className="relative z-10 py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">Nasıl Çalışır</p>
            <h2 className="text-5xl font-black tracking-tight">3 adımda profesyonel CV hazırlayın</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}>
                <div className="h-full p-8 rounded-2xl border border-white/7 transition-all hover:border-white/12 hover:-translate-y-1 duration-300"
                  style={{ background: 'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)' }}>
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="text-xs font-black text-indigo-400 tracking-widest uppercase mb-3">Adım {s.step}</div>
                  <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="ozellikler" className="relative z-10 py-24 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-bold uppercase tracking-widest mb-3">Özellikler</p>
            <h2 className="text-5xl font-black tracking-tight">Rakiplerinizin <span className="gradient-text">önüne</span> geçin</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: '📝', title: 'Hızlı ve Pratik Form', desc: 'Sadeleştirilmiş arayüzümüz sayesinde temel iş ve eğitim bilgilerinizi dakikalar içinde girin.', tag: 'Kullanıcı Dostu' },
              { emoji: '🤖', title: 'Claude AI Optimizasyon', desc: 'Şirketlerin beklentilerine ve ATS sistemlerine göre CV dilinizi mükemmelleştirin.', tag: 'AI Destekli' },
              { emoji: '🔒', title: 'Kalıcı Paylaşım Linki', desc: 'cvio.app/cv/adiniz-ozel — asla sona ermeyen, takip edilebilir dijital bağlantı.', tag: 'Pro' },
              { emoji: '🧠', title: 'AI Kariyer Koçu', desc: 'Girdiğiniz bilgilere göre CV\'nizi tanıyan yapay zeka mülakat ve sektör koçu.', tag: 'Pro' },
              { emoji: '📊', title: 'Görüntülenme Analitiği', desc: 'Kim baktı, ne zaman, kaç kez? Bağlantınızın istatistiklerini takip edin.', tag: 'Pro' },
              { emoji: '📄', title: 'Anında PDF İndirme', desc: 'Profesyonel ATS uyumlu şablonlardan dilediğinizi seçin ve hemen indirin.', tag: 'Tüm Planlar' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div className="group h-full p-7 rounded-2xl border border-white/6 hover:border-indigo-500/25 transition-all hover:-translate-y-1 duration-300 cursor-default"
                  style={{ background: 'linear-gradient(180deg,rgba(13,18,32,0.8) 0%,rgba(9,13,26,0.8) 100%)' }}>
                  <div className="text-3xl mb-4">{f.emoji}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-base font-bold text-white">{f.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                    style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>
                    {f.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="relative z-10 py-24 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Kullanıcı Yorumları</p>
            <h2 className="text-5xl font-black tracking-tight">Gerçek başarı hikayeleri</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="h-full p-7 rounded-2xl border border-white/7"
                  style={{ background: 'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)' }}>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-black"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="fiyatlar" className="relative z-10 py-24 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">Fiyatlandırma</p>
            <h2 className="text-5xl font-black tracking-tight">Kariyerinize yatırım yapın,<br /><span className="gradient-text">mülakat davetlerini kapın</span></h2>
            <p className="text-slate-400 mt-4 text-lg">Gizli ücret yok. İstediğiniz zaman iptal edebilirsiniz.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className={`relative rounded-2xl border p-8 flex flex-col h-full ${plan.popular ? 'border-indigo-500/40' : plan.color}`}
                  style={{ background: plan.popular ? 'linear-gradient(180deg,#0f1428 0%,#0a0e1a 100%)' : 'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)' }}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-[11px] font-black text-white shadow-lg"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>
                        ⚡ EN POPÜLER
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-black text-white">{plan.price}</span>
                      <span className="text-slate-400 text-sm">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f.text} className={`flex items-center gap-2.5 text-sm ${f.ok ? 'text-slate-300' : 'text-slate-600 line-through'}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.ok ? 'bg-indigo-500/15 border border-indigo-500/25' : 'bg-white/3 border border-white/5'}`}>
                          <Check className={`w-3 h-3 ${f.ok ? 'text-indigo-400' : 'text-slate-700'}`} />
                        </div>
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${plan.ctaStyle}`}>
                      {plan.cta}
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            14 gün para iade garantisi · SSL güvenli ödeme · Her zaman iptal
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="sss" className="relative z-10 py-24 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/7 overflow-hidden"
                style={{ background: 'rgba(13,18,32,0.7)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-base font-semibold text-white hover:bg-white/2 transition-colors">
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-2 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden px-8 py-16 space-y-6 border border-indigo-500/20"
            style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(139,92,246,0.08) 50%,rgba(236,72,153,0.06) 100%)' }}>
            <div className="absolute inset-0 dot-pattern opacity-30" />
            <div className="relative">
              <h2 className="text-5xl font-black leading-tight mb-4">
                Bir sonraki mülakat<br />davetinize hazır mısınız?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                60 saniyede oluşturun, dijital linkinizi paylaşın, mülakat hazırlığınıza AI koç ile başlayın.
              </p>
              <Link href="/register">
                <button className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-black text-white transition-all hover:scale-105 hover:shadow-2xl"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 8px 32px rgba(99,102,241,0.35)' }}>
                  Ücretsiz CV Oluştur
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <p className="text-slate-600 text-sm mt-4">Kredi kartı gerekmez · 2 dakikada kurulum</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className="text-white font-black text-xs">C</span>
            </div>
            <span className="font-black text-lg">CV<span className="gradient-text">io</span></span>
          </div>
          <div className="flex gap-6 text-xs text-slate-500">
            {[['Gizlilik', '#'], ['Kullanım Koşulları', '#'], ['İletişim', 'mailto:hi@cvio.app']].map(([l, h]) => (
              <a key={l} href={h} className="hover:text-slate-300 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} CVio. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
