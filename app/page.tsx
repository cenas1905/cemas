'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sparkles, ArrowRight, Check, Star, Zap, Globe, Brain,
  FileText, Link2, Shield, ChevronRight, Users, TrendingUp,
  Award, Play
} from 'lucide-react';
import Particles from '@/components/animations/Particles';
import SpotlightCard from '@/components/animations/SpotlightCard';

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

/* ─── How It Works steps ─── */
const steps = [
  { n: '01', title: 'LinkedIn Linkini Yapıştır', desc: 'Profil URL\'nizi girin; Apify scraper tüm deneyim, eğitim ve sertifikalarınızı saniyeler içinde çeker.' },
  { n: '02', title: 'AI ile Optimize Et', desc: 'Claude 3.5 Sonnet CV\'nizi başvuracağınız şirketin değerlerine ve ATS kriterlerine göre yeniden yazar.' },
  { n: '03', title: 'Paylaş & Takip Et', desc: '/cv/adınız-sirket formatında benzersiz link alın. Kaç kişinin baktığını gerçek zamanlı izleyin.' },
];

/* ─── Features ─── */
const features = [
  { icon: <svg className="w-5 h-5 fill-indigo-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>, color: 'indigo', title: 'LinkedIn\'den Tek Tıkla İmport', desc: 'Profil linkinizi yapıştırın; tüm bilgiler otomatik doldurulsun.' },
  { icon: <Sparkles className="w-5 h-5" />, color: 'violet', title: 'Claude AI ile CV Optimizasyonu', desc: 'Şirkete özel anahtar kelimeler, güçlü fiiller, ölçülebilir başarılar.' },
  { icon: <Link2 className="w-5 h-5" />, color: 'emerald', title: 'Paylaşılabilir CV Linki', desc: 'cvio.app/cv/ad-google — kalıcı ve takip edilebilir bağlantı.' },
  { icon: <Brain className="w-5 h-5" />, color: 'amber', title: 'AI Kariyer Koçu', desc: 'CV\'nizi bilen kişisel koç. Mülakat, müzakere, sektör tavsiyeleri.' },
  { icon: <FileText className="w-5 h-5" />, color: 'sky', title: 'Anında PDF İndirme', desc: 'Profesyonel şablonlardan seçin, A4 uyumlu PDF\'e dönüştürün.' },
  { icon: <TrendingUp className="w-5 h-5" />, color: 'rose', title: 'Görüntülenme Analitiği', desc: 'Kim baktı, ne zaman, kaç kez? Gerçek zamanlı link izleme.' },
];

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
};

/* ─── Testimonials ─── */
const testimonials = [
  { name: 'Cem A.', role: 'Software Engineer @ Google', text: 'LinkedIn\'den 2 dakikada CV oluşturtum, şirkete özel AI optimizasyonuyla mülakatlara davet aldım. İnanılmaz.', avatar: '👨‍💻' },
  { name: 'Zeynep K.', role: 'Product Manager @ Trendyol', text: 'Kalıcı paylaşım linki özelliği tam bir oyun değiştirici. Artık CV\'mi her yere gönderiyorum.', avatar: '👩‍💼' },
  { name: 'Burak T.', role: 'Data Scientist @ Getir', text: 'AI kariyer koçu mülakat sorularını çalışmama yardım etti. İlk denemede işe girdim.', avatar: '🧑‍🔬' },
];

