'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sparkles, Check, ArrowRight, Globe, Zap, Brain,
  Shield, FileText, Star, ChevronRight, Link2
} from 'lucide-react';
import Particles from '@/components/animations/Particles';
import SpotlightCard from '@/components/animations/SpotlightCard';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const features = [
  {
    icon: <svg className="w-5 h-5 fill-indigo-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
    color: 'indigo',
    title: 'Tek Tıkla LinkedIn İmport',
    desc: 'Profil linkinizi yapıştırın; tüm eğitim, sertifika ve deneyimlerinizi saniyeler içinde içe aktaralım. Sıfırdan doldurmaya son.'
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    color: 'violet',
    title: 'ATS Dostu AI Optimizasyon',
    desc: 'Claude 3.5 Sonnet ile CV\'nizi şirkete özel anahtar kelimelerle güçlendirin. Google, Amazon, Trendyol — hepsine özel birer sürüm.'
  },
  {
    icon: <Link2 className="w-5 h-5" />,
    color: 'emerald',
    title: 'Dinamik Paylaşım Linki',
    desc: 'cvio.app/cv/ad-sirket formatında benzersiz link oluşturun. Kaç kişinin baktığını takip edin, Pro\'da link asla sona ermez.'
  },
  {
    icon: <Brain className="w-5 h-5" />,
    color: 'amber',
    title: 'AI Kariyer Koçu',
    desc: 'CV\'nizi bilen kişisel koçunuz. Müzakere taktikleri, özgeçmiş tavsiyesi, sektör içgörüleri — hepsi tek bir sohbette.'
  },
  {
    icon: <FileText className="w-5 h-5" />,
    color: 'sky',
    title: 'Anında PDF İndirme',
    desc: 'Profesyonel şablonlardan birini seçin ve tek tıkla A4 uyumlu PDF olarak indirin. Tasarımcıya ihtiyaç yok.'
  },
  {
    icon: <Globe className="w-5 h-5" />,
    color: 'rose',
    title: 'Çok Şablonlu Tasarım',
    desc: 'Minimal, Modern, Executive — sektörünüze ve pozisyonunuza en uygun şablonu seçerek işe alım yöneticisini etkileyin.'
  },
];

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
};

