'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, Check, ArrowRight, Zap, Shield, FileText, Globe } from 'lucide-react';
import Particles from '@/components/animations/Particles';
import SpotlightCard from '@/components/animations/SpotlightCard';
import ShinyText from '@/components/animations/ShinyText';
import DecryptedText from '@/components/animations/DecryptedText';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#03060b] text-white overflow-x-hidden font-sans relative">
      {/* WebGL Particles background */}
      <Particles
        particleCount={100}
        speed={0.03}
        particleColors={['#6366f1', '#a855f7', '#3b82f6']}
        className="opacity-40"
      />

      {/* Background radial overlays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header / Nav */}
      <header className="border-b border-slate-900/60 bg-slate-950/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
            CVio
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-900 text-sm font-semibold">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/15 text-sm font-semibold">
                Kayıt Ol
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 text-xs font-bold border border-indigo-900/40">
            <Sparkles className="w-3.5 h-3.5" />
            <DecryptedText text="Yapay Zeka Destekli Kariyer Platformu" animateOn="view" speed={40} className="text-indigo-400" />
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15]">
            <ShinyText text="LinkedIn Profilinizi 60 Saniyede" className="font-black" speed={3} /> <br />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Profesyonel CV'ye</span> Dönüştürün
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            AI destekli, ATS uyumlu tasarımlar. Şirketlere özel paylaşım linkleri oluşturun, mülakat koçu ile iş tekliflerini yakalayın.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold shadow-xl shadow-indigo-600/20 px-8">
                Ücretsiz Başla
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 font-bold px-8">
                Giriş Yap
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Neden CVio?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Özgeçmişinizi sıradanlıktan kurtaran modern teknolojik özellikler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SpotlightCard className="border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 rounded-2xl h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5 fill-indigo-400" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Tek Tıkla LinkedIn İçe Aktarımı</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                LinkedIn profil linkinizi girin; tüm eğitim, sertifika ve iş deneyimlerinizi saniyeler içinde formatımıza uyduralım.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 rounded-2xl h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">ATS Dostu AI İyileştirme</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Claude 3.5 Sonnet entegrasyonu ile başarılarınızı ölçülebilir kılın, başvurmak istediğiniz şirketin anahtar kelimelerine göre optimize edin.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 rounded-2xl h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Dinamik Paylaşım Linki</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Şirketlere özel link oluşturup LinkedIn profilinize ekleyin. Takip edin ve mülakat davetlerini doğrudan link üzerinden yakalayın.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900 bg-slate-950/10 z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Basit ve Net Fiyatlandırma</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            İhtiyaçlarınıza uygun üyelik seçenekleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Card */}
          <SpotlightCard className="border border-slate-800 bg-slate-900/10 backdrop-blur-md p-8 rounded-2xl h-full flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Free Plan</h3>
              <p className="text-slate-500 text-xs">Kariyer başlangıcı için temel araçlar.</p>
              <div className="mt-4">
                <span className="text-3xl font-black text-white">$0</span>
              </div>
              <div className="space-y-3 pt-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Özgeçmiş oluşturma (Sınırsız)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>1 Adet modern CV şablonu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>PDF olarak indirme (7 gün geçerli)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Geçici paylaşım linki (7 gün geçerli)</span>
                </div>
              </div>
            </div>
            <div className="pt-6 w-full">
              <Link href="/register" className="w-full block">
                <Button variant="outline" className="w-full border-slate-800 text-slate-300 hover:text-white">
                  Ücretsiz Kayıt Ol
                </Button>
              </Link>
            </div>
          </SpotlightCard>

          {/* Pro Card */}
          <SpotlightCard className="border border-indigo-500/25 bg-slate-900/20 backdrop-blur-md p-8 rounded-2xl h-full flex flex-col justify-between ring-2 ring-indigo-500/10">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center justify-between">
                <span>Pro Plan</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Popüler</span>
              </h3>
              <p className="text-slate-400 text-xs">Hızlı iş bulmak ve fark yaratmak için.</p>
              <div className="mt-4">
                <span className="text-3xl font-black text-white">$9.99</span>
                <span className="text-slate-500 text-xs"> / ay</span>
              </div>
              <div className="space-y-3 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Kalıcı paylaşım linki (asla silinmez)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Şirkete özel bağlantılar (/cv/ali-google)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Sınırsız PDF indirme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Tüm tasarım şablonları</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>AI Kariyer Koçu sohbeti</span>
                </div>
              </div>
            </div>
            <div className="pt-6 w-full">
              <Link href="/register" className="w-full block">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/25">
                  Pro'ya Yükselt
                </Button>
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-900 py-12 text-center text-xs text-slate-500 z-10">
        <p>&copy; {new Date().getFullYear()} CVio. Tüm Hakları Saklıdır.</p>
        <p className="mt-2 text-slate-600">60 Saniyede LinkedIn profilinizden CV üreten akıllı kariyer platformu.</p>
      </footer>
    </div>
  );
}