/* ─── FAQ ─── */
const faqs = [
  { q: 'LinkedIn import nasıl çalışıyor?', a: 'Profil URL\'nizi girin; Apify scraper teknolojisiyle tüm iş deneyimi, eğitim, sertifika ve becerilerinizi saniyeler içinde çekiyoruz. Kendi profilinizi import etmenizi tavsiye ederiz.' },
  { q: 'AI optimizasyon ne yapar?', a: 'Claude 3.5 Sonnet modelimiz CV\'nizi analiz ederek başarıları ölçülebilir hale getirir, ATS sistemlerinin tanıdığı güçlü anahtar kelimeler ekler ve hedeflediğiniz şirkete uygun dil kullanır.' },
  { q: 'Free plan ile Pro arasındaki fark nedir?', a: 'Free planda CV oluşturabilir ve 7 günlük geçici link alabilirsiniz. Pro\'da linkler asla sona ermez, şirkete özel URL\'ler, sınırsız PDF, tüm şablonlar ve AI kariyer koçu sohbeti gelir.' },
  { q: 'Verilerimi silersem ne olur?', a: 'Hesabınızı kapattığınızda tüm CV verileriniz ve linkleriniz kalıcı olarak silinir. Verileriniz üçüncü şahıslarla paylaşılmaz.' },
];