const proFeatures = [
  'Kalıcı paylaşım linki (asla silinmez)',
  'Şirkete özel bağlantılar (/cv/ad-sirket)',
  'Sınırsız PDF indirme & şablon erişimi',
  'AI Kariyer Koçu sohbeti',
  'Sınırsız LinkedIn import',
  'CV görüntüleme analitiği',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#03060b] text-white overflow-x-hidden font-sans relative">
      {/* Particle background */}
      <Particles
        particleCount={120}
        speed={0.025}
        particleColors={['#6366f1', '#a855f7', '#3b82f6']}
        className="opacity-35"
      />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-500/12 rounded-full blur-[140px] animate-glow-pulse" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[100px]" />
      </div>

      {/* ── NAVBAR ── */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              CVio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Özellikler</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Fiyatlar</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 text-sm font-semibold px-5 transition-all duration-200">
                Ücretsiz Başla
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 text-center z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-7 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Claude 3.5 Sonnet Destekli
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 custom={1} variants={fadeUp} className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
            <span className="text-white">LinkedIn Profilinizi</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              60 Saniyede CV'ye
            </span>
            <br />
            <span className="text-white">Dönüştürün</span>
          </motion.h1>

          {/* Subline */}
          <motion.p custom={2} variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            ATS uyumlu şablonlar, şirkete özel AI optimizasyonu ve kalıcı paylaşım linkleriyle
            iş başvurularında rakiplerinizin önüne geçin.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold shadow-2xl shadow-indigo-500/30 px-8 h-12 text-base transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40"
              >
                Ücretsiz CV Oluştur
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 font-semibold px-8 h-12 text-base backdrop-blur-sm transition-all"
              >
                Giriş Yap
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div custom={4} variants={fadeUp} className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {['#6366f1','#a855f7','#ec4899','#f59e0b','#10b981'].map((c,i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#03060b]" style={{ background: c }} />
                ))}
              </div>
              <span>+2.400 kullanıcı</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              <span className="ml-1">4.9/5</span>
            </div>
            <span className="hidden sm:inline">✓ Kredi kartı gerekmez</span>
          </motion.div>
        </motion.div>

        {/* Hero visual — mock CV card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-2xl mx-auto relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl" />
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-indigo-500/10">
            {/* Mock window bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/3">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <div className="flex-1 mx-4 h-5 rounded-md bg-white/5 flex items-center px-3">
                <span className="text-[10px] text-slate-500">cvio.app/dashboard</span>
              </div>
            </div>
            {/* Mock CV content */}
            <div className="p-8 space-y-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="h-5 w-40 rounded-md bg-gradient-to-r from-indigo-400/30 to-purple-400/20" />
                  <div className="h-3 w-28 rounded bg-slate-700/60" />
                  <div className="h-3 w-20 rounded bg-slate-700/40" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-white/10" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-indigo-500/30 mb-3" />
                {[100, 90, 80].map((w, i) => (
                  <div key={i} className={`h-2.5 w-[${w}%] rounded bg-slate-700/50`} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'AWS'].map(s => (
                  <div key={s} className="h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center">
                    <span className="text-[10px] text-indigo-300 font-medium">{s}</span>
                  </div>
                ))}
              </div>
              {/* AI badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-emerald-300">AI optimizasyonu tamamlandı — ATS uyumlu ✓</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 z-10">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/15">
            <Zap className="w-3 h-3" /> Güçlü Özellikler
          </div>
          <h2 className="text-4xl font-black text-white">Neden CVio?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Özgeçmişinizi sıradanlıktan kurtaran yapay zeka destekli araçlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <SpotlightCard className="group h-full border border-white/6 bg-slate-900/20 backdrop-blur-md p-7 rounded-2xl flex flex-col gap-4 hover:border-white/12 transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[f.color]}`}>
                  {f.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-white transition">{f.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 z-10">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/15">
            <Shield className="w-3 h-3" /> Şeffaf Fiyatlandırma
          </div>
          <h2 className="text-4xl font-black text-white">Net ve Basit</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Gizli ücret yok. İhtiyaçlarınıza göre plan seçin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-3xl mx-auto">
          {/* Free Plan */}
          <SpotlightCard className="border border-white/8 bg-slate-900/20 backdrop-blur-md p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-1">Başlangıç</p>
                <h3 className="text-2xl font-black text-white">Ücretsiz</h3>
                <p className="text-slate-500 text-xs mt-1">Kariyer yolculuğuna başla</p>
              </div>
              <div className="space-y-3">
                {['Sınırsız taslak oluştur', 'Modern CV şablonu', 'PDF indir (7 gün)', 'Geçici paylaşım linki'].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-slate-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/register" className="mt-8 block">
              <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-semibold">
                Ücretsiz Başla
              </Button>
            </Link>
          </SpotlightCard>

          {/* Pro Plan */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30" />
            <SpotlightCard className="relative border border-indigo-500/30 bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-1">En Popüler</p>
                    <h3 className="text-2xl font-black text-white">Pro</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-white">$9.99</span>
                      <span className="text-slate-400 text-xs">/ay</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/20">%35 İNDİRİM</span>
                </div>
                <div className="space-y-3">
                  {proFeatures.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-indigo-400" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/register" className="mt-8 block">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02]">
                  Pro'ya Başla
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent" />
          <div className="relative px-8 py-14 text-center space-y-5">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Mülakat Fırsatlarını Kaçırmayın
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              60 saniyede LinkedIn profilinizden profesyonel CV oluşturun, şirkete özel link ile
              işe alım yöneticisinin dikkatini çekin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-10 shadow-xl shadow-indigo-500/25 transition-all hover:scale-105">
                  Ücretsiz CV Oluştur
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t border-white/5 py-10 text-center z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CVio</span>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} CVio. Tüm Hakları Saklıdır.
          </p>
          <p className="text-xs text-slate-700">
            Claude AI & Apify ile güçlendirilmiş kariyer platformu.
          </p>
        </div>
      </footer>
    </div>
  );
}