/* ─── Stats ─── */
const stats = [
  { value: '2.400+', label: 'Kullanıcı', icon: <Users className="w-4 h-4" /> },
  { value: '%94', label: 'Mülakat Başarısı', icon: <Award className="w-4 h-4" /> },
  { value: '60 sn', label: 'Ortalama Oluşturma', icon: <Zap className="w-4 h-4" /> },
  { value: '4.9/5', label: 'Kullanıcı Puanı', icon: <Star className="w-4 h-4" /> },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#03060b] text-white overflow-x-hidden relative">
      <Particles particleCount={100} speed={0.022} particleColors={['#6366f1', '#a855f7', '#3b82f6']} className="opacity-30" />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[60vh] right-0 w-[600px] h-[600px] bg-purple-500/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* ══════════════════════════════════════
           NAVBAR
      ══════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-white/6 bg-[#03060b]/90 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">CVio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">Nasıl Çalışır</a>
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Özellikler</a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Fiyatlar</a>
            <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">SSS</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 shadow-lg shadow-indigo-600/20 transition-all hover:shadow-indigo-500/30">
                Ücretsiz Başla
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
           HERO
      ══════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="space-y-6 max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Yapay Zeka Destekli Kariyer Platformu
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 custom={1} variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
            LinkedIn Profilinizi<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              60 Saniyede CV'ye
            </span>
            <br />Dönüştürün
          </motion.h1>

          {/* Sub */}
          <motion.p custom={2} variants={fadeUp} className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            ATS uyumlu şablonlar · Şirkete özel AI optimizasyonu · Kalıcı paylaşım linkleri
          </motion.p>

          {/* CTA */}
          <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-10 h-13 text-base shadow-2xl shadow-indigo-500/30 transition-all hover:scale-[1.03] hover:shadow-indigo-500/40 rounded-xl">
                Ücretsiz CV Oluştur
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 bg-white/4 text-slate-300 hover:text-white hover:bg-white/8 font-semibold px-8 h-13 text-base rounded-xl">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Nasıl Çalışır
              </Button>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div custom={4} variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#6366f1','#a855f7','#ec4899','#f59e0b','#10b981'].map((c,i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#03060b] flex items-center justify-center text-[10px]" style={{ background: c }}>
                    {['A','B','C','D','E'][i]}
                  </div>
                ))}
              </div>
              <span className="text-slate-400 font-medium">2.400+ kullanıcı mülakat davetleri aldı</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-slate-400">4.9/5 puan</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-slate-400">Kredi kartı gerekmez</span>
            </span>
          </motion.div>
        </motion.div>

        {/* ── Hero Dashboard Preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 max-w-4xl mx-auto"
        >
          {/* Glow behind */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-purple-500/15 rounded-3xl blur-2xl" />
          <div className="relative rounded-2xl border border-white/8 bg-[#080c14]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white/4 flex items-center px-3 gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-[11px] text-slate-500">cvio.app/dashboard</span>
              </div>
              <div className="text-[10px] text-slate-600">CVio</div>
            </div>
            {/* Dashboard preview content */}
            <div className="p-6 grid grid-cols-3 gap-4">
              {/* Left: stats */}
              <div className="col-span-1 space-y-3">
                <div className="p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/15">
                  <div className="text-xs text-slate-500 mb-1">Toplam Görüntülenme</div>
                  <div className="text-2xl font-black text-white">1,247</div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +23% bu hafta</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/8 border border-purple-500/15">
                  <div className="text-xs text-slate-500 mb-1">Aktif CV Linki</div>
                  <div className="text-2xl font-black text-white">3</div>
                  <div className="text-xs text-purple-400 mt-1">Pro plan aktif ✓</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
                  <div className="text-xs text-slate-500 mb-1">AI İyileştirme</div>
                  <div className="text-2xl font-black text-white">5×</div>
                  <div className="text-xs text-amber-400 mt-1">Bu ay kullanıldı</div>
                </div>
              </div>
              {/* Right: CV cards */}
              <div className="col-span-2 space-y-3">
                {[
                  { title: 'Google — Senior Frontend', badge: 'Aktif', badgeColor: 'emerald', views: 523, slug: '/cv/cem-google' },
                  { title: 'Trendyol — Product Manager', badge: 'Aktif', badgeColor: 'emerald', views: 412, slug: '/cv/cem-trendyol' },
                  { title: 'Genel Başvuru CV', badge: '3 gün kaldı', badgeColor: 'amber', views: 312, slug: '/cv/cem-genel' },
                ].map((cv, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/6 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white mb-1">{cv.title}</div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cv.badgeColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{cv.badge}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1"><FileText className="w-3 h-3" /> {cv.views} görüntülenme</span>
                      </div>
                    </div>
                    <div className="text-xs text-indigo-400 font-mono">{cv.slug}</div>
                  </div>
                ))}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-500/5 border border-dashed border-indigo-500/20">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-indigo-300 font-medium">AI Koçu: "Google mülakat sürecinde kullandığın teknoloji stack'ine odaklan."</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
           STATS BAR
      ══════════════════════════════════════ */}
      <section className="relative z-10 border-y border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <div className="flex items-center justify-center gap-2 text-indigo-400 mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
           HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold border border-violet-500/15">
            <Zap className="w-3 h-3" /> Çok Hızlı
          </span>
          <h2 className="text-4xl font-black text-white">3 Adımda Profesyonel CV</h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">Teknik bilgi gerekmez. Sadece LinkedIn linkinizi yapıştırın, gerisini biz yapalım.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-indigo-500/40 via-violet-500/40 to-purple-500/40" />

          {steps.map((step, i) => (
            <motion.div key={step.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <span className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{step.n}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
           FEATURES GRID
      ══════════════════════════════════════ */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/15">
            <Sparkles className="w-3 h-3" /> Tüm İhtiyaçlarınız
          </span>
          <h2 className="text-4xl font-black text-white">Neden CVio?</h2>
          <p className="text-slate-400 text-base max-w-md mx-auto">Rakiplerinizin önüne geçmenizi sağlayan özellikler.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <SpotlightCard className="group h-full border border-white/6 bg-gradient-to-b from-white/3 to-transparent backdrop-blur-md p-7 rounded-2xl flex flex-col gap-4 hover:border-white/12 transition-all duration-300">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[f.color]}`}>{f.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="text-xs text-indigo-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Daha fazla <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
           TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/15">
            <Star className="w-3 h-3 fill-amber-400" /> Kullanıcı Yorumları
          </span>
          <h2 className="text-4xl font-black text-white">Gerçek Başarı Hikayeleri</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="h-full p-6 rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent backdrop-blur-sm space-y-4">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-lg">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
           PRICING
      ══════════════════════════════════════ */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/15">
            <Shield className="w-3 h-3" /> Şeffaf Fiyatlar
          </span>
          <h2 className="text-4xl font-black text-white">Basit ve Net</h2>
          <p className="text-slate-400 text-base max-w-md mx-auto">Gizli ücret yok. İstediğiniz zaman iptal edin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free */}
          <SpotlightCard className="border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-8 rounded-2xl flex flex-col">
            <div className="mb-6">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">BAŞLANGIÇ</p>
              <h3 className="text-2xl font-black text-white mb-1">Ücretsiz</h3>
              <p className="text-slate-500 text-sm">Kredi kartı gerekmez</p>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              {['Sınırsız CV taslağı', '1 modern şablon', 'PDF indirme (7 gün)', 'Geçici paylaşım linki (7 gün)', 'LinkedIn import (1 hak)'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-slate-600 shrink-0" /> {f}
                </div>
              ))}
            </div>
            <Link href="/register">
              <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-semibold">Ücretsiz Başla</Button>
            </Link>
          </SpotlightCard>

          {/* Pro Monthly */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl" />
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-bold shadow-lg shadow-indigo-500/30">EN POPÜLER</span>
            </div>
            <SpotlightCard className="relative border-0 bg-[#0c1225] p-8 rounded-2xl flex flex-col">
              <div className="mb-6">
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">PRO AYLIK</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">$9.99</span>
                  <span className="text-slate-400 text-sm">/ay</span>
                </div>
                <p className="text-slate-400 text-sm mt-1">Her ay iptal edebilirsiniz</p>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {[
                  'Free\'deki her şey',
                  'Kalıcı paylaşım linki (asla silinmez)',
                  'Şirkete özel URL (/cv/ad-google)',
                  'Tüm premium şablonlar',
                  'Sınırsız PDF indirme',
                  'AI Kariyer Koçu sohbeti',
                  'Sınırsız LinkedIn import',
                  'Görüntülenme analitiği',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-indigo-400" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/register">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02]">
                  Pro'ya Başla <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </SpotlightCard>
          </div>

          {/* Annual */}
          <SpotlightCard className="border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent p-8 rounded-2xl flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs text-amber-400 font-bold uppercase tracking-widest">PRO YILLIK</p>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-bold">%35 İNDİRİM</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$79</span>
                <span className="text-slate-400 text-sm">/yıl</span>
              </div>
              <p className="text-amber-400 text-sm mt-1">($6.58/ay, 4 ay bedava!)</p>
            </div>
            <div className="space-y-3 mb-8 flex-1">
              {[
                'Pro Aylık\'taki her şey',
                'Öncelikli AI işlem sırası',
                'Erken erişim: yeni özellikler',
                '1 yıllık veri saklama garantisi',
              ].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-amber-400" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/register">
              <Button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all hover:scale-[1.02]">
                Yıllık Tasarruf Et
              </Button>
            </Link>
          </SpotlightCard>
        </div>

        {/* Money back */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            14 gün para iade garantisi · İstediğiniz zaman iptal
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
           FAQ
      ══════════════════════════════════════ */}
      <section id="faq" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl font-black text-white">Sık Sorulan Sorular</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ml-4 ${openFaq === i ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
           FINAL CTA
      ══════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-purple-500/15 blur-sm" />
          <div className="absolute inset-0 border border-indigo-500/20 rounded-3xl" />
          <div className="relative px-8 py-16 text-center space-y-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-400 font-semibold">Bugün başlayın</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Bir Sonraki Mülakat<br />Davetinizi Kaçırmayın
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base leading-relaxed">
              60 saniyede profesyonel CV oluşturun. Şirkete özel link paylaşın.
              İşe alım yöneticisinin dikkatini çekin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-12 shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 text-base">
                  Ücretsiz CV Oluştur
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-slate-600">Kredi kartı gerekmez · 14 gün iade garantisi · Her zaman iptal</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           FOOTER
      ══════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-black text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CVio</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Kullanım Koşulları</a>
              <a href="mailto:destek@cvio.app" className="hover:text-slate-300 transition-colors">İletişim</a>
            </div>
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} CVio. Tüm Hakları Saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
